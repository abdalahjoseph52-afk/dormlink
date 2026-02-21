'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const PAYMENT_METHODS = [
  { id: 'mpesa',   label: 'M-Pesa',      network: 'Vodacom',  icon: 'phone_iphone', color: '#16a34a', bg: '#dcfce7', number_key: 'mpesa_number' },
  { id: 'tigo',    label: 'Tigo Pesa',   network: 'Tigo',     icon: 'phone_iphone', color: '#ca8a04', bg: '#fef9c3', number_key: 'tigo_number' },
  { id: 'airtel',  label: 'Airtel Money',network: 'Airtel',   icon: 'phone_iphone', color: '#dc2626', bg: '#fee2e2', number_key: 'airtel_number' },
  { id: 'bank',    label: 'Bank Transfer',network: 'CRDB Bank',icon: 'account_balance', color: '#2563eb', bg: '#eff6ff', number_key: 'bank_account' },
];

export default function PaymentPage({ params }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState('');
  const [step, setStep] = useState(1); // 1=method, 2=confirm, 3=submit

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [bRes, sRes] = await Promise.all([
        api.get(`/payments/booking/${id}`),
        api.get('/payments/instructions'),
      ]);
      setBooking(bRes.data.booking);
      setSettings(sRes.data.settings);
    } catch (e) {
      console.error(e);
      toast.error('Could not load booking details');
    } finally { setLoading(false); }
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopied(''), 2000);
    } catch { toast.error('Could not copy'); }
  };

  const getPaymentNumber = (method) => {
    if (!settings || !method) return '—';
    if (method.id === 'bank') return settings.bank_account || '—';
    return settings[method.number_key] || '—';
  };

  const handleSubmit = async () => {
    if (!selectedMethod) { toast.error('Please select a payment method'); return; }
    if (!transactionId.trim()) { toast.error('Please enter the transaction ID from your receipt'); return; }
    if (transactionId.trim().length < 4) { toast.error('Transaction ID seems too short'); return; }
    setSubmitting(true);
    try {
      await api.post(`/payments/submit/${id}`, {
        payment_method: selectedMethod.id,
        transaction_id: transactionId.trim(),
      });
      setSubmitted(true);
      toast.success('Payment submitted! Host will verify and confirm.');
    } catch (e) {
      toast.error(e.response?.data?.error || 'Submission failed. Try again.');
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',flexDirection:'column',gap:'16px',fontFamily:'DM Sans,sans-serif'}}>
        <div style={{width:'40px',height:'40px',border:'3px solid #bfdbfe',borderTop:'3px solid #2563eb',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
        <div style={{color:'#64748b'}}>Loading payment details...</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    </>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#f8fafc;min-height:100vh;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}

        /* NAV */
        .nav{background:white;border-bottom:1px solid #e2e8f0;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:100;box-shadow:0 1px 6px rgba(0,0,0,0.04);}
        .nav-logo{font-family:'Sora',sans-serif;font-size:20px;font-weight:800;color:#2563eb;text-decoration:none;display:flex;align-items:center;gap:8px;}
        .logo-icon{width:30px;height:30px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:8px;display:flex;align-items:center;justify-content:center;}
        .nav-back{display:inline-flex;align-items:center;gap:6px;color:#64748b;font-size:14px;font-weight:500;text-decoration:none;padding:8px 14px;border:1.5px solid #e2e8f0;border-radius:50px;transition:all 0.2s;}
        .nav-back:hover{border-color:#2563eb;color:#2563eb;background:#eff6ff;}

        /* PROGRESS */
        .progress-bar{background:white;border-bottom:1px solid #e2e8f0;padding:16px 24px;}
        .progress-inner{max-width:680px;margin:0 auto;display:flex;align-items:center;gap:0;}
        .progress-step{display:flex;align-items:center;gap:8px;flex:1;}
        .step-circle{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;transition:all 0.3s;}
        .step-label{font-size:12px;font-weight:600;transition:color 0.3s;}
        .step-line{flex:1;height:2px;background:#e2e8f0;margin:0 8px;transition:background 0.3s;}
        .step-line.done{background:#2563eb;}
        .step-circle.done{background:#2563eb;color:white;}
        .step-circle.active{background:#2563eb;color:white;box-shadow:0 0 0 4px rgba(37,99,235,0.2);}
        .step-circle.pending{background:#f1f5f9;color:#94a3b8;}
        .step-label.active,.step-label.done{color:#2563eb;}
        .step-label.pending{color:#94a3b8;}

        /* LAYOUT */
        .layout{max-width:1000px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:1fr 320px;gap:28px;animation:fadeUp 0.4s ease;}

        /* BOOKING SUMMARY */
        .summary-card{background:linear-gradient(135deg,#1e3a8a,#2563eb);border-radius:20px;padding:24px;color:white;position:sticky;top:80px;align-self:start;}
        .summary-title{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;margin-bottom:20px;opacity:0.9;}
        .summary-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:14px;}
        .summary-label{opacity:0.7;}
        .summary-value{font-weight:600;}
        .summary-divider{border:none;border-top:1px solid rgba(255,255,255,0.15);margin:16px 0;}
        .summary-total{font-family:'Sora',sans-serif;font-size:22px;font-weight:800;text-align:center;margin-top:4px;}
        .summary-total-label{font-size:12px;opacity:0.65;text-align:center;margin-top:4px;}
        .summary-badge{background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border-radius:12px;padding:12px;text-align:center;margin-top:16px;font-size:12px;opacity:0.8;line-height:1.6;}

        /* MAIN CARD */
        .main-card{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:28px;}
        .card-title{font-family:'Sora',sans-serif;font-size:20px;font-weight:800;color:#0f172a;margin-bottom:4px;}
        .card-sub{font-size:14px;color:#64748b;margin-bottom:24px;}
        .section-label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px;}

        /* PAYMENT METHOD CARDS */
        .methods-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;}
        .method-card{border:2px solid #e2e8f0;border-radius:14px;padding:16px;cursor:pointer;transition:all 0.2s;background:#f9fafb;position:relative;overflow:hidden;}
        .method-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity 0.2s;}
        .method-card:hover{border-color:#93c5fd;transform:translateY(-2px);box-shadow:0 6px 20px rgba(37,99,235,0.1);}
        .method-card.active{border-color:#2563eb;background:#eff6ff;box-shadow:0 0 0 3px rgba(37,99,235,0.12);}
        .method-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:10px;transition:all 0.2s;}
        .method-label{font-size:14px;font-weight:700;color:#0f172a;margin-bottom:2px;}
        .method-network{font-size:12px;color:#64748b;}
        .method-check{position:absolute;top:10px;right:10px;width:20px;height:20px;border-radius:50%;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
        .method-card.active .method-check{background:#2563eb;border-color:#2563eb;}

        /* PAYMENT INSTRUCTIONS */
        .instructions-box{background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:20px;animation:fadeUp 0.3s ease;}
        .inst-step{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;}
        .inst-step:last-child{margin-bottom:0;}
        .inst-num{width:26px;height:26px;background:#2563eb;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:1px;}
        .inst-text{font-size:14px;color:#475569;line-height:1.6;}
        .inst-text strong{color:#0f172a;}
        .copy-row{display:flex;align-items:center;gap:10px;background:white;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-top:8px;transition:all 0.2s;}
        .copy-row:hover{border-color:#93c5fd;}
        .copy-number{font-family:monospace;font-size:15px;font-weight:700;color:#0f172a;flex:1;letter-spacing:0.5px;}
        .copy-btn{background:#eff6ff;border:none;color:#2563eb;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;align-items:center;gap:5px;white-space:nowrap;}
        .copy-btn:hover{background:#dbeafe;}
        .copy-btn.done{background:#dcfce7;color:#166534;}
        .amount-highlight{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1.5px solid #bfdbfe;border-radius:10px;padding:12px 16px;margin-top:8px;text-align:center;}
        .amount-big{font-family:'Sora',sans-serif;font-size:22px;font-weight:800;color:#1e3a8a;}
        .amount-label{font-size:12px;color:#64748b;margin-top:2px;}

        /* TRANSACTION ID */
        .txid-input-wrap{position:relative;margin-bottom:6px;}
        .txid-input{width:100%;border:2px solid #e2e8f0;border-radius:12px;padding:14px 48px 14px 16px;font-size:15px;font-family:'DM Sans',sans-serif;color:#0f172a;outline:none;transition:all 0.2s;background:#f9fafb;letter-spacing:0.5px;}
        .txid-input:focus{border-color:#2563eb;background:white;box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
        .txid-icon{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:#9ca3af;}
        .txid-hint{font-size:12px;color:#94a3b8;margin-bottom:20px;}

        /* SUBMIT BUTTON */
        .btn-submit{width:100%;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:16px;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-submit:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(37,99,235,0.3);}
        .btn-submit:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none;}
        .btn-back{width:100%;background:white;color:#64748b;border:1.5px solid #e2e8f0;padding:13px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;margin-top:10px;}
        .btn-back:hover{border-color:#94a3b8;color:#0f172a;}

        /* SUCCESS */
        .success-box{text-align:center;padding:40px 24px;animation:fadeUp 0.5s ease;}
        .success-icon{width:72px;height:72px;background:linear-gradient(135deg,#16a34a,#15803d);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 24px rgba(22,163,74,0.3);}
        .success-title{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;color:#0f172a;margin-bottom:8px;}
        .success-desc{font-size:15px;color:#64748b;line-height:1.7;max-width:400px;margin:0 auto 24px;}
        .success-steps{background:#f8fafc;border-radius:16px;padding:20px;text-align:left;margin-bottom:24px;}
        .success-step{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#475569;}
        .success-step:last-child{border-bottom:none;}
        .step-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
        .btn-dashboard{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;transition:all 0.2s;}
        .btn-dashboard:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,99,235,0.3);}

        @media(max-width:768px){
          .layout{grid-template-columns:1fr;padding:20px 16px;gap:20px;}
          .summary-card{position:static;order:-1;}
          .methods-grid{grid-template-columns:1fr 1fr;}
          .progress-bar{padding:12px 16px;}
          .step-label{display:none;}
          .main-card{padding:20px 16px;}
        }
        @media(max-width:480px){
          .methods-grid{grid-template-columns:1fr 1fr;}
          .method-card{padding:12px;}
          .method-label{font-size:13px;}
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo">
          <div className="logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          DormLink
        </Link>
        <Link href="/student/dashboard" className="nav-back">
          <span className="material-icons-round" style={{fontSize:'16px'}}>arrow_back</span>
          My Bookings
        </Link>
      </nav>

      {/* PROGRESS BAR */}
      {!submitted && (
        <div className="progress-bar">
          <div className="progress-inner">
            {[{n:1,label:'Choose Method'},{n:2,label:'Send Payment'},{n:3,label:'Submit Proof'}].map((s,i) => (
              <>
                <div key={s.n} className="progress-step">
                  <div className={`step-circle ${step>s.n?'done':step===s.n?'active':'pending'}`}>
                    {step > s.n ? <span className="material-icons-round" style={{fontSize:'14px'}}>check</span> : s.n}
                  </div>
                  <span className={`step-label ${step>s.n?'done':step===s.n?'active':'pending'}`}>{s.label}</span>
                </div>
                {i < 2 && <div className={`step-line ${step>s.n?'done':''}`}/>}
              </>
            ))}
          </div>
        </div>
      )}

      <div className="layout">
        {/* LEFT — MAIN CONTENT */}
        <div>
          {submitted ? (
            <div className="main-card">
              <div className="success-box">
                <div className="success-icon">
                  <span className="material-icons-round" style={{color:'white',fontSize:'36px'}}>check</span>
                </div>
                <div className="success-title">Payment Submitted!</div>
                <div className="success-desc">
                  Your payment proof has been sent to the host for verification. You will be notified once it's confirmed.
                </div>
                <div className="success-steps">
                  {[
                    {dot:'#16a34a', text:'Payment proof submitted ✓'},
                    {dot:'#2563eb', text:'Host is verifying your transaction ID'},
                    {dot:'#94a3b8', text:'You will receive confirmation notification'},
                    {dot:'#94a3b8', text:'Move in after full confirmation'},
                  ].map((s,i) => (
                    <div key={i} className="success-step">
                      <div className="step-dot" style={{background:s.dot}}/>
                      {s.text}
                    </div>
                  ))}
                </div>
                <Link href="/student/dashboard" className="btn-dashboard">
                  <span className="material-icons-round" style={{fontSize:'18px'}}>dashboard</span>
                  Go to My Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="main-card">
              {step === 1 && (
                <>
                  <div className="card-title">Choose Payment Method</div>
                  <div className="card-sub">Select how you will send the deposit payment</div>
                  <div className="section-label">Available methods</div>
                  <div className="methods-grid">
                    {PAYMENT_METHODS.map(m => (
                      <div key={m.id} className={`method-card ${selectedMethod?.id===m.id?'active':''}`}
                        onClick={() => setSelectedMethod(m)}>
                        <div className="method-check">
                          {selectedMethod?.id===m.id && (
                            <span className="material-icons-round" style={{fontSize:'13px',color:'white'}}>check</span>
                          )}
                        </div>
                        <div className="method-icon" style={{background:m.bg}}>
                          <span className="material-icons-round" style={{color:m.color,fontSize:'22px'}}>{m.icon}</span>
                        </div>
                        <div className="method-label">{m.label}</div>
                        <div className="method-network">{m.network}</div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-submit" disabled={!selectedMethod} onClick={() => setStep(2)}>
                    Continue with {selectedMethod?.label || '...'}
                    <span className="material-icons-round" style={{fontSize:'18px'}}>arrow_forward</span>
                  </button>
                </>
              )}

              {step === 2 && selectedMethod && (
                <>
                  <div className="card-title">Send Payment</div>
                  <div className="card-sub">Follow these steps carefully</div>

                  <div className="instructions-box">
                    <div className="inst-step">
                      <div className="inst-num">1</div>
                      <div className="inst-text">
                        Open <strong>{selectedMethod.network}</strong> on your phone and go to{' '}
                        <strong>{selectedMethod.id === 'bank' ? 'Bank Transfer' : 'Send Money'}</strong>
                      </div>
                    </div>

                    <div className="inst-step">
                      <div className="inst-num">2</div>
                      <div className="inst-text">
                        {selectedMethod.id === 'bank' ? 'Transfer to this account:' : 'Send to this number:'}
                        <div className="copy-row">
                          <span className="copy-number">{getPaymentNumber(selectedMethod)}</span>
                          <button className={`copy-btn ${copied==='number'?'done':''}`}
                            onClick={() => copyToClipboard(getPaymentNumber(selectedMethod), 'number')}>
                            <span className="material-icons-round" style={{fontSize:'14px'}}>{copied==='number'?'check':'content_copy'}</span>
                            {copied==='number' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        {selectedMethod.id === 'bank' && settings && (
                          <div style={{marginTop:'8px',fontSize:'13px',color:'#64748b'}}>
                            Bank: <strong style={{color:'#0f172a'}}>{settings.bank_name}</strong> · Name: <strong style={{color:'#0f172a'}}>{settings.bank_account_name}</strong>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="inst-step">
                      <div className="inst-num">3</div>
                      <div className="inst-text">
                        Send exactly this amount:
                        <div className="amount-highlight">
                          <div className="amount-big">
                            TZS {parseFloat(booking?.deposit_amount || 0).toLocaleString()}
                          </div>
                          <div className="amount-label">50% deposit — Due now</div>
                        </div>
                      </div>
                    </div>

                    <div className="inst-step">
                      <div className="inst-num">4</div>
                      <div className="inst-text">
                        After sending, <strong>save the SMS confirmation</strong> — you will need the Transaction ID from it in the next step.
                      </div>
                    </div>
                  </div>

                  <button className="btn-submit" onClick={() => setStep(3)}>
                    I've Sent the Payment
                    <span className="material-icons-round" style={{fontSize:'18px'}}>arrow_forward</span>
                  </button>
                  <button className="btn-back" onClick={() => setStep(1)}>← Change Payment Method</button>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="card-title">Submit Your Transaction ID</div>
                  <div className="card-sub">Enter the transaction ID from your M-Pesa / bank SMS confirmation</div>

                  <div style={{background:'#fef9c3',border:'1px solid #fde68a',borderRadius:'12px',padding:'14px 16px',marginBottom:'20px',display:'flex',gap:'10px',alignItems:'flex-start'}}>
                    <span className="material-icons-round" style={{color:'#ca8a04',fontSize:'20px',flexShrink:0,marginTop:'1px'}}>info</span>
                    <div style={{fontSize:'13px',color:'#854d0e',lineHeight:'1.6'}}>
                      The transaction ID is the unique code in your payment confirmation SMS. It usually looks like <strong>QJ2ABC1234</strong> for M-Pesa or similar.
                    </div>
                  </div>

                  <div className="section-label">Transaction ID from SMS</div>
                  <div className="txid-input-wrap">
                    <input className="txid-input" placeholder="e.g. QJ2ABC1234 or TZ12345678"
                      value={transactionId} onChange={e => setTransactionId(e.target.value.toUpperCase())}
                      maxLength={30}/>
                    <span className="material-icons-round txid-icon">receipt_long</span>
                  </div>
                  <div className="txid-hint">
                    Payment method: <strong>{selectedMethod?.label}</strong> · Amount: <strong>TZS {parseFloat(booking?.deposit_amount||0).toLocaleString()}</strong>
                  </div>

                  <button className="btn-submit" onClick={handleSubmit} disabled={submitting || !transactionId.trim()}>
                    {submitting ? (
                      <>
                        <div style={{width:'18px',height:'18px',border:'2px solid rgba(255,255,255,0.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="material-icons-round" style={{fontSize:'18px'}}>send</span>
                        Submit Payment Proof
                      </>
                    )}
                  </button>
                  <button className="btn-back" onClick={() => setStep(2)}>← Back to Instructions</button>
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — BOOKING SUMMARY */}
        {booking && (
          <div className="summary-card">
            <div className="summary-title">📋 Booking Summary</div>
            <div className="summary-row">
              <span className="summary-label">Property</span>
              <span className="summary-value">{booking.hostels?.name}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Room Type</span>
              <span className="summary-value">{booking.rooms?.room_type}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Semester</span>
              <span className="summary-value">{booking.semester}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Location</span>
              <span className="summary-value" style={{textAlign:'right',maxWidth:'160px'}}>{booking.hostels?.city}</span>
            </div>
            <hr className="summary-divider"/>
            <div className="summary-row">
              <span className="summary-label">Total semester fee</span>
              <span className="summary-value">TZS {parseFloat(booking.total_amount||0).toLocaleString()}</span>
            </div>
            <div className="summary-total">TZS {parseFloat(booking.deposit_amount||0).toLocaleString()}</div>
            <div className="summary-total-label">50% Deposit — Pay now</div>
            <div className="summary-badge">
              🔒 Remaining 50% paid on arrival<br/>
              3% platform fee included
            </div>
          </div>
        )}
      </div>
    </>
  );
}
