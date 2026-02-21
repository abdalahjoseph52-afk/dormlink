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
  const [stats, setStats] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'admin') { router.push('/login'); return; }
    fetchData();
  }, [user, loading]);

  const fetchData = async () => {
    try {
      const [s, h, u] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/hostels'),
        api.get('/admin/users')
      ]);
      setStats(s.data.stats);
      setHostels(h.data.hostels);
      setUsers(u.data.users);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const reviewHostel = async (id, status) => {
    try {
      await api.patch(`/admin/hostels/${id}/review`, { status, admin_notes: '' });
      toast.success(`Hostel ${status}`);
      fetchData();
    } catch (e) { toast.error('Action failed'); }
  };

  const toggleUser = async (id, is_active) => {
    try {
      await api.patch(`/admin/users/${id}/status`, { is_active });
      toast.success(is_active ? 'User activated' : 'User suspended');
      fetchData();
    } catch (e) { toast.error('Action failed'); }
  };

  const statusColor = (s) => ({
    pending: { background: '#fef9c3', color: '#854d0e' },
    approved: { background: '#dcfce7', color: '#166534' },
    confirmed: { background: '#dcfce7', color: '#166534' },
    rejected: { background: '#fee2e2', color: '#991b1b' },
    cancelled: { background: '#fee2e2', color: '#991b1b' },
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
        .user-role{font-size:11px;color:rgba(255,255,255,0.35);}
        .btn-logout{width:100%;background:rgba(255,255,255,0.06);border:none;padding:10px;border-radius:8px;font-size:13px;color:rgba(255,255,255,0.4);cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-logout:hover{color:#f87171;background:rgba(248,113,113,0.1);}
        .main{flex:1;padding:36px;overflow-y:auto;}
        .top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;}
        .page-title{font-family:'Merriweather',serif;font-size:24px;font-weight:700;color:#0f172a;}
        .page-sub{font-size:14px;color:#94a3b8;margin-top:4px;}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}
        .stat-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:20px;}
        .stat-label{font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;}
        .stat-num{font-size:28px;font-weight:700;color:#0f172a;}
        .stat-sub{font-size:12px;color:#94a3b8;margin-top:4px;}
        .tabs{display:flex;gap:4px;background:#f1f4f9;border-radius:8px;padding:4px;margin-bottom:24px;width:fit-content;}
        .tab{padding:8px 18px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'Inter',sans-serif;background:none;color:#94a3b8;transition:all 0.15s;}
        .tab.active{background:white;color:#1a56db;box-shadow:0 1px 4px rgba(0,0,0,0.1);}
        .table-wrap{background:white;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;}
        .table{width:100%;border-collapse:collapse;}
        .table th{text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}
        .table td{padding:16px 20px;font-size:14px;color:#475569;border-bottom:1px solid #f1f4f9;}
        .table tr:last-child td{border-bottom:none;}
        .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
        .action-btns{display:flex;gap:6px;}
        .btn-approve{background:#dcfce7;color:#166534;border:none;padding:5px 12px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;}
        .btn-reject{background:#fee2e2;color:#991b1b;border:none;padding:5px 12px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;}
        .btn-suspend{background:#fee2e2;color:#991b1b;border:none;padding:5px 12px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;}
        .btn-activate{background:#dcfce7;color:#166534;border:none;padding:5px 12px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;}
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
          <Link href="/admin/dashboard" className="nav-item active">
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
          <div className="sidebar-bottom">
            <div className="user-box">
              <div className="user-avatar">AD</div>
              <div>
                <div className="user-name">Admin</div>
                <div className="user-role">Platform Administrator</div>
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
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="page-sub">Platform overview and management</p>
            </div>
          </div>

          {stats && (
            <div className="stats-row">
              {[
                { label: 'Total Users', value: stats.totalUsers, sub: `${stats.totalStudents} students, ${stats.totalHosts} hosts` },
                { label: 'Properties', value: stats.totalHostels, sub: `${stats.pendingHostels} pending approval` },
                { label: 'Total Bookings', value: stats.totalBookings, sub: 'All time' },
                { label: 'Revenue (TZS)', value: parseFloat(stats.totalRevenue || 0).toLocaleString(), sub: 'Commission earned' },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-num">{s.value}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          )}

          <div className="tabs">
            {['overview', 'hostels', 'users'].map(t => (
              <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Pending Properties</th><th>Owner</th><th>City</th><th>Submitted</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {dataLoading ? (
                    <tr><td colSpan="5" className="empty-cell">Loading...</td></tr>
                  ) : hostels.filter(h => h.status === 'pending').length === 0 ? (
                    <tr><td colSpan="5" className="empty-cell">No pending approvals — all clear!</td></tr>
                  ) : hostels.filter(h => h.status === 'pending').map(h => (
                    <tr key={h.id}>
                      <td style={{fontWeight:600,color:'#0f172a'}}>{h.name}</td>
                      <td>{h.users?.first_name} {h.users?.last_name}</td>
                      <td>{h.city}</td>
                      <td>{new Date(h.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-approve" onClick={() => reviewHostel(h.id, 'approved')}>Approve</button>
                          <button className="btn-reject" onClick={() => reviewHostel(h.id, 'rejected')}>Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'hostels' && (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Property</th><th>Owner</th><th>City</th><th>University</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {dataLoading ? (
                    <tr><td colSpan="6" className="empty-cell">Loading...</td></tr>
                  ) : hostels.length === 0 ? (
                    <tr><td colSpan="6" className="empty-cell">No properties found</td></tr>
                  ) : hostels.map(h => (
                    <tr key={h.id}>
                      <td style={{fontWeight:600,color:'#0f172a'}}>{h.name}</td>
                      <td>{h.users?.first_name} {h.users?.last_name}</td>
                      <td>{h.city}</td>
                      <td>{h.universities?.name || '—'}</td>
                      <td><span className="badge" style={statusColor(h.status)}>{h.status}</span></td>
                      <td>
                        <div className="action-btns">
                          {h.status === 'pending' && <>
                            <button className="btn-approve" onClick={() => reviewHostel(h.id, 'approved')}>Approve</button>
                            <button className="btn-reject" onClick={() => reviewHostel(h.id, 'rejected')}>Reject</button>
                          </>}
                          {h.status === 'approved' && (
                            <button className="btn-reject" onClick={() => reviewHostel(h.id, 'rejected')}>Suspend</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'users' && (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {dataLoading ? (
                    <tr><td colSpan="5" className="empty-cell">Loading...</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan="5" className="empty-cell">No users found</td></tr>
                  ) : users.map(u => (
                    <tr key={u.id}>
                      <td style={{fontWeight:600,color:'#0f172a'}}>{u.first_name} {u.last_name}</td>
                      <td>{u.email}</td>
                      <td><span className="badge" style={{background:'#ebf2ff',color:'#1e429f'}}>{u.role}</span></td>
                      <td><span className="badge" style={u.is_active ? {background:'#dcfce7',color:'#166534'} : {background:'#fee2e2',color:'#991b1b'}}>{u.is_active ? 'Active' : 'Suspended'}</span></td>
                      <td>
                        {u.role !== 'admin' && (
                          u.is_active
                            ? <button className="btn-suspend" onClick={() => toggleUser(u.id, false)}>Suspend</button>
                            : <button className="btn-activate" onClick={() => toggleUser(u.id, true)}>Activate</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
