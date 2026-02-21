'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [hostels, setHostels] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hostels');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'admin') { router.push('/login'); return; }
    fetchData();
  }, [user, loading]);

  const fetchData = async () => {
    try {
      const [h, u, b] = await Promise.all([
        api.get('/admin/hostels'),
        api.get('/admin/users'),
        api.get('/admin/bookings').catch(() => ({ data: { bookings: [] } })),
      ]);
      setHostels(h.data.hostels || []);
      setUsers(u.data.users || []);
      setBookings(b.data.bookings || []);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const approveHostel = async (id) => {
    try {
      await api.patch(`/admin/hostels/${id}/approve`);
      toast.success('Hostel approved and is now live!');
      fetchData();
    } catch (e) { toast.error('Failed to approve'); }
  };

  const rejectHostel = async (id) => {
    try {
      await api.patch(`/admin/hostels/${id}/reject`);
      toast.success('Hostel rejected');
      fetchData();
    } catch (e) { toast.error('Failed to reject'); }
  };

  const statusStyle = (s) => ({
    pending:   { bg: '#fef9c3', color: '#854d0e' },
    approved:  { bg: '#dcfce7', color: '#166534' },
    rejected:  { bg: '#fee2e2', color: '#991b1b' },
    confirmed: { bg: '#dcfce7', color: '#166534' },
    cancelled: { bg: '#fee2e2', color: '#991b1b' },
    student:   { bg: '#eff6ff', color: '#1e40af' },
    host:      { bg: '#faf5ff', color: '#7c3aed' },
    admin:     { bg: '#fef9c3', color: '#854d0e' },
  }[s] || { bg: '#f1f5f9', color: '#475569' });

  const pendingHostels = hostels.filter(h => h.status === 'pending');

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
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
        .sidebar{width:256px;background:white;border-right:1px solid #e2e8f0;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.3s;}
        .sidebar-logo{display:flex;align-items:center;gap:10px;padding:24px 20px;border-bottom:1px solid #e2e8f0;text-decoration:none;}
        .logo-icon{width:34px;height:34px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .logo-text{font-family:'Sora',sans-serif;font-size:20px;font-weight:800;color:#2563eb;}
        .admin-badge{font-size:10px;font-weight:700;background:#fef9c3;color:#854d0e;padding:2px 8px;border-radius:50px;margin-left:6px;}
        .sidebar-nav{padding:16px 12px;flex:1;overflow-y:auto;}
        .nav-section{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;padding:0 8px;margin:20px 0 8px;}
        .nav-section:first-child{margin-top:0;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:14px;font-weight:500;color:#64748b;width:100%;border:none;background:none;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.15s;text-align:left;}
        .nav-item:hover{background:#f1f5f9;color:#0f172a;}
        .nav-item.active{background:#eff6ff;color:#2563eb;font-weight:600;}
        .nav-badge{background:#ef4444;color:white;border-radius:50px;padding:1px 7px;font-size:10px;font-weight:700;margin-left:auto;}
        .sidebar-bottom{padding:16px;border-top:1px solid #e2e8f0;}
        .user-card{display:flex;align-items:center;gap:10px;padding:12px;background:#f8fafc;border-radius:12px;margin-bottom:10px;}
        .user-avatar{width:36px;height:36px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;flex-shrink:0;}
        .user-name{font-size:13px;font-weight:600;color:#0f172a;}
        .user-role{font-size:11px;color:#94a3b8;text-transform:capitalize;}
        .btn-logout{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:none;border:1.5px solid #e2e8f0;padding:9px;border-radius:10px;font-size:13px;font-weight:600;color:#64748b;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .btn-logout:hover{border-color:#ef4444;color:#ef4444;background:#fef2f2;}
        .main{margin-left:256px;flex:1;}
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
        .topbar-left{display:flex;align-items:center;gap:12px;}
        .topbar-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:#0f172a;}
        .hamburger{display:none;background:none;border:none;cursor:pointer;color:#0f172a;}
        .content{padding:32px;}
        .page-header{margin-bottom:28px;}
        .page-title{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;color:#0f172a;margin-bottom:4px;}
        .page-sub{font-size:14px;color:#64748b;}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
        .stat-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px;transition:all 0.2s;}
        .stat-card:hover{border-color:#bfdbfe;box-shadow:0 4px 16px rgba(37,99,235,0.08);}
        .stat-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
        .stat-num{font-family:'Sora',sans-serif;font-size:32px;font-weight:800;color:#0f172a;}
        .stat-label{font-size:13px;color:#64748b;margin-top:2px;}
        .stat-trend{font-size:12px;color:#16a34a;margin-top:4px;font-weight:600;}
        .tabs{display:flex;gap:4px;background:#f1f5f9;border-radius:12px;padding:4px;margin-bottom:24px;width:fit-content;}
        .tab{padding:8px 20px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;background:none;color:#64748b;transition:all 0.15s;display:flex;align-items:center;gap:6px;white-space:nowrap;}
        .tab.active{background:white;color:#2563eb;box-shadow:0 1px 6px rgba(0,0,0,0.08);}
        .tab-badge{background:#ef4444;color:white;border-radius:50px;padding:1px 7px;font-size:10px;font-weight:700;}
        .table-wrap{background:white;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;}
        .table-header{padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;}
        .table-header-title{font-family:'Sora',sans-serif;font-size:15px;font-weight:700;color:#0f172a;}
        .table-header-sub{font-size:13px;color:#64748b;margin-top:2px;}
        .table{width:100%;border-collapse:collapse;}
        .table th{text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}
        .table td{padding:14px 20px;font-size:14px;color:#475569;border-bottom:1px solid #f1f5f9;vertical-align:middle;}
        .table tr:last-child td{border-bottom:none;}
        .table tr:hover td{background:#f8fafc;}
        .badge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:700;}
        .action-btns{display:flex;gap:6px;flex-wrap:wrap;}
        .btn-sm{border:none;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;display:flex;align-items:center;gap:4px;}
        .btn-approve{background:#dcfce7;color:#166534;}
        .btn-approve:hover{background:#bbf7d0;}
        .btn-reject{background:#fee2e2;color:#991b1b;}
        .btn-reject:hover{background:#fecaca;}
        .empty-cell{text-align:center;padding:60px;color:#94a3b8;font-size:14px;}
        .highlight-row td{background:#fffbeb!important;}
        .overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;}
        .hostel-info{display:flex;align-items:center;gap:10px;}
        .hostel-avatar{width:36px;height:36px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .hostel-name{font-weight:600;color:#0f172a;font-size:14px;}
        .hostel-addr{font-size:12px;color:#94a3b8;}
        @media(max-width:1200px){.stats{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:768px){
          .sidebar{transform:translateX(-100%);}
          .sidebar.open{transform:translateX(0);}
          .overlay{display:block;}
          .main{margin-left:0;}
          .hamburger{display:flex;}
          .content{padding:20px 16px;}
          .topbar{padding:0 16px;}
          .stats{grid-template-columns:repeat(2,1fr);gap:12px;}
          .stat-num{font-size:24px;}
          .tabs{overflow-x:auto;width:100%;}
          .table{font-size:13px;}
          .table th,.table td{padding:10px 12px;}
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
            <span className="admin-badge">Admin</span>
          </Link>

          <div className="sidebar-nav">
            <div className="nav-section">Overview</div>
            {[
              { tab:'hostels', icon:'apartment', label:'Properties', count: pendingHostels.length },
              { tab:'users',   icon:'people',    label:'Users',      count: 0 },
              { tab:'bookings',icon:'book_online',label:'Bookings',  count: 0 },
            ].map(n => (
              <button key={n.tab} className={`nav-item ${activeTab===n.tab?'active':''}`}
                onClick={() => { setActiveTab(n.tab); setSidebarOpen(false); }}>
                <span className="material-icons-round" style={{fontSize:'20px'}}>{n.icon}</span>
                {n.label}
                {n.count > 0 && <span className="nav-badge">{n.count}</span>}
              </button>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
              <div>
                <div className="user-name">{user?.first_name} {user?.last_name}</div>
                <div className="user-role">Administrator</div>
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
            <div className="topbar-left">
              <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span className="material-icons-round" style={{fontSize:'24px'}}>menu</span>
              </button>
              <div className="topbar-title">Admin Panel</div>
            </div>
            {pendingHostels.length > 0 && (
              <div style={{background:'#fef9c3',border:'1px solid #fde68a',borderRadius:'8px',padding:'6px 14px',fontSize:'13px',fontWeight:'600',color:'#854d0e',display:'flex',alignItems:'center',gap:'6px'}}>
                <span className="material-icons-round" style={{fontSize:'16px'}}>schedule</span>
                {pendingHostels.length} pending approval
              </div>
            )}
          </div>

          <div className="content">
            <div className="page-header">
              <div className="page-title">Platform Overview</div>
              <div className="page-sub">Manage properties, users and bookings across Tanzania</div>
            </div>

            <div className="stats">
              {[
                { icon:'apartment',  bg:'#eff6ff',  iconColor:'#2563eb', num: hostels.length,                              label:'Total Properties', trend:`${pendingHostels.length} pending` },
                { icon:'check_circle',bg:'#dcfce7', iconColor:'#16a34a', num: hostels.filter(h=>h.status==='approved').length, label:'Live Properties', trend:'Approved & active' },
                { icon:'people',     bg:'#faf5ff',  iconColor:'#7c3aed', num: users.length,                                label:'Total Users',     trend:`${users.filter(u=>u.role==='host').length} hosts` },
                { icon:'book_online',bg:'#fef9c3',  iconColor:'#ca8a04', num: bookings.length,                             label:'Total Bookings',  trend:'All time' },
              ].map((s,i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon" style={{background:s.bg}}>
                    <span className="material-icons-round" style={{color:s.iconColor,fontSize:'24px'}}>{s.icon}</span>
                  </div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-trend">{s.trend}</div>
                </div>
              ))}
            </div>

            <div className="tabs">
              {[
                { id:'hostels',  label:'Properties', count: pendingHostels.length },
                { id:'users',    label:'Users',       count: 0 },
                { id:'bookings', label:'Bookings',    count: 0 },
              ].map(t => (
                <button key={t.id} className={`tab ${activeTab===t.id?'active':''}`} onClick={() => setActiveTab(t.id)}>
                  {t.label}
                  {t.count > 0 && <span className="tab-badge">{t.count}</span>}
                </button>
              ))}
            </div>

            {/* PROPERTIES TAB */}
            {activeTab==='hostels' && (
              <div className="table-wrap">
                <div className="table-header">
                  <div>
                    <div className="table-header-title">All Properties</div>
                    <div className="table-header-sub">{pendingHostels.length} pending approval</div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr><th>Property</th><th>Host</th><th>University</th><th>City</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {dataLoading ? (
                      <tr><td colSpan="6" className="empty-cell">Loading properties...</td></tr>
                    ) : hostels.length === 0 ? (
                      <tr><td colSpan="6" className="empty-cell">No properties submitted yet</td></tr>
                    ) : hostels.map(h => {
                      const ss = statusStyle(h.status);
                      return (
                        <tr key={h.id} className={h.status==='pending'?'highlight-row':''}>
                          <td>
                            <div className="hostel-info">
                              <div className="hostel-avatar">
                                <span className="material-icons-round" style={{color:'#2563eb',fontSize:'18px'}}>apartment</span>
                              </div>
                              <div>
                                <div className="hostel-name">{h.name}</div>
                                <div className="hostel-addr">{h.address}</div>
                              </div>
                            </div>
                          </td>
                          <td>{h.users?.first_name} {h.users?.last_name}</td>
                          <td style={{fontSize:'13px'}}>{h.universities?.name || '—'}</td>
                          <td>{h.city}</td>
                          <td><span className="badge" style={{background:ss.bg,color:ss.color}}>{h.status}</span></td>
                          <td>
                            {h.status==='pending' ? (
                              <div className="action-btns">
                                <button className="btn-sm btn-approve" onClick={() => approveHostel(h.id)}>
                                  <span className="material-icons-round" style={{fontSize:'14px'}}>check</span>Approve
                                </button>
                                <button className="btn-sm btn-reject" onClick={() => rejectHostel(h.id)}>
                                  <span className="material-icons-round" style={{fontSize:'14px'}}>close</span>Reject
                                </button>
                              </div>
                            ) : (
                              <span style={{color:'#94a3b8',fontSize:'12px'}}>—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* USERS TAB */}
            {activeTab==='users' && (
              <div className="table-wrap">
                <div className="table-header">
                  <div>
                    <div className="table-header-title">All Users</div>
                    <div className="table-header-sub">{users.length} registered accounts</div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th></tr>
                  </thead>
                  <tbody>
                    {dataLoading ? (
                      <tr><td colSpan="5" className="empty-cell">Loading users...</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan="5" className="empty-cell">No users yet</td></tr>
                    ) : users.map(u => {
                      const rs = statusStyle(u.role);
                      return (
                        <tr key={u.id}>
                          <td>
                            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                              <div style={{width:'32px',height:'32px',background:'linear-gradient(135deg,#dbeafe,#bfdbfe)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'#1e40af',flexShrink:0}}>
                                {u.first_name?.[0]}{u.last_name?.[0]}
                              </div>
                              <div style={{fontWeight:600,color:'#0f172a'}}>{u.first_name} {u.last_name}</div>
                            </div>
                          </td>
                          <td>{u.email}</td>
                          <td>{u.phone || '—'}</td>
                          <td><span className="badge" style={{background:rs.bg,color:rs.color}}>{u.role}</span></td>
                          <td style={{fontSize:'13px'}}>{u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB') : '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab==='bookings' && (
              <div className="table-wrap">
                <div className="table-header">
                  <div>
                    <div className="table-header-title">All Bookings</div>
                    <div className="table-header-sub">{bookings.length} total bookings on platform</div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr><th>Student</th><th>Property</th><th>Room</th><th>Semester</th><th>Deposit</th><th>Status</th><th>Payment</th></tr>
                  </thead>
                  <tbody>
                    {dataLoading ? (
                      <tr><td colSpan="7" className="empty-cell">Loading bookings...</td></tr>
                    ) : bookings.length === 0 ? (
                      <tr><td colSpan="7" className="empty-cell">No bookings yet</td></tr>
                    ) : bookings.map(b => {
                      const ss = statusStyle(b.status);
                      const ps = statusStyle(b.payment_status);
                      return (
                        <tr key={b.id}>
                          <td style={{fontWeight:600,color:'#0f172a'}}>{b.users?.first_name} {b.users?.last_name}</td>
                          <td>{b.hostels?.name}</td>
                          <td>{b.rooms?.room_type}</td>
                          <td>{b.semester}</td>
                          <td style={{fontWeight:700,color:'#2563eb'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</td>
                          <td><span className="badge" style={{background:ss.bg,color:ss.color}}>{b.status}</span></td>
                          <td><span className="badge" style={{background:ps.bg,color:ps.color}}>{b.payment_status||'unpaid'}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
