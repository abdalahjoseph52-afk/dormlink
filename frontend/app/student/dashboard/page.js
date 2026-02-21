'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

const NAV = [
  { href: '/student/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/', icon: 'search', label: 'Find Hostel' },
];

export default function StudentDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'student') { router.push('/login'); return; }
    fetchBookings();
  }, [user, loading]);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/my');
      setBookings(res.data.bookings || []);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const statusStyle = (s) => ({
    pending:              { bg:'#fef9c3', color:'#854d0e', label:'Pending' },
    confirmed:            { bg:'#dcfce7', color:'#166534', label:'Confirmed' },
    cancelled:            { bg:'#fee2e2', color:'#991b1b', label:'Cancelled' },
  }[s] || { bg:'#f1f5f9', color:'#475569', label: s });

  const payStyle = (s) => ({
    unpaid:               { bg:'#fee2e2', color:'#991b1b', label:'Unpaid' },
    pending_confirmation: { bg:'#fef9c3', color:'#854d0e', label:'Verifying' },
    paid:                 { bg:'#dcfce7', color:'#166534', label:'Paid' },
    rejected:             { bg:'#fee2e2', color:'#991b1b', label:'Rejected' },
  }[s] || { bg:'#f1f5f9', color:'#475569', label: s });

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'DM Sans,sans-serif',color:'#64748b'}}>
      <div style={{width:'32px',height:'32px',border:'3px solid #bfdbfe',borderTop:'3px solid #2563eb',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#f8fafc;}
        .layout{display:flex;min-height:100vh;}
        /* SIDEBAR */
        .sidebar{width:256px;background:white;border-right:1px solid #e2e8f0;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.3s;}
        .sidebar-logo{display:flex;align-items:center;gap:10px;padding:24px 20px;border-bottom:1px solid #e2e8f0;text-decoration:none;}
        .logo-icon{width:34px;height:34px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .logo-text{font-family:'Sora',sans-serif;font-size:20px;font-weight:800;color:#2563eb;}
        .sidebar-nav{padding:16px 12px;flex:1;overflow-y:auto;}
        .nav-label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;padding:0 8px;margin:16px 0 8px;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:14px;font-weight:500;color:#64748b;text-decoration:none;transition:all 0.15s;margin-bottom:2px;}
        .nav-item:hover{background:#f1f5f9;color:#0f172a;}
        .nav-item.active{background:#eff6ff;color:#2563eb;font-weight:600;}
        .sidebar-bottom{padding:16px;border-top:1px solid #e2e8f0;}
        .user-card{display:flex;align-items:center;gap:10px;padding:12px;background:#f8fafc;border-radius:12px;margin-bottom:10px;}
        .user-avatar{width:36px;height:36px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;flex-shrink:0;}
        .user-name{font-size:13px;font-weight:600;color:#0f172a;}
        .user-role{font-size:11px;color:#94a3b8;text-transform:capitalize;}
        .btn-logout{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:none;border:1.5px solid #e2e8f0;padding:9px;border-radius:10px;font-size:13px;font-weight:600;color:#64748b;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .btn-logout:hover{border-color:#ef4444;color:#ef4444;background:#fef2f2;}
        /* MAIN */
        .main{margin-left:256px;flex:1;min-height:100vh;}
        /* TOP BAR */
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
        .topbar-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:#0f172a;}
        .hamburger{display:none;background:none;border:none;cursor:pointer;color:#0f172a;}
        /* CONTENT */
        .content{padding:32px;}
        .welcome{margin-bottom:28px;}
        .welcome-title{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;color:#0f172a;margin-bottom:4px;}
        .welcome-sub{font-size:14px;color:#64748b;}
        /* STATS */
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}
        .stat-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px;}
        .stat-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
        .stat-num{font-family:'Sora',sans-serif;font-size:28px;font-weight:800;color:#0f172a;}
        .stat-label{font-size:13px;color:#64748b;margin-top:2px;}
        /* SECTION */
        .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
        .section-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:#0f172a;}
        .btn-primary{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:10px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s;}
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(37,99,235,0.25);}
        /* TABLE */
        .table-wrap{background:white;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;}
        .table{width:100%;border-collapse:collapse;}
        .table th{text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}
        .table td{padding:16px 20px;font-size:14px;color:#475569;border-bottom:1px solid #f1f5f9;vertical-align:middle;}
        .table tr:last-child td{border-bottom:none;}
        .badge{display:inline-flex;align-items:center;padding:4px 12px;border-radius:50px;font-size:11px;font-weight:700;}
        .empty-row{text-align:center;padding:60px 20px;color:#94a3b8;}
        .empty-icon{font-size:40px;display:block;margin-bottom:8px;}
        .btn-pay{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;padding:6px 16px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:4px;transition:all 0.15s;}
        .btn-pay:hover{transform:translateY(-1px);}
        .btn-resubmit{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;}
        /* MOBILE OVERLAY */
        .overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;}
        /* CARDS on mobile */
        .booking-cards{display:none;flex-direction:column;gap:12px;}
        .booking-card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:18px;}
        .booking-card-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
        .booking-card-label{font-size:12px;color:#94a3b8;font-weight:500;}
        .booking-card-value{font-size:14px;color:#0f172a;font-weight:600;}
        @media(max-width:1024px){
          .stats{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:768px){
          .sidebar{transform:translateX(-100%);}
          .sidebar.open{transform:translateX(0);}
          .overlay{display:block;}
          .main{margin-left:0;}
          .hamburger{display:flex;}
          .content{padding:20px 16px;}
          .topbar{padding:0 16px;}
          .stats{grid-template-columns:repeat(2,1fr);gap:12px;}
          .table-wrap{display:none;}
          .booking-cards{display:flex;}
          .welcome-title{font-size:20px;}
        }
        @media(max-width:480px){
          .stats{grid-template-columns:1fr 1fr;}
          .stat-num{font-size:22px;}
        }
        @keyframes spin{to{transform:rotate(360deg);}}
      `}</style>

      <div className="layout">
        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}/>}

        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <Link href="/" className="sidebar-logo" onClick={() => setSidebarOpen(false)}>
            <div className="logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">DormLink</span>
          </Link>

          <div className="sidebar-nav">
            <div className="nav-label">Main Menu</div>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className={`nav-item ${n.href === '/student/dashboard' ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
                <span className="material-icons-round" style={{fontSize:'20px'}}>{n.icon}</span>
                {n.label}
              </Link>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
              <div>
                <div className="user-name">{user?.first_name} {user?.last_name}</div>
                <div className="user-role">Student</div>
              </div>
            </div>
            <button className="btn-logout" onClick={logout}>
              <span className="material-icons-round" style={{fontSize:'16px'}}>logout</span>
              Sign Out
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span className="material-icons-round" style={{fontSize:'24px'}}>menu</span>
            </button>
            <div className="topbar-title">My Dashboard</div>
            <Link href="/" className="btn-primary" style={{fontSize:'13px',padding:'8px 16px'}}>
              <span className="material-icons-round" style={{fontSize:'16px'}}>search</span>
              Find Hostel
            </Link>
          </div>

          <div className="content">
            <div className="welcome">
              <div className="welcome-title">Welcome back, {user?.first_name} 👋</div>
              <div className="welcome-sub">Here's your accommodation activity at a glance</div>
            </div>

            <div className="stats">
              {[
                { icon:'book_online', color:'#eff6ff', iconColor:'#2563eb', num: bookings.length, label:'Total Bookings' },
                { icon:'check_circle', color:'#dcfce7', iconColor:'#16a34a', num: bookings.filter(b=>b.status==='confirmed').length, label:'Confirmed' },
                { icon:'schedule', color:'#fef9c3', iconColor:'#ca8a04', num: bookings.filter(b=>b.status==='pending').length, label:'Pending' },
                { icon:'payments', color:'#f0fdf4', iconColor:'#15803d', num: bookings.filter(b=>b.payment_status==='paid').length, label:'Paid' },
              ].map((s,i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon" style={{background:s.color}}>
                    <span className="material-icons-round" style={{color:s.iconColor,fontSize:'22px'}}>{s.icon}</span>
                  </div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="section-header">
              <div className="section-title">My Bookings</div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Property</th><th>Room</th><th>Semester</th>
                    <th>Total Fee</th><th>Deposit (50%)</th><th>Status</th><th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLoading ? (
                    <tr><td colSpan="7" className="empty-row">Loading your bookings...</td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan="7" className="empty-row">
                      <span className="empty-icon">🏠</span>
                      No bookings yet. <Link href="/" style={{color:'#2563eb',fontWeight:700}}>Find a hostel →</Link>
                    </td></tr>
                  ) : bookings.map(b => {
                    const ss = statusStyle(b.status);
                    const ps = payStyle(b.payment_status);
                    return (
                      <tr key={b.id}>
                        <td style={{fontWeight:600,color:'#0f172a'}}>{b.hostels?.name || '—'}</td>
                        <td>{b.rooms?.room_type || '—'}</td>
                        <td>{b.semester || '—'}</td>
                        <td>TZS {parseFloat(b.total_amount||0).toLocaleString()}</td>
                        <td style={{fontWeight:600,color:'#2563eb'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</td>
                        <td><span className="badge" style={{background:ss.bg,color:ss.color}}>{ss.label}</span></td>
                        <td>
                          {b.status==='confirmed' && b.payment_status==='unpaid' && (
                            <Link href={`/payment/${b.id}`} className="btn-pay">
                              <span className="material-icons-round" style={{fontSize:'13px'}}>payment</span>Pay Now
                            </Link>
                          )}
                          {b.payment_status==='pending_confirmation' && (
                            <span className="badge" style={{background:'#fef9c3',color:'#854d0e'}}>⏳ Verifying</span>
                          )}
                          {b.payment_status==='paid' && (
                            <span className="badge" style={{background:'#dcfce7',color:'#166534'}}>✓ Paid</span>
                          )}
                          {b.payment_status==='rejected' && (
                            <Link href={`/payment/${b.id}`} className="btn-resubmit">↩ Resubmit</Link>
                          )}
                          {b.status==='pending' && b.payment_status==='unpaid' && (
                            <span style={{color:'#94a3b8',fontSize:'12px'}}>Awaiting host</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="booking-cards">
              {dataLoading ? (
                <div style={{textAlign:'center',padding:'40px',color:'#94a3b8'}}>Loading...</div>
              ) : bookings.length === 0 ? (
                <div style={{textAlign:'center',padding:'40px',color:'#94a3b8'}}>
                  <div style={{fontSize:'40px',marginBottom:'8px'}}>🏠</div>
                  No bookings yet. <Link href="/" style={{color:'#2563eb',fontWeight:700}}>Find a hostel →</Link>
                </div>
              ) : bookings.map(b => {
                const ss = statusStyle(b.status);
                const ps = payStyle(b.payment_status);
                return (
                  <div key={b.id} className="booking-card">
                    <div className="booking-card-row">
                      <div style={{fontFamily:'Sora',fontWeight:700,fontSize:'15px',color:'#0f172a'}}>{b.hostels?.name}</div>
                      <span className="badge" style={{background:ss.bg,color:ss.color}}>{ss.label}</span>
                    </div>
                    <div className="booking-card-row">
                      <div className="booking-card-label">Room</div>
                      <div className="booking-card-value">{b.rooms?.room_type}</div>
                    </div>
                    <div className="booking-card-row">
                      <div className="booking-card-label">Semester</div>
                      <div className="booking-card-value">{b.semester}</div>
                    </div>
                    <div className="booking-card-row">
                      <div className="booking-card-label">Deposit (50%)</div>
                      <div className="booking-card-value" style={{color:'#2563eb'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</div>
                    </div>
                    <div style={{marginTop:'12px'}}>
                      {b.status==='confirmed' && b.payment_status==='unpaid' && (
                        <Link href={`/payment/${b.id}`} className="btn-pay" style={{width:'100%',justifyContent:'center'}}>
                          <span className="material-icons-round" style={{fontSize:'14px'}}>payment</span>Pay Now
                        </Link>
                      )}
                      {b.payment_status==='pending_confirmation' && (
                        <span className="badge" style={{background:'#fef9c3',color:'#854d0e',width:'100%',justifyContent:'center'}}>⏳ Verifying payment...</span>
                      )}
                      {b.payment_status==='paid' && (
                        <span className="badge" style={{background:'#dcfce7',color:'#166534',width:'100%',justifyContent:'center'}}>✓ Payment Confirmed</span>
                      )}
                      {b.payment_status==='rejected' && (
                        <Link href={`/payment/${b.id}`} className="btn-resubmit" style={{display:'block',textAlign:'center'}}>↩ Resubmit Payment</Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}