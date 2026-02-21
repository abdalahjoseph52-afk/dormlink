'use client';
import { useState, useEffect, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

const PAYMENT_METHODS = [
  { id: 'mpesa', label: 'M-Pesa (Vodacom)', color: '#00a651', number_key: 'mpesa_number' },
  { id: 'tigo', label: 'Tigo Pesa', color: '#0066cc', number_key: 'tigo_number' },
  { id: 'airtel', label: 'Airtel Money', color: '#ff0000', number_key: 'airtel_number' },
  { id: 'bank', label: 'Bank Transfer', color: '#0f172a', number_key: 'bank_account' },
];

export default function PaymentPage({ params }) {
  const { bookingId } = use(params);
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, instrRes] = await Promise.all([
        api.get('/bookings/my'),
        api.get('/payments/instructions'),
      ]);
      const b = bookingsRes.data.bookings.find(b => b.id === bookingId);
      setBooking(b);
      setInstructions(instrRes.data.instructions);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const getPaymentNumber = () => {
    if (!instructions || !selectedMethod) return '';
    const method = PAYMENT_METHODS.find(m => m.id === selectedMethod);
    return instructions[method?.number_key] || '';
  };

  const handleSubmit = async () => {
    if (!selectedMethod) { toast.error('Please select a payment method'); return; }
    if (!transactionId.trim()) { toast.error('Please enter your transaction ID'); return; }
    setSubmitting(true);
    try {
      await api.post('/payments/submit-proof', {
        booking_id: bookingId,
        payment_method: selectedMethod,
        transaction_id: transactionId.trim(),
        phone_number: phoneNumber,
      });
      setSubmitted(true);
      toast.success('Payment proof submitted! Host will confirm within 24 hours.');
    } catch (e) {
      toast.error(e.response?.data?.error || 'Submission failed');
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'Inter,sans-serif',color:'#94a3b8'}}>
      Loading...
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Inter',sans-serif;background:#f8fafc;min-height:100vh;padding:32px 16px;}
        .page{max-width:520px;margin:0 auto;}
        .logo{font-family:'Merriweather',serif;font-size:20px;font-weight:700;color:#1e429f;display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:28px;}
        .logo-mark{width:32px;height:32px;background:#1a56db;border-radius:8px;display:flex;align-items:center;justify-content:center;}
        .card{background:white;border-radius:14px;padding:28px;border:1px solid #e2e8f0;margin-bottom:16px;}
        .card-title{font-family:'Merriweather',serif;font-size:18px;font-weight:700;color:#0f172a;margin-bottom:4px;}
        .card-sub{font-size:13px;color:#94a3b8;margin-bottom:20px;}
        .summary{background:#f0f5ff;border-radius:10px;padding:16px;margin-bottom:20px;}
        .summary-row{display:flex;justify-content:space-between;font-size:14px;color:#475569;margin-bottom:6px;align-items:center;}
        .summary-row:last-child{margin-bottom:0;font-weight:700;color:#0f172a;font-size:16px;border-top:1px solid #c7d9f8;padding-top:10px;margin-top:6px;}
        .summary-label{color:#94a3b8;font-size:12px;margin-bottom:2px;}
        .step{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
        .step-num{width:24px;height:24px;background:#1a56db;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;}
        .step-title{font-size:14px;font-weight:700;color:#0f172a;}
        .methods{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
        .method{display:flex;align-items:center;gap:12px;padding:14px 16px;border:2px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:all 0.15s;}
        .method:hover{border-color:#1a56db;}
        .method.selected{border-color:#1a56db;background:#f0f5ff;}
        .method-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
        .method-label{font-size:14px;font-weight:600;color:#0f172a;flex:1;}
        .method-radio{width:20px;height:20px;border:2px solid #e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s;}
        .method.selected .method-radio{border-color:#1a56db;background:#1a56db;}
        .radio-dot{width:8px;height:8px;border-radius:50%;background:white;}
        .payment-number-box{background:#0f172a;border-radius:10px;padding:16px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;}
        .payment-number-label{font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;}
        .payment-number{font-size:22px;font-weight:700;color:white;letter-spacing:2px;}
        .copy-btn{background:rgba(255,255,255,0.1);border:none;color:white;padding:8px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:4px;}
        .copy-btn:hover{background:rgba(255,255,255,0.2);}
        .form-group{margin-bottom:14px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;}
        .form-input{width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:12px 14px;font-size:14px;font-family:'Inter',sans-serif;color:#0f172a;outline:none;transition:border 0.15s;}
        .form-input:focus{border-color:#1a56db;box-shadow:0 0 0 3px rgba(26,86,219,0.1);}
        .form-hint{font-size:12px;color:#94a3b8;margin-top:4px;}
        .btn-submit{width:100%;background:#1a56db;color:white;border:none;padding:14px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.15s;margin-top:8px;}
        .btn-submit:hover{background:#1e429f;}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .success-box{background:#dcfce7;border:1px solid #bbf7d0;border-radius:12px;padding:24px;text-align:center;}
        .success-icon{width:56px;height:56px;background:#166534;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
        .success-title{font-size:18px;font-weight:700;color:#166534;margin-bottom:6px;}
        .success-desc{font-size:14px;color:#166534;line-height:1.6;}
        .back-link{display:flex;align-items:center;justify-content:center;gap:6px;color:#94a3b8;text-decoration:none;font-size:13px;margin-top:16px;}
        .back-link:hover{color:#475569;}
        .bank-details{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:20px;}
        .bank-row{display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;color:#475569;}
        .bank-row:last-child{margin-bottom:0;}
        .bank-row span:last-child{font-weight:600;color:#0f172a;}
      `}</style>

      <div className="page">
        <Link href="/" className="logo">
          <div className="logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          DormLink
        </Link>

        {/* Booking Summary */}
        {booking && (
          <div className="card">
            <div className="card-title">Payment for Your Room</div>
            <div className="card-sub">Complete your 50% deposit to secure your room</div>
            <div className="summary">
              <div className="summary-row">
                <span>Property</span>
                <span style={{fontWeight:600}}>{booking.hostels?.name}</span>
              </div>
              <div className="summary-row">
                <span>Room Type</span>
                <span>{booking.rooms?.room_type}</span>
              </div>
              <div className="summary-row">
                <span>Semester</span>
                <span>{booking.semester}</span>
              </div>
              <div className="summary-row">
                <span>Full Semester Fee</span>
                <span>TZS {parseFloat(booking.total_amount || 0).toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span style={{color:'#1a56db',fontWeight:700}}>50% Deposit Due Now</span>
                <span style={{color:'#1a56db',fontWeight:700}}>TZS {parseFloat(booking.deposit_amount || 0).toLocaleString()}</span>
              </div>
            </div>

            {submitted ? (
              <div className="success-box">
                <div className="success-icon">
                  <span className="material-icons" style={{color:'white',fontSize:'28px'}}>check</span>
                </div>
                <div className="success-title">Payment Proof Submitted!</div>
                <div className="success-desc">
                  The host will verify your transaction ID within 24 hours and confirm your room. You will receive a notification once confirmed.
                </div>
              </div>
            ) : (
              <>
                {/* Step 1 - Select Method */}
                <div className="step">
                  <div className="step-num">1</div>
                  <div className="step-title">Select how you will pay</div>
                </div>
                <div className="methods">
                  {PAYMENT_METHODS.map(m => (
                    <div
                      key={m.id}
                      className={`method ${selectedMethod === m.id ? 'selected' : ''}`}
                      onClick={() => setSelectedMethod(m.id)}
                    >
                      <div className="method-dot" style={{background: m.color}}/>
                      <div className="method-label">{m.label}</div>
                      <div className="method-radio">
                        {selectedMethod === m.id && <div className="radio-dot"/>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step 2 - Show number to send to */}
                {selectedMethod && instructions && (
                  <>
                    <div className="step">
                      <div className="step-num">2</div>
                      <div className="step-title">
                        {selectedMethod === 'bank' ? 'Transfer to this account' : 'Send money to this number'}
                      </div>
                    </div>

                    {selectedMethod === 'bank' ? (
                      <div className="bank-details">
                        <div className="bank-row"><span>Bank Name</span><span>{instructions.bank_name}</span></div>
                        <div className="bank-row"><span>Account Name</span><span>{instructions.bank_account_name}</span></div>
                        <div className="bank-row"><span>Account Number</span><span>{instructions.bank_account}</span></div>
                        <div className="bank-row"><span>Amount</span><span style={{color:'#1a56db'}}>TZS {parseFloat(booking.deposit_amount || 0).toLocaleString()}</span></div>
                      </div>
                    ) : (
                      <div className="payment-number-box">
                        <div>
                          <div className="payment-number-label">{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.label} Number</div>
                          <div className="payment-number">{getPaymentNumber()}</div>
                        </div>
                        <button
                          className="copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(getPaymentNumber());
                            toast.success('Number copied!');
                          }}
                        >
                          <span className="material-icons" style={{fontSize:'14px'}}>content_copy</span>
                          Copy
                        </button>
                      </div>
                    )}

                    {/* Step 3 - Enter transaction ID */}
                    <div className="step">
                      <div className="step-num">3</div>
                      <div className="step-title">Enter your transaction details</div>
                    </div>

                    {selectedMethod !== 'bank' && (
                      <div className="form-group">
                        <label className="form-label">Your Phone Number Used</label>
                        <input
                          className="form-input"
                          placeholder="e.g. 0712345678"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}
                          type="tel"
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label">Transaction ID / Reference Number</label>
                      <input
                        className="form-input"
                        placeholder={selectedMethod === 'bank' ? 'e.g. TRF20240001234' : 'e.g. SIM82736450'}
                        value={transactionId}
                        onChange={e => setTransactionId(e.target.value)}
                      />
                      <div className="form-hint">
                        {selectedMethod === 'bank'
                          ? 'Enter the reference number from your bank transfer receipt'
                          : 'Open your mobile money app → Transaction history → Copy the transaction ID'}
                      </div>
                    </div>

                    <button
                      className="btn-submit"
                      onClick={handleSubmit}
                      disabled={submitting || !transactionId.trim()}
                    >
                      <span className="material-icons">send</span>
                      {submitting ? 'Submitting...' : 'Submit Payment Proof'}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}

        <Link href="/student/dashboard" className="back-link">
          <span className="material-icons" style={{fontSize:'16px'}}>arrow_back</span>
          Back to Dashboard
        </Link>
      </div>
    </>
  );
}