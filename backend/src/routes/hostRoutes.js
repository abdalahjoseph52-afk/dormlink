const express = require('express');
const router = express.Router();
const { protect, allowRoles } = require('../middleware/authMiddleware');
const {
  getMyHostels, createHostel, updateHostel,
  addRoom, updateRoom, deleteRoom,
  getMyBookings, confirmBooking, rejectBooking,
  deleteMyAccount,
} = require('../controllers/hostController');

const host = [protect, allowRoles('host')];

router.get('/hostels', ...host, getMyHostels);
router.post('/hostels', ...host, createHostel);
router.patch('/hostels/:id', ...host, updateHostel);

router.post('/hostels/:hostelId/rooms', ...host, addRoom);
router.patch('/rooms/:roomId', ...host, updateRoom);
router.delete('/rooms/:roomId', ...host, deleteRoom);

router.get('/bookings', ...host, getMyBookings);
router.patch('/bookings/:id/confirm', ...host, confirmBooking);
router.patch('/bookings/:id/reject', ...host, rejectBooking);

router.delete('/account', ...host, deleteMyAccount);

module.exports = router;