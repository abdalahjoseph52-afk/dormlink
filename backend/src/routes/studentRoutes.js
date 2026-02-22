const express = require('express');
const router = express.Router();
const { protect, allowRoles } = require('../middleware/authMiddleware');
const { getMyBookings, cancelBooking, submitPayment, deleteMyAccount, updateProfile } = require('../controllers/studentController');

const student = [protect, allowRoles('student')];

router.get('/bookings', ...student, getMyBookings);
router.patch('/bookings/:id/cancel', ...student, cancelBooking);
router.post('/bookings/:id/pay', ...student, submitPayment);
router.delete('/account', ...student, deleteMyAccount);
router.patch('/profile', ...student, updateProfile);

module.exports = router;