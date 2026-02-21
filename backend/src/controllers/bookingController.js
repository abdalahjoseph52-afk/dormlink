const supabase = require('../config/supabase');

// ─────────────────────────────────────────
// CREATE BOOKING
// ─────────────────────────────────────────
const createBooking = async (req, res) => {
  try {
    const { room_id, semester, special_requests } = req.body;
    const student_id = req.user.id;

    if (!room_id || !semester) {
      return res.status(400).json({ error: 'Please select a room and semester' });
    }

    if (!['Semester 1', 'Semester 2', 'Full Year'].includes(semester)) {
      return res.status(400).json({ error: 'Invalid semester selection' });
    }

    // Get room details
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('*, hostels(*)')
      .eq('id', room_id)
      .single();

    if (roomError || !room) {
      console.error('Room fetch error:', roomError);
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check availability
    const isAvailable = room.is_available !== false;
    const hasSpace = !room.available_count || room.available_count >= 1;

    if (!isAvailable || !hasSpace) {
      return res.status(400).json({ error: 'Room is not available' });
    }

    // Calculate pricing
    const semesterFee = parseFloat(
      room.price_per_semester ||
      (room.price_per_month ? room.price_per_month * 4 : 0)
    );

    if (!semesterFee || semesterFee <= 0) {
      return res.status(400).json({ error: 'Room price is not set. Please contact the host.' });
    }

    const total_amount = semester === 'Full Year' ? semesterFee * 2 : semesterFee;
    const deposit_amount = parseFloat((total_amount * 0.5).toFixed(2)) || 0;
    const commission_amount = parseFloat((deposit_amount * 0.03).toFixed(2)) || 0;
    
    // Calculate host payout
    const final_host_payout = parseFloat((deposit_amount - commission_amount).toFixed(2)) || 0;

    // Calculate duration in months
    let duration_months = 4;
    if (semester === 'Full Year') {
      duration_months = 8;
    }

    // Dates
    const today = new Date().toISOString().split('T')[0];
    const sixMonthsLater = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Payload for Supabase
    const insertPayload = {
      student_id: student_id,
      room_id: room_id,
      hostel_id: room.hostel_id,
      semester: semester,
      duration_months: duration_months,
      check_in_date: today,
      check_out_date: sixMonthsLater,
      total_amount: total_amount,
      deposit_amount: deposit_amount,
      commission_amount: commission_amount,
      host_amount: final_host_payout, // Send both names just in case!
      host_payout: final_host_payout, // Send both names just in case!
      special_requests: special_requests || null,
      status: 'pending',
      payment_status: 'unpaid',
    };

    console.log('Sending this exact data to Supabase:', insertPayload);

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([insertPayload])
      .select(`
        *,
        rooms(room_type, price_per_semester),
        hostels(name, address),
        users!student_id(first_name, last_name, email)
      `)
      .single();

    if (bookingError) {
      console.error('Booking insert error:', bookingError);
      return res.status(500).json({ error: bookingError.message || 'Failed to create booking' });
    }

    // Notify student
    await supabase.from('notifications').insert([{
      user_id: student_id,
      title: 'Booking Submitted',
      message: `Your booking for ${room.hostels.name} (${room.room_type}) for ${semester} has been submitted. Waiting for host confirmation.`,
      type: 'booking',
    }]);

    // Notify host
    await supabase.from('notifications').insert([{
      user_id: room.hostels.owner_id,
      title: 'New Booking Request',
      message: `A student requested ${room.room_type} at ${room.hostels.name} for ${semester}. Deposit: TZS ${deposit_amount.toLocaleString()}`,
      type: 'booking',
    }]);

    res.status(201).json({ message: 'Booking submitted successfully', booking });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET MY BOOKINGS (Student)
// ─────────────────────────────────────────
const getMyBookings = async (req, res) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        rooms(id, room_type, price_per_semester, price_per_month, capacity),
        hostels(id, name, address, city)
      `)
      .eq('student_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ bookings: bookings || [] });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET HOST BOOKINGS
// ─────────────────────────────────────────
const getHostBookings = async (req, res) => {
  try {
    const { data: hostels, error: hostelError } = await supabase
      .from('hostels')
      .select('id')
      .eq('owner_id', req.user.id);

    if (hostelError) throw hostelError;
    if (!hostels || hostels.length === 0) return res.json({ bookings: [] });

    const hostelIds = hostels.map(h => h.id);

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users!student_id(id, first_name, last_name, email, phone),
        rooms(id, room_type, price_per_semester, price_per_month, capacity),
        hostels(id, name)
      `)
      .in('hostel_id', hostelIds)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ bookings: bookings || [] });
  } catch (error) {
    console.error('Get host bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// REVIEW BOOKING (Host)
// ─────────────────────────────────────────
const reviewBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Status must be confirmed or cancelled' });
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select(`*, users!student_id(id, first_name), rooms(room_type), hostels(name)`)
      .single();

    if (error) throw error;

    const depositText = booking.deposit_amount
      ? `TZS ${parseFloat(booking.deposit_amount).toLocaleString()}`
      : 'your deposit';

    await supabase.from('notifications').insert([{
      user_id: booking.users.id,
      title: status === 'confirmed' ? 'Booking Confirmed!' : 'Booking Cancelled',
      message: status === 'confirmed'
        ? `Your booking at ${booking.hostels.name} for ${booking.semester} is confirmed! Please pay your 50% deposit of ${depositText}.`
        : `Your booking at ${booking.hostels.name} has been cancelled by the host.`,
      type: 'booking',
    }]);

    res.json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    console.error('Review booking error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// CANCEL BOOKING (Student)
// ─────────────────────────────────────────
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .eq('student_id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// LEAVE REVIEW (Student)
// ─────────────────────────────────────────
const leaveReview = async (req, res) => {
  try {
    const { hostel_id, rating, comment } = req.body;
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ hostel_id, student_id: req.user.id, rating, comment }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: 'Review submitted', review: data });
  } catch (error) {
    console.error('Leave review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getHostBookings,
  reviewBooking,
  cancelBooking,
  leaveReview,
};