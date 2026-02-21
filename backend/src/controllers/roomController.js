require('dotenv').config();
const supabase = require('../config/supabase');

// ─────────────────────────────────────────
// ADD ROOM TO HOSTEL (Host only)
// ─────────────────────────────────────────
const addRoom = async (req, res) => {
  try {
    const { hostel_id } = req.params;
    const {
      room_type,
      description,
      price_per_month,
      capacity,
      available_count,
      amenities
    } = req.body;

    // Validate
    if (!room_type || !price_per_month) {
      return res.status(400).json({
        error: 'Please provide room type and price'
      });
    }

    // Check hostel belongs to this host
    const { data: hostel } = await supabase
      .from('hostels')
      .select('id, owner_id, status')
      .eq('id', hostel_id)
      .single();

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    if (hostel.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { data: room, error } = await supabase
      .from('rooms')
      .insert([{
        hostel_id,
        room_type,
        description,
        price_per_month,
        capacity: capacity || 1,
        available_count: available_count || 1,
        amenities: amenities || [],
        is_available: true
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Room added successfully',
      room
    });

  } catch (error) {
    console.error('Add room error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET ROOMS FOR A HOSTEL
// ─────────────────────────────────────────
const getHostelRooms = async (req, res) => {
  try {
    const { hostel_id } = req.params;

    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('hostel_id', hostel_id)
      .order('price_per_month', { ascending: true });

    if (error) throw error;

    res.json({ rooms });

  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// UPDATE ROOM (Host only)
// ─────────────────────────────────────────
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: room, error } = await supabase
      .from('rooms')
      .update({ ...req.body, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: 'Room updated successfully', room });

  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// DELETE ROOM (Host only)
// ─────────────────────────────────────────
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Room deleted successfully' });

  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addRoom,
  getHostelRooms,
  updateRoom,
  deleteRoom
};