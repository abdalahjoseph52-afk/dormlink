const express = require('express');
const router = express.Router();
const { protect, allowRoles } = require('../middleware/authMiddleware');
const {
  createHostel,
  getMyHostels,
  updateHostel,
  getApprovedHostels,
  getHostelById,
  getUniversities
} = require('../controllers/hostelController');
const {
  addRoom,
  getHostelRooms,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

// ── IMPORTANT: Specific routes MUST come before /:id routes ──

// Public routes
router.get('/universities', getUniversities);
router.get('/approved', getApprovedHostels);

// Host only routes
router.get('/my/listings', protect, allowRoles('host'), getMyHostels);
router.post('/', protect, allowRoles('host'), createHostel);
router.put('/:id', protect, allowRoles('host'), updateHostel);
router.post('/:hostel_id/rooms', protect, allowRoles('host'), addRoom);
router.put('/rooms/:id', protect, allowRoles('host'), updateRoom);
router.delete('/rooms/:id', protect, allowRoles('host'), deleteRoom);

// This MUST be last because /:id matches everything
router.get('/:id', getHostelById);
router.get('/:hostel_id/rooms', getHostelRooms);

module.exports = router;
