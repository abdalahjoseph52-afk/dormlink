const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

// GET MY HOSTELS
const getMyHostels = async (req, res) => {
  try {
    const { data: hostels, error } = await supabase
      .from('hostels')
      .select(`*, universities(id, name, city), rooms(*)`)
      .eq('owner_id', req.user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ hostels });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

// CREATE HOSTEL
const createHostel = async (req, res) => {
  try {
    const { name, city, address, description, university_id, distance_from_university, latitude, longitude, amenities, transport_notes } = req.body;
    if (!name || !city || !address) return res.status(400).json({ error: 'Name, city and address are required' });
    const { data: hostel, error } = await supabase.from('hostels').insert([{
      name, city, address, description, university_id, distance_from_university,
      latitude, longitude, amenities: amenities || [], transport_notes,
      owner_id: req.user.id, status: 'pending',
    }]).select().single();
    if (error) throw error;
    const { data: admins } = await supabase.from('users').select('id').eq('role', 'admin').limit(1);
    if (admins?.length > 0) {
      await supabase.from('notifications').insert([{ user_id: admins[0].id, title: 'New Hostel Submitted', message: `"${name}" in ${city} needs review.`, type: 'hostel_review' }]);
    }
    res.status(201).json({ message: 'Hostel submitted for review', hostel });
  } catch (e) { res.status(500).json({ error: e.message || 'Server error' }); }
};

// UPDATE HOSTEL
const updateHostel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city, address, description, university_id, distance_from_university, latitude, longitude, amenities, transport_notes, images } = req.body;
    const { data: hostel, error } = await supabase.from('hostels')
      .update({ name, city, address, description, university_id, distance_from_university, latitude, longitude, amenities, transport_notes, images, updated_at: new Date() })
      .eq('id', id).eq('owner_id', req.user.id).select().single();
    if (error) throw error;
    res.json({ message: 'Hostel updated', hostel });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

// ADD ROOM
const addRoom = async (req, res) => {
  try {
    const { hostelId } = req.params;
    const { room_label, room_type, floor, capacity, price_per_semester, available_count, description, features, images } = req.body;
    if (!room_label || !room_type || !price_per_semester) return res.status(400).json({ error: 'Room label, type and price are required' });
    const { data: hostel } = await supabase.from('hostels').select('id').eq('id', hostelId).eq('owner_id', req.user.id).single();
    if (!hostel) return res.status(403).json({ error: 'Hostel not found or access denied' });
    const count = parseInt(available_count) || 1;
    const { data: room, error } = await supabase.from('rooms').insert([{
      hostel_id: hostelId, room_label, room_type, floor: floor || '',
      capacity: parseInt(capacity) || 1,
      price_per_semester: parseFloat(price_per_semester),
      price_per_month: parseFloat(price_per_semester) / 4,
      available_count: count, total_count: count,
      is_full: count === 0,
      description: description || '', features: features || [], images: images || [],
    }]).select().single();
    if (error) throw error;
    res.status(201).json({ message: 'Room added', room });
  } catch (e) { res.status(500).json({ error: e.message || 'Server error' }); }
};

// UPDATE ROOM
const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { room_label, room_type, floor, capacity, price_per_semester, available_count, description, features, images, is_full } = req.body;
    const count = parseInt(available_count);
    const { data: room, error } = await supabase.from('rooms')
      .update({
        room_label, room_type, floor,
        capacity: parseInt(capacity),
        price_per_semester: parseFloat(price_per_semester),
        price_per_month: parseFloat(price_per_semester) / 4,
        available_count: count, total_count: count,
        is_full: is_full !== undefined ? is_full : count === 0,
        description, features, images, updated_at: new Date(),
      }).eq('id', roomId).select().single();
    if (error) throw error;
    res.json({ message: 'Room updated', room });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

// DELETE ROOM
const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { count } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('room_id', roomId).eq('status', 'confirmed');
    if (count > 0) return res.status(400).json({ error: 'Cannot delete room with active confirmed bookings' });
    const { error } = await supabase.from('rooms').delete().eq('id', roomId);
    if (error) throw error;
    res.json({ message: 'Room deleted' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

// GET MY BOOKINGS (as host)
const getMyBookings = async (req, res) => {
  try {
    const { data: myHostels } = await supabase.from('hostels').select('id').eq('owner_id', req.user.id);
    if (!myHostels?.length) return res.json({ bookings: [] });
    const hostelIds = myHostels.map(h => h.id);
    const { data: bookings, error } = await supabase.from('bookings')
      .select(`*, users!student_id(id, first_name, last_name, email, phone), rooms(id, room_type, room_label, price_per_semester), hostels(id, name)`)
      .in('hostel_id', hostelIds).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ bookings });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

// CONFIRM BOOKING
const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: booking, error } = await supabase.from('bookings')
      .update({ status: 'confirmed', updated_at: new Date() })
      .eq('id', id).select(`*, users!student_id(id, first_name), hostels(name)`).single();
    if (error) throw error;
    await supabase.from('notifications').insert([{ user_id: booking.users.id, title: 'Booking Confirmed!', message: `Your booking for ${booking.hostels.name} is confirmed. Please pay your deposit to secure your room.`, type: 'booking' }]);
    res.json({ message: 'Booking confirmed', booking });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

// REJECT BOOKING
const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const { data: booking, error } = await supabase.from('bookings')
      .update({ status: 'cancelled', updated_at: new Date() })
      .eq('id', id).select(`*, users!student_id(id, first_name), hostels(name)`).single();
    if (error) throw error;
    await supabase.from('notifications').insert([{ user_id: booking.users.id, title: 'Booking Not Accepted', message: `Your request for ${booking.hostels.name} was not accepted. ${reason || 'Please try another property.'}`, type: 'booking' }]);
    res.json({ message: 'Booking rejected', booking });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

// DELETE HOST ACCOUNT
const deleteMyAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const { data: user } = await supabase.from('users').select('password').eq('id', req.user.id).single();
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Incorrect password' });
    const { error } = await supabase.from('users').delete().eq('id', req.user.id);
    if (error) throw error;
    res.json({ message: 'Account deleted' });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
};

module.exports = { getMyHostels, createHostel, updateHostel, addRoom, updateRoom, deleteRoom, getMyBookings, confirmBooking, rejectBooking, deleteMyAccount };