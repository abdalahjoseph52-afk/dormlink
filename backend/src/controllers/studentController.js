const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

// GET MY BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`*, rooms(id, room_type, room_label, price_per_semester, price_per_month, capacity, images, floor), hostels(id, name, address, city, images, universities(name))`)
      .eq('student_id', req.user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ bookings });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// CANCEL BOOKING (only if not yet confirmed + paid)
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: booking, error: fe } = await supabase
      .from('bookings')
      .select('*, hostels(name, owner_id)')
      .eq('id', id)
      .eq('student_id', req.user.id)
      .single();
    if (fe || !booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.status === 'confirmed' && booking.payment_status === 'paid') {
      return res.status(400).json({ error: 'Cannot cancel a confirmed and paid booking. Contact support.' });
    }
    const { error } = await supabase.from('bookings').update({ status: 'cancelled', updated_at: new Date() }).eq('id', id);
    if (error) throw error;
    if (booking.hostels?.owner_id) {
      await supabase.from('notifications').insert([{ user_id: booking.hostels.owner_id, title: 'Booking Cancelled', message: `A student cancelled their booking for ${booking.hostels.name}.`, type: 'booking' }]);
    }
    res.json({ message: 'Booking cancelled successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// SUBMIT PAYMENT PROOF
const submitPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_method, transaction_id } = req.body;
    if (!payment_method || !transaction_id) return res.status(400).json({ error: 'Payment method and transaction ID are required' });
    const { data: booking, error: fe } = await supabase
      .from('bookings').select('*, hostels(name, owner_id)').eq('id', id).eq('student_id', req.user.id).single();
    if (fe || !booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.status !== 'confirmed') return res.status(400).json({ error: 'Host must confirm booking first' });
    if (booking.payment_status === 'paid') return res.status(400).json({ error: 'Already paid' });
    const { error } = await supabase.from('bookings').update({ payment_method, transaction_id, payment_status: 'pending_confirmation', updated_at: new Date() }).eq('id', id);
    if (error) throw error;
    const { data: admins } = await supabase.from('users').select('id').eq('role', 'admin').limit(1);
    if (admins?.length > 0) {
      await supabase.from('notifications').insert([{ user_id: admins[0].id, title: 'New Payment Submitted', message: `Payment for ${booking.hostels?.name}. TX: ${transaction_id}`, type: 'payment' }]);
    }
    res.json({ message: 'Payment proof submitted! Admin will verify.' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE OWN ACCOUNT
const deleteMyAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const { data: user } = await supabase.from('users').select('password').eq('id', req.user.id).single();
    if (!user) return res.status(404).json({ error: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Incorrect password' });
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('student_id', req.user.id).neq('status', 'confirmed');
    const { error } = await supabase.from('users').delete().eq('id', req.user.id);
    if (error) throw error;
    res.json({ message: 'Account deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, phone } = req.body;
    const { data: user, error } = await supabase.from('users').update({ first_name, last_name, phone, updated_at: new Date() }).eq('id', req.user.id).select('id, email, first_name, last_name, phone, role').single();
    if (error) throw error;
    res.json({ message: 'Profile updated', user });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getMyBookings, cancelBooking, submitPayment, deleteMyAccount, updateProfile };