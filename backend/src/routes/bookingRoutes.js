const express = require('express');
const router = express.Router();
const { protect, allowRoles } = require('../middleware/authMiddleware');
const {
  createBooking,
  getMyBookings,
  getHostBookings,
  reviewBooking,
  cancelBooking,
  leaveReview,
} = require('../controllers/bookingController');

// Student routes
router.post('/', protect, allowRoles('student'), createBooking);
router.get('/my', protect, allowRoles('student'), getMyBookings);
router.patch('/:id/cancel', protect, allowRoles('student'), cancelBooking);
router.post('/review', protect, allowRoles('student'), leaveReview);

// Host routes
router.get('/host', protect, allowRoles('host'), getHostBookings);
router.patch('/:id/review', protect, allowRoles('host'), reviewBooking);

module.exports = router;