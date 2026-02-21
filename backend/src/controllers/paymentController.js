const supabase = require('../config/supabase');

// ─────────────────────────────────────────
// SUBMIT PAYMENT PROOF (Student)
// ─────────────────────────────────────────
const submitPaymentProof = async (req, res) => {
  try {
    const { booking_id, payment_method, transaction_id, phone_number } = req.body;
    const student_id = req.user.id;

    if (!booking_id || !payment_method || !transaction_id) {
      return res.status(400).json({ error: 'Please provide payment method and transaction ID' });
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, hostels(name, owner_id), rooms(room_type)')
      .eq('id', booking_id)
      .eq('student_id', student_id)
      .single();

    if (error || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.payment_status === 'paid') {
      return res.status(400).json({ error: 'This booking is already paid' });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ error: 'Host must confirm booking before payment' });
    }

    await supabase
      .from('bookings')
      .update({
        payment_method,
        transaction_id,
        payment_status: 'pending_confirmation',
      })
      .eq('id', booking_id);

    // Notify host
    await supabase.from('notifications').insert([{
      user_id: booking.hostels.owner_id,
      title: 'Payment Proof Submitted',
      message: `A student submitted payment proof for ${booking.rooms.room_type} at ${booking.hostels.name}. Transaction ID: ${transaction_id}. Please verify and confirm.`,
      type: 'payment',
    }]);

    // Notify student
    await supabase.from('notifications').insert([{
      user_id: student_id,
      title: 'Payment Proof Submitted',
      message: 'Your payment proof has been submitted. The host will verify and confirm within 24 hours.',
      type: 'payment',
    }]);

    res.json({ message: 'Payment proof submitted. Waiting for host confirmation.' });

  } catch (error) {
    console.error('Submit payment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// CONFIRM PAYMENT (Host)
// ─────────────────────────────────────────
const confirmPayment = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const host_id = req.user.id;

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, hostels(name, owner_id), rooms(room_type), users!student_id(id, first_name, email)')
      .eq('id', booking_id)
      .single();

    if (error || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.hostels.owner_id !== host_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const deposit = parseFloat(booking.deposit_amount || 0);
    const commission = deposit * 0.03;
    const host_amount = deposit - commission;

    await supabase
      .from('bookings')
      .update({
        payment_status: 'paid',
        payment_confirmed_at: new Date(),
        commission_amount: commission,
        host_amount,
      })
      .eq('id', booking_id);

    await supabase.from('payments').insert([{
      booking_id,
      student_id: booking.student_id,
      amount: deposit,
      commission,
      host_amount,
      payment_method: booking.payment_method,
      transaction_id: booking.transaction_id,
      status: 'successful',
    }]);

    await supabase.from('notifications').insert([{
      user_id: booking.users.id,
      title: 'Payment Confirmed!',
      message: `Your payment for ${booking.hostels.name} has been confirmed. Your room is secured for ${booking.semester}!`,
      type: 'payment',
    }]);

    res.json({ message: 'Payment confirmed successfully' });

  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// REJECT PAYMENT (Host)
// ─────────────────────────────────────────
const rejectPayment = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { reason } = req.body;
    const host_id = req.user.id;

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, hostels(name, owner_id)')
      .eq('id', booking_id)
      .single();

    if (error || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.hostels.owner_id !== host_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await supabase
      .from('bookings')
      .update({ payment_status: 'rejected', transaction_id: null })
      .eq('id', booking_id);

    await supabase.from('notifications').insert([{
      user_id: booking.student_id,
      title: 'Payment Not Verified',
      message: `Your payment proof for ${booking.hostels.name} could not be verified. Reason: ${reason || 'Transaction not found'}. Please resubmit with the correct transaction ID.`,
      type: 'payment',
    }]);

    res.json({ message: 'Payment rejected. Student has been notified.' });

  } catch (error) {
    console.error('Reject payment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ─────────────────────────────────────────
// GET PAYMENT INSTRUCTIONS
// ─────────────────────────────────────────
const getPaymentInstructions = async (req, res) => {
  try {
    const { data: settings } = await supabase
      .from('payment_settings')
      .select('*')
      .limit(1)
      .single();

    res.json({
      instructions: settings || {
        mpesa_number: '0744000000',
        tigo_number: '0654000000',
        airtel_number: '0684000000',
        bank_name: 'CRDB Bank',
        bank_account: '0150123456789',
        bank_account_name: 'DormLink Tanzania Ltd',
      }
    });
  } catch (error) {
    res.json({
      instructions: {
        mpesa_number: '0744000000',
        tigo_number: '0654000000',
        airtel_number: '0684000000',
        bank_name: 'CRDB Bank',
        bank_account: '0150123456789',
        bank_account_name: 'DormLink Tanzania Ltd',
      }
    });
  }
};

// ─────────────────────────────────────────
// SINGLE EXPORT AT THE BOTTOM
// ─────────────────────────────────────────
module.exports = {
  submitPaymentProof,
  confirmPayment,
  rejectPayment,
  getPaymentInstructions,
};