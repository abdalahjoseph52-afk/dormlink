'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function StudentDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cancelModal, setCancelModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [paymentModal, setPaymentModal] = useState(null); // booking object
  const [payMethod, setPayMethod] = useState('');
  const [payTransId, setPayTransId] = useState('');
  const [payPhone, setPayPhone] = useState('');
  const [payLoading, setPayLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'student') { router.push('/login'); return; }
    fetchData();
  }, [user, loading]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const res = await api.get('/student/bookings');
      setBookings(res.data.bookings || []);
    } catch (e) {
      console.error(e);
    } finally {
      setDataLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    setActionLoading(true);
    try {
      await api.patch(`/student/bookings/${bookingId}/cancel`);
      toast.success('Booking cancelled');
      setCancelModal(null);
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to cancel booking');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!payMethod) { toast.error('Select a payment method'); return; }
    if (!payTransId.trim()) { toast.error('Enter your transaction / reference ID'); return; }
    setPayLoading(true);
    try {
      await api.post('/payments/submit-proof', {
        booking_id: paymentModal.id,
        payment_method: payMethod,
        transaction_id: payTransId.trim(),
        phone_number: payPhone,
      });
      toast.success('Payment proof submitted! Host will verify within 24 hours.');
      setPaymentModal(null);
      setPayMethod(''); setPayTransId(''); setPayPhone('');
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Submission failed. Try again.');
    } finally {
      setPayLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) { toast.error('Enter your password'); return; }
    setActionLoading(true);
    try {
      await api.delete('/student/account', { data: { password: deletePassword } });
      toast.success('Account deleted');
      logout();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to delete account');
    } finally {
      setActionLoading(false);
    }
  };

  const statusBadge = (status) => {
    const map = {
      pending:   { bg: '#F4F7FC', color: '#10367D', label: 'Pending' },
      confirmed: { bg: '#f0f9ff', color: '#0369a1', label: 'Confirmed' },
      cancelled: { bg: '#f1f5f9', color: '#64748b', label: 'Cancelled' },
      completed: { bg: '#f0fdf4', color: '#15803d', label: 'Completed' },
    };
    const s = map[status] || { bg: '#f1f5f9', color: '#64748b', label: status };
    return (
      <span style={{background:s.bg,color:s.color,padding:'3px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>
        {s.label}
      </span>
    );
  };

  const paymentBadge = (status) => {
    const map = {
      unpaid:               { bg: '#f1f5f9', color: '#64748b', label: 'Unpaid' },
      pending_confirmation: { bg: '#F4F7FC', color: '#10367D', label: 'Verifying' },
      paid:                 { bg: '#f0f9ff', color: '#0369a1', label: 'Paid' },
    };
    const s = map[status] || { bg: '#f1f5f9', color: '#64748b', label: status || 'Unpaid' };
    return (
      <span style={{background:s.bg,color:s.color,padding:'3px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>
        {s.label}
      </span>
    );
  };

  const navItems = [
    { id: 'bookings', label: 'My Bookings', icon: 'book_online' },
    { id: 'browse', label: 'Browse Hostels', icon: 'search', href: '/' },
    { id: 'account', label: 'Account', icon: 'person' },
  ];

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{width:'32px',height:'32px',border:'3px solid #B8CAEB',borderTop:'3px solid #10367D',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Outfit',sans-serif;background:#f8fafc;color:#060E1C;}
        @keyframes spin{to{transform:rotate(360deg);}}

        /* Layout */
        .layout{display:flex;min-height:100vh;}
        .sidebar{width:260px;background:white;border-right:1px solid #e2e8f0;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.3s;}
        .sidebar.closed{transform:translateX(-100%);}
        @media(min-width:768px){.sidebar{transform:none!important;}}
        .main{flex:1;margin-left:260px;min-height:100vh;display:flex;flex-direction:column;}
        @media(max-width:767px){.main{margin-left:0;}}

        /* Sidebar */
        .sb-brand{padding:24px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;}
        .sb-brand-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;}
        .sb-brand-name{font-size:18px;font-family:'Outfit',sans-serif;color:#060E1C;letter-spacing:-0.3px;}
        .sb-user{padding:16px 20px;border-bottom:1px solid #f1f5f9;}
        .sb-user-name{font-size:14px;font-weight:600;color:#060E1C;}
        .sb-user-role{font-size:12px;color:#64748b;margin-top:2px;text-transform:capitalize;}
        .sb-nav{padding:12px 12px;flex:1;}
        .sb-nav-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;color:#64748b;text-decoration:none;transition:all 0.15s;margin-bottom:2px;border:none;background:none;width:100%;text-align:left;}
        .sb-nav-item:hover{background:#f1f5f9;color:#060E1C;}
        .sb-nav-item.active{background:#F4F7FC;color:#10367D;}
        .sb-nav-item.active .nav-icon{color:#10367D;}
        .nav-icon{font-size:18px;color:#94a3b8;}
        .sb-footer{padding:16px 20px;border-top:1px solid #f1f5f9;}
        .sb-logout{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;color:#64748b;background:none;border:none;width:100%;text-align:left;transition:background 0.15s;}
        .sb-logout:hover{background:#f1f5f9;color:#060E1C;}

        /* Topbar */
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
        .menu-btn{display:none;background:none;border:none;cursor:pointer;color:#64748b;padding:4px;}
        @media(max-width:767px){.menu-btn{display:flex;align-items:center;}}
        .topbar-title{font-size:16px;font-weight:700;color:#060E1C;}
        .topbar-right{display:flex;align-items:center;gap:8px;}

        /* Page content */
        .page-content{padding:24px;flex:1;}
        @media(max-width:767px){.page-content{padding:16px;}}

        /* Stats */
        .stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-bottom:28px;}
        .stat-card{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:20px;display:flex;align-items:center;gap:14px;}
        .stat-icon{width:44px;height:44px;background:#F4F7FC;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .stat-label{font-size:12px;color:#64748b;font-weight:500;}
        .stat-value{font-size:24px;font-weight:700;color:#060E1C;margin-top:2px;}

        /* Section */
        .section-title{font-size:16px;font-weight:700;color:#060E1C;margin-bottom:16px;}

        /* Booking cards */
        .booking-card{background:white;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:16px;}
        .booking-card-header{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;}
        .booking-hostel{font-size:15px;font-weight:700;color:#060E1C;}
        .booking-room{font-size:13px;color:#64748b;margin-top:3px;}
        .booking-badges{display:flex;gap:6px;flex-wrap:wrap;}
        .booking-card-body{padding:16px 20px;}
        .booking-detail-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:14px;}
        .detail-item label{display:block;font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px;}
        .detail-item span{font-size:14px;font-weight:600;color:#060E1C;}
        .booking-actions{display:flex;gap:8px;flex-wrap:wrap;padding-top:12px;border-top:1px solid #f1f5f9;}

        /* Buttons - white/blue/gray only */
        .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;border:none;transition:all 0.15s;text-decoration:none;}
        .btn-primary{background:#10367D;color:white;}
        .btn-primary:hover{background:#0B2960;}
        .btn-outline{background:white;color:#374151;border:1.5px solid #e2e8f0;}
        .btn-outline:hover{background:#f8fafc;border-color:#cbd5e1;}
        .btn-danger-outline{background:white;color:#64748b;border:1.5px solid #e2e8f0;}
        .btn-danger-outline:hover{background:#f1f5f9;color:#374151;}
        .btn:disabled{opacity:0.6;cursor:not-allowed;}

        /* Empty state */
        .empty{text-align:center;padding:60px 20px;color:#94a3b8;}
        .empty-icon{font-size:48px;margin-bottom:12px;}
        .empty-title{font-size:16px;font-weight:600;color:#64748b;margin-bottom:6px;}
        .empty-sub{font-size:13px;}

        /* Account section */
        .account-card{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:16px;}
        .account-card h3{font-size:14px;font-weight:700;color:#060E1C;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f5f9;}
        .account-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;font-size:14px;}
        .account-row .label{color:#64748b;font-weight:500;}
        .account-row .value{color:#060E1C;font-weight:600;}

        /* Modal */
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:200;padding:16px;}
        .modal{background:white;border-radius:16px;padding:28px;width:100%;max-width:420px;}
        .modal h3{font-size:18px;font-weight:700;color:#060E1C;margin-bottom:8px;}
        .modal p{font-size:14px;color:#64748b;line-height:1.6;margin-bottom:20px;}
        .modal-actions{display:flex;gap:10px;justify-content:flex-end;}
        .modal-input{width:100%;padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;outline:none;margin-bottom:16px;}
        .modal-input:focus{border-color:#10367D;}

        /* Overlay backdrop for mobile sidebar */
        .sb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;}
        @media(max-width:767px){.sb-overlay.visible{display:block;}}
      `}</style>

      {/* Sidebar overlay for mobile */}
      <div className={`sb-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)}/>

      <div className="layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
          <div className="sb-brand">
            <div className="sb-brand-icon"><svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#10367D" stroke="white" strokeWidth="7"/><path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"/><rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/><circle cx="70" cy="22" r="5.5" fill="#B5CE00"/><circle cx="73" cy="68" r="7.5" stroke="white" strokeWidth="4" fill="none"/><line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="white" strokeWidth="4" strokeLinecap="round"/></svg></div>
            <span className="sb-brand-name"><span style={{fontWeight:300}}>Saka</span><span style={{fontWeight:700}}>Boma</span></span>
          </div>
          <div className="sb-user">
            <div className="sb-user-name">{user?.first_name} {user?.last_name}</div>
            <div className="sb-user-role">Student Account</div>
          </div>
          <nav className="sb-nav">
            {navItems.map(item => (
              item.href ? (
                <Link key={item.id} href={item.href} className="sb-nav-item">
                  <span className="material-icons-round nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  className={`sb-nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                >
                  <span className="material-icons-round nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              )
            ))}
          </nav>
          <div className="sb-footer">
            <button className="sb-logout" onClick={logout}>
              <span className="material-icons-round" style={{fontSize:'18px',color:'#94a3b8'}}>logout</span>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <div className="topbar">
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span className="material-icons-round" style={{fontSize:'22px'}}>menu</span>
              </button>
              <span className="topbar-title">
                {activeTab === 'bookings' ? 'My Bookings' : activeTab === 'account' ? 'My Account' : 'Dashboard'}
              </span>
            </div>
            <div className="topbar-right">
              <Link href="/" className="btn btn-outline" style={{padding:'7px 14px',fontSize:'12px'}}>
                <span className="material-icons-round" style={{fontSize:'14px'}}>search</span>
                Browse Hostels
              </Link>
            </div>
          </div>

          <div className="page-content">

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <>
                {/* Stats */}
                <div className="stats-row">
                  {[
                    {label:'Total Bookings', value: bookings.length, icon:'book_online'},
                    {label:'Active', value: bookings.filter(b=>b.status==='confirmed').length, icon:'check_circle'},
                    {label:'Pending', value: bookings.filter(b=>b.status==='pending').length, icon:'hourglass_empty'},
                    {label:'Cancelled', value: bookings.filter(b=>b.status==='cancelled').length, icon:'cancel'},
                  ].map(s => (
                    <div key={s.label} className="stat-card">
                      <div className="stat-icon">
                        <span className="material-icons-round" style={{fontSize:'20px',color:'#10367D'}}>{s.icon}</span>
                      </div>
                      <div>
                        <div className="stat-label">{s.label}</div>
                        <div className="stat-value">{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section-title">Your Bookings</div>

                {dataLoading ? (
                  <div style={{textAlign:'center',padding:'60px',color:'#94a3b8'}}>
                    <div style={{width:'28px',height:'28px',border:'3px solid #B8CAEB',borderTop:'3px solid #10367D',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto'}}/>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon"><span className="material-icons-round" style={{fontSize:'40px',color:'#B8CAEB'}}>apartment</span></div>
                    <div className="empty-title">No bookings yet</div>
                    <div className="empty-sub">Browse available hostels and make your first booking</div>
                    <Link href="/" className="btn btn-primary" style={{marginTop:'16px',display:'inline-flex'}}>
                      Browse Hostels
                    </Link>
                  </div>
                ) : (
                  bookings.map(b => (
                    <div key={b.id} className="booking-card">
                      <div className="booking-card-header">
                        <div>
                          <div className="booking-hostel">
                            {b.hostels?.name || 'Hostel'}
                          </div>
                          <div className="booking-room">
                            {b.rooms?.room_type}{b.rooms?.room_label ? ` — ${b.rooms.room_label}` : ''} · {b.hostels?.city || ''}
                          </div>
                        </div>
                        <div className="booking-badges">
                          {statusBadge(b.status)}
                          {paymentBadge(b.payment_status)}
                        </div>
                      </div>
                      <div className="booking-card-body">
                        <div className="booking-detail-grid">
                          <div className="detail-item">
                            <label>Semester</label>
                            <span>{b.semester || '—'}</span>
                          </div>
                          <div className="detail-item">
                            <label>Amount</label>
                            <span>TZS {Number(b.total_amount || 0).toLocaleString()}</span>
                          </div>
                          <div className="detail-item">
                            <label>Booked On</label>
                            <span>{new Date(b.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
                          </div>
                          <div className="detail-item">
                            <label>Floor / Label</label>
                            <span>{b.rooms?.floor || '—'}</span>
                          </div>
                        </div>
                        <div className="booking-actions">
                          {/* Pay button - only show when confirmed and unpaid */}
                          {b.status === 'confirmed' && (!b.payment_status || b.payment_status === 'unpaid') && (
                            <button
                              className="btn btn-primary"
                              onClick={() => { setPaymentModal(b); setPayMethod(''); setPayTransId(''); setPayPhone(''); }}
                            >
                              <span className="material-icons-round" style={{fontSize:'14px'}}>payments</span>
                              Submit Payment
                            </button>
                          )}
                          {/* Cancel button */}
                          {b.status === 'pending' && (
                            <button
                              className="btn btn-danger-outline"
                              onClick={() => setCancelModal(b)}
                            >
                              <span className="material-icons-round" style={{fontSize:'14px'}}>close</span>
                              Cancel Booking
                            </button>
                          )}
                          {/* View hostel */}
                          {b.hostel_id && (
                            <Link href={`/hostels/${b.hostel_id}`} className="btn btn-outline">
                              <span className="material-icons-round" style={{fontSize:'14px'}}>open_in_new</span>
                              View Hostel
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* ACCOUNT TAB */}
            {activeTab === 'account' && (
              <>
                <div className="section-title">Account Details</div>
                <div className="account-card">
                  <h3>Personal Information</h3>
                  {[
                    {label:'Full Name', value: `${user?.first_name} ${user?.last_name}`},
                    {label:'Email', value: user?.email},
                    {label:'Phone', value: user?.phone || 'Not set'},
                    {label:'Role', value: 'Student'},
                    {label:'Account Status', value: 'Active'},
                  ].map(row => (
                    <div key={row.label} className="account-row">
                      <span className="label">{row.label}</span>
                      <span className="value">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="account-card">
                  <h3>Danger Zone</h3>
                  <p style={{fontSize:'13px',color:'#64748b',marginBottom:'14px',lineHeight:'1.6'}}>
                    Permanently delete your account. Active confirmed bookings will not be cancelled automatically — contact the host first.
                  </p>
                  <button className="btn btn-danger-outline" onClick={() => setDeleteModal(true)}>
                    <span className="material-icons-round" style={{fontSize:'14px'}}>delete_forever</span>
                    Delete My Account
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Payment Modal */}
      {paymentModal && (
        <div className="modal-overlay" onClick={() => setPaymentModal(null)}>
          <div className="modal" style={{maxWidth:'480px'}} onClick={e => e.stopPropagation()}>
            <h3 style={{marginBottom:'4px'}}>Submit Payment Proof</h3>
            <p style={{marginBottom:'20px'}}>
              For booking at <strong>{paymentModal.hostels?.name}</strong> — TZS {Number(paymentModal.total_amount||0).toLocaleString()}
            </p>

            {/* Step 1 — Choose method */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'12px',fontWeight:'700',color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px'}}>
                Step 1 — Select Payment Method
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {[
                  { id:'mpesa', label:'M-Pesa', hint:'Send to: 0700 000 000 (SakaBoma)' },
                  { id:'tigopesa', label:'Tigo Pesa', hint:'Send to: 0655 000 000 (SakaBoma)' },
                  { id:'airtel', label:'Airtel Money', hint:'Send to: 0688 000 000 (SakaBoma)' },
                  { id:'bank', label:'Bank Transfer', hint:'CRDB Bank: 015 2345 6789 — SakaBoma Ltd' },
                ].map(m => (
                  <div
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    style={{
                      padding:'12px 14px', border:`2px solid ${payMethod===m.id?'#10367D':'#e2e8f0'}`,
                      borderRadius:'10px', cursor:'pointer', background:payMethod===m.id?'#F4F7FC':'white',
                      transition:'all 0.15s'
                    }}
                  >
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{fontWeight:'600',fontSize:'14px',color:payMethod===m.id?'#0B2960':'#060E1C'}}>{m.label}</div>
                      {payMethod===m.id && <span className="material-icons-round" style={{fontSize:'18px',color:'#10367D'}}>check_circle</span>}
                    </div>
                    <div style={{fontSize:'12px',color:'#64748b',marginTop:'2px'}}>{m.hint}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2 — Transaction ID */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'12px',fontWeight:'700',color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px'}}>
                Step 2 — Enter Transaction / Reference ID
              </div>
              <input
                className="modal-input"
                placeholder="e.g. MP2563EB1234, TZ8844112..."
                value={payTransId}
                onChange={e => setPayTransId(e.target.value)}
                style={{width:'100%',padding:'10px 13px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',fontFamily:'inherit',outline:'none',marginBottom:'0'}}
              />
              <p style={{fontSize:'11px',color:'#94a3b8',marginTop:'5px'}}>
                Check your SMS or mobile money app for the confirmation code
              </p>
            </div>

            {/* Step 3 — Phone (optional) */}
            <div style={{marginBottom:'20px'}}>
              <div style={{fontSize:'12px',fontWeight:'700',color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px'}}>
                Step 3 — Your Phone Number (optional)
              </div>
              <input
                className="modal-input"
                placeholder="e.g. 0712 345 678"
                value={payPhone}
                onChange={e => setPayPhone(e.target.value)}
                style={{width:'100%',padding:'10px 13px',border:'1.5px solid #e2e8f0',borderRadius:'8px',fontSize:'14px',fontFamily:'inherit',outline:'none'}}
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setPaymentModal(null)} disabled={payLoading}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handlePaymentSubmit} disabled={payLoading}>
                {payLoading ? 'Submitting...' : 'Submit Payment Proof'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {cancelModal && (
        <div className="modal-overlay" onClick={() => setCancelModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Cancel Booking</h3>
            <p>Are you sure you want to cancel your booking at <strong>{cancelModal.hostels?.name}</strong>? This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setCancelModal(null)} disabled={actionLoading}>
                Keep Booking
              </button>
              <button className="btn btn-primary" onClick={() => handleCancel(cancelModal.id)} disabled={actionLoading}>
                {actionLoading ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => { setDeleteModal(false); setDeletePassword(''); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Account</h3>
            <p>Enter your password to permanently delete your account. This action cannot be undone.</p>
            <input
              type="password"
              className="modal-input"
              placeholder="Enter your password"
              value={deletePassword}
              onChange={e => setDeletePassword(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => { setDeleteModal(false); setDeletePassword(''); }} disabled={actionLoading}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleDeleteAccount} disabled={actionLoading}>
                {actionLoading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
