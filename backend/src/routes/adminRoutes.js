const express = require('express');
const router = express.Router();
const { protect, allowRoles } = require('../middleware/authMiddleware');
const {
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
} = require('../controllers/adminController');

const admin = [protect, allowRoles('admin')];

// Stats
router.get('/stats', ...admin, getDashboardStats);

// Users
router.get('/users', ...admin, getAllUsers);
router.delete('/users/:id', ...admin, deleteUser);
router.patch('/users/:id/reset-password', ...admin, resetUserPassword);
router.patch('/users/:id/toggle-status', ...admin, toggleUserStatus);

// Hostels
router.get('/hostels', ...admin, getAllHostels);
router.patch('/hostels/:id/approve', ...admin, approveHostel);
router.patch('/hostels/:id/reject', ...admin, rejectHostel);
router.delete('/hostels/:id', ...admin, deleteHostel);

// Bookings
router.get('/bookings', ...admin, getAllBookings);
router.patch('/bookings/:bookingId/confirm-payment', ...admin, confirmPayment);

module.exports = router;