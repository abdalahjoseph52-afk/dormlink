const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

// ─────────────────────────────────────────
// GET ALL USERS
// ─────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, role, is_verified, is_active, created_at, nida_number, tin_number, address')
      .order('created_at', { ascending: false });
    if (role) query = query.eq('role', role);
    const { data: users, error } = await query;
    if (error) throw error;
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// DELETE USER
// ─────────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Don't allow admin to delete themselves
    if (id === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// RESET USER PASSWORD
// ─────────────────────────────────────────
const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_password } = req.body;

    if (!new_password || new_password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const hashed = await bcrypt.hash(new_password, 10);

    const { error } = await supabase
      .from('users')
      .update({ password: hashed })
      .eq('id', id);

    if (error) throw error;

    // Notify user
    await supabase.from('notifications').insert([{
      user_id: id,
      title: 'Password Reset',
      message: 'Your password has been reset by an administrator. Please login with your new password.',
      type: 'account',
    }]);

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// TOGGLE USER ACTIVE STATUS
// ─────────────────────────────────────────
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({ is_active })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    await supabase.from('notifications').insert([{
      user_id: id,
      title: is_active ? 'Account Activated' : 'Account Suspended',
      message: is_active
        ? 'Your DormLink account has been reactivated.'
        : 'Your DormLink account has been suspended. Contact support.',
      type: 'account',
    }]);

    res.json({ message: `User ${is_active ? 'activated' : 'suspended'} successfully`, user });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET ALL HOSTELS
// ─────────────────────────────────────────
const getAllHostels = async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase
      .from('hostels')
      .select(`*, users(id, first_name, last_name, email, phone, nida_number, tin_number, address), universities(id, name, city), rooms(id, room_type, price_per_semester, capacity, available_count)`)
      .order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data: hostels, error } = await query;
    if (error) throw error;
    res.json({ hostels });
  } catch (error) {
    console.error('Get hostels error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// APPROVE HOSTEL  ← THIS WAS THE BUG — wrong function name in routes
// ─────────────────────────────────────────
const approveHostel = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: hostel, error } = await supabase
      .from('hostels')
      .update({ status: 'approved', updated_at: new Date() })
      .eq('id', id)
      .select(`*, users(id, first_name)`)
      .single();

    if (error) throw error;

    await supabase.from('notifications').insert([{
      user_id: hostel.owner_id,
      title: 'Hostel Approved!',
      message: `Your hostel "${hostel.name}" has been approved and is now live on DormLink!`,
      type: 'hostel_review',
    }]);

    res.json({ message: 'Hostel approved successfully', hostel });
  } catch (error) {
    console.error('Approve hostel error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// ─────────────────────────────────────────
// REJECT HOSTEL
// ─────────────────────────────────────────
const rejectHostel = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const { data: hostel, error } = await supabase
      .from('hostels')
      .update({ status: 'rejected', updated_at: new Date() })
      .eq('id', id)
      .select(`*, users(id, first_name)`)
      .single();

    if (error) throw error;

    await supabase.from('notifications').insert([{
      user_id: hostel.owner_id,
      title: 'Hostel Not Approved',
      message: `Your hostel "${hostel.name}" was not approved. ${reason || 'Please contact support for details.'}`,
      type: 'hostel_review',
    }]);

    res.json({ message: 'Hostel rejected', hostel });
  } catch (error) {
    console.error('Reject hostel error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// ─────────────────────────────────────────
// DELETE HOSTEL
// ─────────────────────────────────────────
const deleteHostel = async (req, res) => {
  try {
    const { id } = req.params;

    // Get hostel info first for notification
    const { data: hostel } = await supabase
      .from('hostels')
      .select('name, owner_id')
      .eq('id', id)
      .single();

    const { error } = await supabase.from('hostels').delete().eq('id', id);
    if (error) throw error;

    if (hostel?.owner_id) {
      await supabase.from('notifications').insert([{
        user_id: hostel.owner_id,
        title: 'Property Removed',
        message: `Your property "${hostel.name}" has been removed by an administrator.`,
        type: 'hostel_review',
      }]);
    }

    res.json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    console.error('Delete hostel error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET ALL BOOKINGS
// ─────────────────────────────────────────
const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase
      .from('bookings')
      .select(`*, users(id, first_name, last_name, email), rooms(id, room_type, price_per_semester, price_per_month), hostels(id, name, address)`)
      .order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data: bookings, error } = await query;
    if (error) throw error;
    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// CONFIRM PAYMENT (Admin confirms student paid)
// ─────────────────────────────────────────
const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ payment_status: 'paid', payment_confirmed_at: new Date() })
      .eq('id', bookingId)
      .select(`*, users!student_id(id, first_name), hostels(name, owner_id)`)
      .single();

    if (error) throw error;

    // Notify student
    await supabase.from('notifications').insert([{
      user_id: booking.users.id,
      title: 'Payment Confirmed!',
      message: `Your payment for ${booking.hostels.name} has been confirmed. Welcome!`,
      type: 'payment',
    }]);

    // Notify host
    await supabase.from('notifications').insert([{
      user_id: booking.hostels.owner_id,
      title: 'Student Payment Confirmed',
      message: `A student's deposit for ${booking.hostels.name} has been confirmed by admin. Commission: TZS ${parseFloat(booking.commission_amount || 0).toLocaleString()}`,
      type: 'payment',
    }]);

    res.json({ message: 'Payment confirmed', booking });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET DASHBOARD STATS
// ─────────────────────────────────────────
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
  } catch (error) {
    console.error('Dashboard stats error:', error);
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