const express = require('express');
const router = express.Router();
const { protect, allowRoles } = require('../middleware/authMiddleware');
const {
  getDashboardStats,
  getAllUsers,
  toggleUserStatus,
  getAllHostels,
  reviewHostel,
  getAllBookings,
  getAllTransactions
} = require('../controllers/adminController');

// All admin routes require login AND admin role
router.use(protect);
router.use(allowRoles('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/status', toggleUserStatus);
router.get('/hostels', getAllHostels);
router.patch('/hostels/:id/review', reviewHostel);
router.get('/bookings', getAllBookings);
router.get('/transactions', getAllTransactions);

module.exports = router;