const supabase = require('../config/supabase');

// ─────────────────────────────────────────
// GET DASHBOARD STATS
// ─────────────────────────────────────────
const getDashboardStats = async (req, res) => {
  try {
    // Count all users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Count students
    const { count: totalStudents } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');

    // Count hosts
    const { count: totalHosts } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'host');

    // Count hostels
    const { count: totalHostels } = await supabase
      .from('hostels')
      .select('*', { count: 'exact', head: true });

    // Count pending hostels
    const { count: pendingHostels } = await supabase
      .from('hostels')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Count total bookings
    const { count: totalBookings } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    // Sum total revenue (commission earned)
    const { data: revenueData } = await supabase
      .from('payments')
      .select('commission')
      .eq('status', 'successful');

    const totalRevenue = revenueData
      ? revenueData.reduce((sum, p) => sum + parseFloat(p.commission), 0)
      : 0;

    res.json({
      stats: {
        totalUsers,
        totalStudents,
        totalHosts,
        totalHostels,
        pendingHostels,
        totalBookings,
        totalRevenue
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET ALL USERS
// ─────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const { role, is_active } = req.query;

    let query = supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, role, is_verified, is_active, created_at')
      .order('created_at', { ascending: false });

    if (role) query = query.eq('role', role);
    if (is_active !== undefined) query = query.eq('is_active', is_active === 'true');

    const { data: users, error } = await query;
    if (error) throw error;

    res.json({ users });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// SUSPEND OR ACTIVATE USER
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

    // Send notification to user
    await supabase.from('notifications').insert([{
      user_id: id,
      title: is_active ? 'Account Activated' : 'Account Suspended',
      message: is_active
        ? 'Your DormLink account has been reactivated.'
        : 'Your DormLink account has been suspended. Contact support.',
      type: 'account'
    }]);

    res.json({
      message: `User ${is_active ? 'activated' : 'suspended'} successfully`,
      user
    });

  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET ALL HOSTELS (with filters)
// ─────────────────────────────────────────
const getAllHostels = async (req, res) => {
  try {
    const { status } = req.query;

    let query = supabase
      .from('hostels')
      .select(`
        *,
        users (id, first_name, last_name, email, phone),
        universities (id, name, city)
      `)
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
// APPROVE OR REJECT HOSTEL
// ─────────────────────────────────────────
const reviewHostel = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be approved or rejected' });
    }

    // Update hostel status
    const { data: hostel, error } = await supabase
      .from('hostels')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select(`*, users(id, first_name)`)
      .single();

    if (error) throw error;

    // Notify the host
    await supabase.from('notifications').insert([{
      user_id: hostel.owner_id,
      title: status === 'approved' ? '🎉 Hostel Approved!' : 'Hostel Rejected',
      message: status === 'approved'
        ? `Your hostel "${hostel.name}" has been approved and is now live on DormLink!`
        : `Your hostel "${hostel.name}" was rejected. ${admin_notes || 'Please contact support.'}`,
      type: 'hostel_review'
    }]);

    res.json({
      message: `Hostel ${status} successfully`,
      hostel
    });

  } catch (error) {
    console.error('Review hostel error:', error);
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
      .select(`
        *,
        users (id, first_name, last_name, email),
        rooms (id, room_type, price_per_month),
        hostels (id, name, address)
      `)
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
// GET ALL TRANSACTIONS
// ─────────────────────────────────────────
const getAllTransactions = async (req, res) => {
  try {
    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
        *,
        users (id, first_name, last_name, email),
        bookings (id, hostel_id, hostels(name))
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ payments });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  toggleUserStatus,
  getAllHostels,
  reviewHostel,
  getAllBookings,
  getAllTransactions
};