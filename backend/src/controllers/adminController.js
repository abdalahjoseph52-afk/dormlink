const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

// GET DASHBOARD STATS
const getDashboardStats = async (req, res) => {
  try {
    const [
      { count: totalUsers },
      { count: totalStudents },
      { count: totalHosts },
      { count: totalHostels },
      { count: pendingHostels },
      { count: totalBookings },
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student'),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'host'),
      supabase.from('hostels').select('*', { count: 'exact', head: true }),
      supabase.from('hostels').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('bookings').select('*', { count: 'exact', head: true }),
    ]);
    res.json({ stats: { totalUsers, totalStudents, totalHosts, totalHostels, pendingHostels, totalBookings } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, role, is_verified, is_active, created_at')
      .order('created_at', { ascending: false });
    if (role) query = query.eq('role', role);
    const { data: users, error } = await query;
    if (error) throw error;
    res.json({ users });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) return res.status(400).json({ error: 'Cannot delete your own account' });
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// RESET USER PASSWORD
const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_password } = req.body;
    if (!new_password || new_password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(new_password, salt);
    const { error } = await supabase.from('users').update({ password_hash, updated_at: new Date() }).eq('id', id);
    if (error) throw error;
    await supabase.from('notifications').insert([{
      user_id: id,
      title: 'Password Reset',
      message: 'Your password has been reset by an administrator. Please use your new password to log in.',
      type: 'account',
    }]);
    res.json({ message: 'Password reset successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// TOGGLE USER STATUS (suspend/activate)
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;
    const { data: user, error } = await supabase
      .from('users').update({ is_active, updated_at: new Date() }).eq('id', id).select().single();
    if (error) throw error;
    await supabase.from('notifications').insert([{
      user_id: id,
      title: is_active ? 'Account Activated' : 'Account Suspended',
      message: is_active
        ? 'Your SakaBoma account has been reactivated.'
        : 'Your SakaBoma account has been suspended. Contact support for help.',
      type: 'account',
    }]);
    res.json({ message: `User ${is_active ? 'activated' : 'suspended'}`, user });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET ALL HOSTELS
const getAllHostels = async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase
      .from('hostels')
      .select('*, users(id, first_name, last_name, email, phone), universities(id, name, city)')
      .order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data: hostels, error } = await query;
    if (error) throw error;
    res.json({ hostels });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// APPROVE HOSTEL
const approveHostel = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: hostel, error } = await supabase
      .from('hostels')
      .update({ status: 'approved', updated_at: new Date() })
      .eq('id', id)
      .select('*, users(id, first_name)')
      .single();
    if (error) throw error;
    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });
    await supabase.from('notifications').insert([{
      user_id: hostel.owner_id,
      title: 'Hostel Approved!',
      message: `Your hostel "${hostel.name}" has been approved and is now live on SakaBoma!`,
      type: 'hostel_review',
    }]);
    res.json({ message: 'Hostel approved successfully', hostel });
  } catch (e) {
    console.error('Approve hostel error:', e);
    res.status(500).json({ error: e.message || 'Server error' });
  }
};

// REJECT HOSTEL
const rejectHostel = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const { data: hostel, error } = await supabase
      .from('hostels')
      .update({ status: 'rejected', updated_at: new Date() })
      .eq('id', id)
      .select('*, users(id, first_name)')
      .single();
    if (error) throw error;
    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });
    await supabase.from('notifications').insert([{
      user_id: hostel.owner_id,
      title: 'Hostel Not Approved',
      message: `Your hostel "${hostel.name}" was not approved. ${reason || 'Please contact support for details.'}`,
      type: 'hostel_review',
    }]);
    res.json({ message: 'Hostel rejected', hostel });
  } catch (e) {
    console.error('Reject hostel error:', e);
    res.status(500).json({ error: e.message || 'Server error' });
  }
};

// DELETE HOSTEL (cascade: payments → bookings → rooms → hostel)
const deleteHostel = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fetch hostel info before deletion
    const { data: hostel } = await supabase
      .from('hostels').select('name, owner_id').eq('id', id).single();

    // 2. Get all rooms for this hostel
    const { data: rooms } = await supabase
      .from('rooms').select('id').eq('hostel_id', id);
    const roomIds = (rooms || []).map(r => r.id);

    // 3. Get all bookings for those rooms
    const { data: bookings } = roomIds.length
      ? await supabase.from('bookings').select('id').in('room_id', roomIds)
      : { data: [] };
    const bookingIds = (bookings || []).map(b => b.id);

    // 4. Delete payments linked to those bookings
    if (bookingIds.length) {
      await supabase.from('payments').delete().in('booking_id', bookingIds);
    }

    // 5. Delete bookings
    if (roomIds.length) {
      await supabase.from('bookings').delete().in('room_id', roomIds);
    }

    // 6. Delete rooms
    if (roomIds.length) {
      const { error: roomErr } = await supabase.from('rooms').delete().eq('hostel_id', id);
      if (roomErr) throw roomErr;
    }

    // 7. Delete the hostel
    const { error } = await supabase.from('hostels').delete().eq('id', id);
    if (error) throw error;

    // 8. Notify the host
    if (hostel?.owner_id) {
      await supabase.from('notifications').insert([{
        user_id: hostel.owner_id,
        title: 'Hostel Removed',
        message: `Your hostel "${hostel.name}" has been removed by an administrator.`,
        type: 'hostel_review',
      }]);
    }

    res.json({ message: 'Hostel deleted successfully' });
  } catch (e) {
    console.error('Delete hostel error:', e);
    res.status(500).json({ error: e.message || 'Server error' });
  }
};

// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase
      .from('bookings')
      .select('*, users!student_id(id, first_name, last_name, email), rooms(id, room_type, price_per_semester), hostels(id, name, address)')
      .order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data: bookings, error } = await query;
    if (error) throw error;
    res.json({ bookings });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

// CONFIRM PAYMENT
const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ payment_status: 'paid', updated_at: new Date() })
      .eq('id', bookingId)
      .select('*, users!student_id(id, first_name), hostels(name)')
      .single();
    if (error) throw error;
    await supabase.from('notifications').insert([{
      user_id: booking.student_id,
      title: 'Payment Confirmed!',
      message: `Your payment for ${booking.hostels?.name} has been verified. Your room is secured!`,
      type: 'payment',
    }]);
    res.json({ message: 'Payment confirmed', booking });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  resetUserPassword,
  toggleUserStatus,
  getAllHostels,
  approveHostel,
  rejectHostel,
  deleteHostel,
  getAllBookings,
  confirmPayment,
};
