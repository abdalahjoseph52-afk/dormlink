require('dotenv').config();
const supabase = require('../config/supabase');

// ─────────────────────────────────────────
// CREATE HOSTEL (Host only)
// ─────────────────────────────────────────
const createHostel = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      city,
      university_id,
      distance_from_university,
      amenities,
      latitude,
      longitude
    } = req.body;

    // Validate required fields
    if (!name || !address || !city || !university_id) {
      return res.status(400).json({
        error: 'Please provide name, address, city, and university'
      });
    }

    const { data: hostel, error } = await supabase
      .from('hostels')
      .insert([{
        owner_id: req.user.id,
        name,
        description,
        address,
        city,
        university_id,
        distance_from_university: distance_from_university || null,
        amenities: amenities || [],
        latitude: latitude || null,
        longitude: longitude || null,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Notify admin
    const { data: admins } = await supabase
      .from('users')
      .select('id')
      .eq('role', 'admin');

    if (admins && admins.length > 0) {
      const notifications = admins.map(admin => ({
        user_id: admin.id,
        title: 'New Hostel Submitted',
        message: `A new hostel "${name}" has been submitted for approval.`,
        type: 'hostel_submission'
      }));
      await supabase.from('notifications').insert(notifications);
    }

    res.status(201).json({
      message: 'Hostel submitted successfully. Waiting for admin approval.',
      hostel
    });

  } catch (error) {
    console.error('Create hostel error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET HOST'S OWN HOSTELS
// ─────────────────────────────────────────
const getMyHostels = async (req, res) => {
  try {
    const { data: hostels, error } = await supabase
      .from('hostels')
      .select(`
        *,
        universities (id, name, city),
        rooms (id, room_type, price_per_month, available_count)
      `)
      .eq('owner_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ hostels });

  } catch (error) {
    console.error('Get my hostels error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// UPDATE HOSTEL (Host only)
// ─────────────────────────────────────────
const updateHostel = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure this hostel belongs to this host
    const { data: existing } = await supabase
      .from('hostels')
      .select('id, owner_id')
      .eq('id', id)
      .single();

    if (!existing) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    if (existing.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to edit this hostel' });
    }

    const {
      name,
      description,
      address,
      city,
      distance_from_university,
      amenities,
      latitude,
      longitude
    } = req.body;

    const { data: hostel, error } = await supabase
      .from('hostels')
      .update({
        name,
        description,
        address,
        city,
        distance_from_university,
        amenities,
        latitude,
        longitude,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: 'Hostel updated successfully', hostel });

  } catch (error) {
    console.error('Update hostel error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET ALL APPROVED HOSTELS (Students browse)
// ─────────────────────────────────────────
const getApprovedHostels = async (req, res) => {
  try {
    const { university_id, city, min_price, max_price } = req.query;

    let query = supabase
      .from('hostels')
      .select(`
        *,
        universities (id, name, city),
        rooms (id, room_type, price_per_month, available_count, is_available)
      `)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (university_id) query = query.eq('university_id', university_id);
    if (city) query = query.ilike('city', `%${city}%`);

    const { data: hostels, error } = await query;
    if (error) throw error;

    // Filter by price if provided
    let filtered = hostels;
    if (min_price || max_price) {
      filtered = hostels.filter(hostel => {
        if (!hostel.rooms || hostel.rooms.length === 0) return false;
        const prices = hostel.rooms.map(r => r.price_per_month);
        const minRoomPrice = Math.min(...prices);
        const maxRoomPrice = Math.max(...prices);
        if (min_price && maxRoomPrice < parseFloat(min_price)) return false;
        if (max_price && minRoomPrice > parseFloat(max_price)) return false;
        return true;
      });
    }

    res.json({
      total: filtered.length,
      hostels: filtered
    });

  } catch (error) {
    console.error('Get approved hostels error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET SINGLE HOSTEL DETAILS
// ─────────────────────────────────────────
const getHostelById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: hostel, error } = await supabase
      .from('hostels')
      .select(`
        *,
        universities (id, name, city),
        rooms (*)
      `)
      .eq('id', id)
      .single();

    if (error || !hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    // Get reviews for this hostel
    const { data: reviews } = await supabase
      .from('reviews')
      .select(`
        *,
        users (id, first_name, last_name, profile_image)
      `)
      .eq('hostel_id', id)
      .order('created_at', { ascending: false });

    // Calculate average rating
    const avgRating = reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({
      hostel,
      reviews: reviews || [],
      average_rating: parseFloat(avgRating.toFixed(1)),
      total_reviews: reviews ? reviews.length : 0
    });

  } catch (error) {
    console.error('Get hostel by id error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET ALL UNIVERSITIES (for dropdown)
// ─────────────────────────────────────────
const getUniversities = async (req, res) => {
  try {
    const { data: universities, error } = await supabase
      .from('universities')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;

    res.json({ universities });

  } catch (error) {
    console.error('Get universities error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createHostel,
  getMyHostels,
  updateHostel,
  getApprovedHostels,
  getHostelById,
  getUniversities
};