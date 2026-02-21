'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'student') { router.push('/login'); return; }
    fetchBookings();
  }, [user, loading]);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/my');
      setBookings(res.data.bookings);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const statusColor = (s) => ({
    pending: { background: '#fef9c3', color: '#854d0e' },
    confirmed: { background: '#dcfce7', color: '#166534' },
    cancelled: { background: '#fee2e2', color: '#991b1b' },
    completed: { background: '#e0f2fe', color: '#075985' }
  }[s] || { background: '#f1f4f9', color: '#475569' });

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'Inter,sans-serif',color:'#94a3b8',fontSize:'15px'}}>
      Loading...
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Inter',sans-serif;background:#f8fafc;}
        .layout{display:flex;min-height:100vh;}
        .sidebar{width:240px;background:#0f172a;display:flex;flex-direction:column;padding:24px 0;flex-shrink:0;}
        .sidebar-logo{font-family:'Merriweather',serif;font-size:18px;font-weight:700;color:white;display:flex;align-items:center;gap:10px;padding:0 20px 28px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:20px;}
        .logo-mark{width:30px;height:30px;background:#1a56db;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:10px 20px;font-size:14px;font-weight:500;color:rgba(255,255,255,0.5);text-decoration:none;transition:all 0.15s;width:100%;border:none;background:none;font-family:'Inter',sans-serif;cursor:pointer;}
        .nav-item:hover,.nav-item.active{color:white;background:rgba(255,255,255,0.07);}
        .nav-item.active{border-right:2px solid #1a56db;}
        .nav-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .sidebar-bottom{margin-top:auto;padding:0 20px;}
        .user-box{background:rgba(255,255,255,0.06);border-radius:10px;padding:12px;display:flex;align-items:center;gap:10px;margin-bottom:12px;}
        .user-avatar{width:34px;height:34px;background:#1a56db;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;flex-shrink:0;}
        .user-name{font-size:13px;font-weight:600;color:white;}
        .user-role{font-size:11px;color:rgba(255,255,255,0.35);text-transform:capitalize;}
        .btn-logout{width:100%;background:rgba(255,255,255,0.06);border:none;padding:10px;border-radius:8px;font-size:13px;color:rgba(255,255,255,0.4);cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-logout:hover{color:#f87171;background:rgba(248,113,113,0.1);}
        .main{flex:1;padding:36px;overflow-y:auto;}
        .top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;}
        .page-title{font-family:'Merriweather',serif;font-size:24px;font-weight:700;color:#0f172a;}
        .page-sub{font-size:14px;color:#94a3b8;margin-top:4px;}
        .btn-primary{background:#1a56db;color:white;border:none;padding:10px 20px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.15s;}
        .btn-primary:hover{background:#1e429f;}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}
        .stat-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:20px;}
        .stat-label{font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;}
        .stat-num{font-size:28px;font-weight:700;color:#0f172a;}
        .stat-sub{font-size:12px;color:#94a3b8;margin-top:4px;}
        .section-title{font-size:16px;font-weight:700;color:#0f172a;margin-bottom:16px;}
        .table-wrap{background:white;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;}
        .table{width:100%;border-collapse:collapse;}
        .table th{text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}
        .table td{padding:16px 20px;font-size:14px;color:#475569;border-bottom:1px solid #f1f4f9;}
        .table tr:last-child td{border-bottom:none;}
        .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
        .empty-cell{text-align:center;padding:48px;color:#94a3b8;font-size:14px;}
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <Link href="/" className="sidebar-logo">
            <div className="logo-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            DormLink
          </Link>
          <Link href="/student/dashboard" className="nav-item active">
            <div className="nav-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            Dashboard
          </Link>
          <Link href="/" className="nav-item">
            <div className="nav-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            Browse Hostels
          </Link>
          <Link href="/student/bookings" className="nav-item">
            <div className="nav-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            My Bookings
          </Link>
          <div className="sidebar-bottom">
            <div className="user-box">
              <div className="user-avatar">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
              <div>
                <div className="user-name">{user?.first_name} {user?.last_name}</div>
                <div className="user-role">{user?.role}</div>
              </div>
            </div>
            <button className="btn-logout" onClick={logout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="top-bar">
            <div>
              <h1 className="page-title">Welcome back, {user?.first_name}</h1>
              <p className="page-sub">Here is an overview of your accommodation activity</p>
            </div>
            <Link href="/" className="btn-primary">Find Accommodation</Link>
          </div>
          <div className="stats-row">
            {[
              { label: 'Total Bookings', value: bookings.length, sub: 'All time' },
              { label: 'Active', value: bookings.filter(b => b.status === 'confirmed').length, sub: 'Confirmed' },
              { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, sub: 'Awaiting confirmation' },
              { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, sub: 'Past stays' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-label">{s.label}</div>
                <div className="stat-num">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="section-title">Recent Bookings</div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Room</th>
                  <th>Semester</th>
                  <th>Total Fee</th>
                  <th>Deposit (50%)</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {dataLoading ? (
                  <tr><td colSpan="7" className="empty-cell">Loading...</td></tr>
                ) : bookings.length === 0 ? (
                  <tr><td colSpan="7" className="empty-cell">
                    No bookings yet. <Link href="/" style={{color:'#1a56db'}}>Browse properties</Link>
                  </td></tr>
                ) : bookings.map(b => (
                  <tr key={b.id}>
                    <td style={{fontWeight:600,color:'#0f172a'}}>{b.hostels?.name || '—'}</td>
                    <td>{b.rooms?.room_type || '—'}</td>
                    <td>{b.semester || '—'}</td>
                    <td>TZS {parseFloat(b.total_amount || 0).toLocaleString()}</td>
                    <td style={{color:'#1a56db',fontWeight:600}}>TZS {parseFloat(b.deposit_amount || 0).toLocaleString()}</td>
                    <td><span className="badge" style={statusColor(b.status)}>{b.status}</span></td>
                    <td>
                      {b.status === 'confirmed' && b.payment_status === 'unpaid' && (
                        <Link href={`/payment/${b.id}`} style={{background:'#1a56db',color:'white',padding:'6px 14px',borderRadius:'6px',fontSize:'12px',fontWeight:700,textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'4px'}}>
                          Pay Now
                        </Link>
                      )}
                      {b.payment_status === 'pending_confirmation' && (
                        <span style={{color:'#854d0e',fontSize:'12px',fontWeight:600,background:'#fef9c3',padding:'4px 10px',borderRadius:'20px'}}>Verifying...</span>
                      )}
                      {b.payment_status === 'paid' && (
                        <span style={{color:'#166534',fontSize:'12px',fontWeight:600,background:'#dcfce7',padding:'4px 10px',borderRadius:'20px'}}>✓ Paid</span>
                      )}
                      {b.payment_status === 'rejected' && (
                        <Link href={`/payment/${b.id}`} style={{background:'#fee2e2',color:'#991b1b',padding:'6px 14px',borderRadius:'6px',fontSize:'12px',fontWeight:700,textDecoration:'none'}}>
                          Resubmit
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}