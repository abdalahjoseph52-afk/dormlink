const express = require('express');
const router = express.Router();
const { protect, allowRoles } = require('../middleware/authMiddleware');
const {
  submitPaymentProof,
  confirmPayment,
  rejectPayment,
  getPaymentInstructions,
} = require('../controllers/paymentController');

router.get('/instructions', protect, getPaymentInstructions);
router.post('/submit-proof', protect, allowRoles('student'), submitPaymentProof);
router.patch('/confirm/:booking_id', protect, allowRoles('host'), confirmPayment);
router.patch('/reject/:booking_id', protect, allowRoles('host'), rejectPayment);

module.exports = router;