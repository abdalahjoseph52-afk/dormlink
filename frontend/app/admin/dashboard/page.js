'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState({ hostels: [], users: [], bookings: [] });
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hostels');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(null); // { type, item }
  const [rejectReason, setRejectReason] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'admin') { router.push('/login'); return; }
    fetchData();
  }, [user, loading]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [h, u, b, s] = await Promise.all([
        api.get('/admin/hostels'),
        api.get('/admin/users'),
        api.get('/admin/bookings').catch(() => ({ data: { bookings: [] } })),
        api.get('/admin/stats').catch(() => ({ data: { stats: {} } })),
      ]);
      setData({
        hostels: h.data.hostels || [],
        users: u.data.users || [],
        bookings: b.data.bookings || [],
      });
      setStats(s.data.stats || {});
    } catch (e) {
      console.error(e);
      toast.error('Failed to load data');
    } finally {
      setDataLoading(false);
    }
  };

  const approveHostel = async (id) => {
    setActionLoading(true);
    try {
      await api.patch(`/admin/hostels/${id}/approve`);
      toast.success('Hostel approved and is now live!');
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to approve hostel');
    } finally {
      setActionLoading(false);
    }
  };

  const rejectHostel = async (id) => {
    setActionLoading(true);
    try {
      await api.patch(`/admin/hostels/${id}/reject`, { reason: rejectReason });
      toast.success('Hostel rejected');
      setModal(null);
      setRejectReason('');
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to reject hostel');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteHostel = async (id) => {
    setActionLoading(true);
    try {
      await api.delete(`/admin/hostels/${id}`);
      toast.success('Hostel deleted');
      setModal(null);
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to delete');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setActionLoading(true);
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('User deleted');
      setModal(null);
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleUser = async (id, is_active) => {
    try {
      await api.patch(`/admin/users/${id}/toggle-status`, { is_active });
      toast.success(is_active ? 'User activated' : 'User suspended');
      fetchData();
    } catch (e) {
      toast.error('Failed to update user status');
    }
  };

  const doResetPassword = async (id) => {
    if (!resetPassword || resetPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setActionLoading(true);
    try {
      await api.patch(`/admin/users/${id}/reset-password`, { new_password: resetPassword });
      toast.success('Password reset successfully');
      setModal(null);
      setResetPassword('');
    } catch (e) {
      toast.error('Failed to reset password');
    } finally {
      setActionLoading(false);
    }
  };

  const confirmPayment = async (bookingId) => {
    try {
      await api.patch(`/admin/bookings/${bookingId}/confirm-payment`);
      toast.success('Payment confirmed!');
      fetchData();
    } catch (e) {
      toast.error('Failed to confirm payment');
    }
  };

  const StatusBadge = ({ status }) => {
    const map = {
      pending:   { bg:'#F4F7FC', color:'#10367D' },
      approved:  { bg:'#f0f9ff', color:'#0369a1' },
      rejected:  { bg:'#f1f5f9', color:'#64748b' },
      confirmed: { bg:'#f0f9ff', color:'#0369a1' },
      cancelled: { bg:'#f1f5f9', color:'#64748b' },
      student:   { bg:'#F4F7FC', color:'#10367D' },
      host:      { bg:'#f1f5f9', color:'#374151' },
      admin:     { bg:'#10367D', color:'white' },
      active:    { bg:'#f0f9ff', color:'#0369a1' },
      suspended: { bg:'#f1f5f9', color:'#64748b' },
    };
    const s = map[status] || { bg:'#f1f5f9', color:'#64748b' };
    return (
      <span style={{background:s.bg,color:s.color,padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600',whiteSpace:'nowrap',textTransform:'capitalize'}}>
        {status}
      </span>
    );
  };

  const navItems = [
    { id:'hostels', label:'Hostels', icon:'apartment' },
    { id:'users',   label:'Users',   icon:'people' },
    { id:'bookings',label:'Bookings',icon:'book_online' },
  ];

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{width:'32px',height:'32px',border:'3px solid #B8CAEB',borderTop:'3px solid #10367D',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  const pendingCount = data.hostels.filter(h => h.status === 'pending').length;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Outfit',sans-serif;background:#f8fafc;color:#060E1C;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .layout{display:flex;min-height:100vh;}
        .sidebar{width:240px;background:white;border-right:1px solid #e2e8f0;position:fixed;top:0;left:0;height:100vh;z-index:100;display:flex;flex-direction:column;transition:transform 0.3s;}
        .sidebar.closed{transform:translateX(-100%);}
        @media(min-width:768px){.sidebar{transform:none!important;}}
        .main{flex:1;margin-left:240px;display:flex;flex-direction:column;min-height:100vh;}
        @media(max-width:767px){.main{margin-left:0;}}
        .sb-brand{padding:20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:10px;}
        .sb-brand-icon{width:34px;height:34px;display:flex;align-items:center;justify-content:center;}
        .sb-brand-name{font-size:17px;font-family:'Outfit',sans-serif;color:#060E1C;}
        .sb-admin-badge{padding:6px 16px;margin:12px;background:#F4F7FC;border-radius:6px;font-size:11px;font-weight:700;color:#10367D;letter-spacing:0.5px;text-align:center;}
        .sb-nav{padding:8px;flex:1;}
        .sb-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;color:#64748b;background:none;border:none;width:100%;text-align:left;transition:all 0.15s;margin-bottom:2px;position:relative;}
        .sb-item:hover{background:#f1f5f9;color:#060E1C;}
        .sb-item.active{background:#F4F7FC;color:#10367D;}
        .sb-badge{position:absolute;right:10px;background:#10367D;color:white;border-radius:10px;font-size:10px;font-weight:700;padding:1px 7px;min-width:18px;text-align:center;}
        .sb-footer{padding:16px;border-top:1px solid #f1f5f9;}
        .sb-logout{display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;color:#64748b;background:none;border:none;width:100%;text-align:left;}
        .sb-logout:hover{background:#f1f5f9;}
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:0 20px;height:58px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
        .menu-btn{display:none;background:none;border:none;cursor:pointer;padding:4px;}
        @media(max-width:767px){.menu-btn{display:flex;}}
        .topbar-title{font-size:16px;font-weight:700;color:#060E1C;}
        .page-content{padding:20px;flex:1;}
        @media(max-width:767px){.page-content{padding:14px;}}
        .stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;margin-bottom:24px;}
        .stat{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:18px;display:flex;align-items:center;gap:12px;}
        .stat-ico{width:40px;height:40px;background:#F4F7FC;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .stat-lbl{font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;}
        .stat-val{font-size:22px;font-weight:700;color:#060E1C;margin-top:1px;}
        .section-hdr{font-size:15px;font-weight:700;color:#060E1C;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;}
        .table-wrap{background:white;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;overflow-x:auto;}
        table{width:100%;border-collapse:collapse;min-width:600px;}
        th{padding:11px 14px;text-align:left;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.4px;border-bottom:1px solid #e2e8f0;background:#fafafa;white-space:nowrap;}
        td{padding:12px 14px;font-size:13px;color:#374151;border-bottom:1px solid #f1f5f9;vertical-align:middle;}
        tr:last-child td{border-bottom:none;}
        tr:hover td{background:#fafafa;}
        .act-wrap{display:flex;gap:6px;flex-wrap:wrap;}
        .btn{display:inline-flex;align-items:center;gap:4px;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:600;font-family:inherit;cursor:pointer;border:none;transition:all 0.15s;white-space:nowrap;}
        .btn:disabled{opacity:0.6;cursor:not-allowed;}
        .btn-primary{background:#10367D;color:white;}
        .btn-primary:hover:not(:disabled){background:#0B2960;}
        .btn-outline{background:white;color:#374151;border:1.5px solid #e2e8f0;}
        .btn-outline:hover:not(:disabled){background:#f8fafc;border-color:#cbd5e1;}
        .btn-ghost{background:#f1f5f9;color:#374151;border:none;}
        .btn-ghost:hover:not(:disabled){background:#e2e8f0;}
        .empty{text-align:center;padding:48px;color:#94a3b8;}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:200;padding:16px;}
        .modal{background:white;border-radius:14px;padding:24px;width:100%;max-width:400px;}
        .modal h3{font-size:17px;font-weight:700;color:#060E1C;margin-bottom:6px;}
        .modal p{font-size:13px;color:#64748b;line-height:1.6;margin-bottom:16px;}
        .modal-input{width:100%;padding:10px 13px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;outline:none;margin-bottom:14px;}
        .modal-input:focus{border-color:#10367D;}
        .modal-actions{display:flex;gap:8px;justify-content:flex-end;}
        .sb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;}
        @media(max-width:767px){.sb-overlay.show{display:block;}}
      `}</style>

      <div className={`sb-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)}/>

      <div className="layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
          <div className="sb-brand">
            <div className="sb-brand-icon"><svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#10367D" stroke="white" strokeWidth="7"/><path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"/><rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/><circle cx="70" cy="22" r="5.5" fill="#B5CE00"/><circle cx="73" cy="68" r="7.5" stroke="white" strokeWidth="4" fill="none"/><line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="white" strokeWidth="4" strokeLinecap="round"/></svg></div>
            <span className="sb-brand-name"><span style={{fontWeight:300}}>Saka</span><span style={{fontWeight:700}}>Boma</span></span>
          </div>
          <div className="sb-admin-badge">ADMIN PANEL</div>
          <nav className="sb-nav">
            {navItems.map(n => (
              <button
                key={n.id}
                className={`sb-item ${activeTab === n.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(n.id); setSidebarOpen(false); }}
              >
                <span className="material-icons-round" style={{fontSize:'18px'}}>{n.icon}</span>
                {n.label}
                {n.id === 'hostels' && pendingCount > 0 && (
                  <span className="sb-badge">{pendingCount}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="sb-footer">
            <div style={{fontSize:'12px',color:'#94a3b8',marginBottom:'10px',padding:'0 4px'}}>{user?.email}</div>
            <button className="sb-logout" onClick={logout}>
              <span className="material-icons-round" style={{fontSize:'17px',color:'#94a3b8'}}>logout</span>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <div className="topbar">
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span className="material-icons-round" style={{fontSize:'22px',color:'#64748b'}}>menu</span>
              </button>
              <span className="topbar-title">
                {activeTab === 'hostels' ? 'Hostel Management' : activeTab === 'users' ? 'User Management' : 'Bookings'}
              </span>
            </div>
            <button className="btn btn-outline" style={{fontSize:'12px',padding:'6px 12px'}} onClick={fetchData}>
              <span className="material-icons-round" style={{fontSize:'14px'}}>refresh</span>
              Refresh
            </button>
          </div>

          <div className="page-content">
            {/* Stats */}
            <div className="stats-row">
              {[
                {lbl:'Total Users',    val: stats.totalUsers || 0,    ico:'people'},
                {lbl:'Students',       val: stats.totalStudents || 0, ico:'school'},
                {lbl:'Hosts',          val: stats.totalHosts || 0,    ico:'person'},
                {lbl:'Total Hostels',  val: stats.totalHostels || 0,  ico:'apartment'},
                {lbl:'Pending Review', val: stats.pendingHostels || 0,ico:'hourglass_empty'},
                {lbl:'Total Bookings', val: stats.totalBookings || 0, ico:'book_online'},
              ].map(s => (
                <div key={s.lbl} className="stat">
                  <div className="stat-ico">
                    <span className="material-icons-round" style={{fontSize:'18px',color:'#10367D'}}>{s.ico}</span>
                  </div>
                  <div>
                    <div className="stat-lbl">{s.lbl}</div>
                    <div className="stat-val">{s.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {dataLoading ? (
              <div style={{textAlign:'center',padding:'60px',color:'#94a3b8'}}>
                <div style={{width:'28px',height:'28px',border:'3px solid #B8CAEB',borderTop:'3px solid #10367D',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 12px'}}/>
                Loading...
              </div>
            ) : (
              <>
                {/* HOSTELS TAB */}
                {activeTab === 'hostels' && (
                  <>
                    <div className="section-hdr">
                      All Hostels
                      <span style={{fontSize:'12px',color:'#64748b',fontWeight:'500'}}>{data.hostels.length} total</span>
                    </div>
                    <div className="table-wrap">
                      {data.hostels.length === 0 ? (
                        <div className="empty">No hostels found</div>
                      ) : (
                        <table>
                          <thead>
                            <tr>
                              <th>Hostel Name</th>
                              <th>Owner</th>
                              <th>City</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.hostels.map(h => (
                              <tr key={h.id}>
                                <td>
                                  <div style={{fontWeight:'600',color:'#060E1C'}}>{h.name}</div>
                                  <div style={{fontSize:'11px',color:'#94a3b8',marginTop:'2px'}}>{h.address}</div>
                                </td>
                                <td>
                                  <div>{h.users?.first_name} {h.users?.last_name}</div>
                                  <div style={{fontSize:'11px',color:'#94a3b8'}}>{h.users?.email}</div>
                                </td>
                                <td>{h.city}</td>
                                <td><StatusBadge status={h.status}/></td>
                                <td>
                                  <div className="act-wrap">
                                    {h.status === 'pending' && (
                                      <>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => approveHostel(h.id)}
                                          disabled={actionLoading}
                                        >
                                          <span className="material-icons-round" style={{fontSize:'13px'}}>check</span>
                                          Approve
                                        </button>
                                        <button
                                          className="btn btn-outline"
                                          onClick={() => { setModal({ type:'reject', item:h }); setRejectReason(''); }}
                                        >
                                          Reject
                                        </button>
                                      </>
                                    )}
                                    {h.status === 'approved' && (
                                      <button
                                        className="btn btn-outline"
                                        onClick={() => { setModal({ type:'reject', item:h }); setRejectReason(''); }}
                                      >
                                        Suspend
                                      </button>
                                    )}
                                    {h.status === 'rejected' && (
                                      <button
                                        className="btn btn-outline"
                                        onClick={() => approveHostel(h.id)}
                                        disabled={actionLoading}
                                      >
                                        Re-approve
                                      </button>
                                    )}
                                    <button
                                      className="btn btn-ghost"
                                      onClick={() => setModal({ type:'delete_hostel', item:h })}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </>
                )}

                {/* USERS TAB */}
                {activeTab === 'users' && (
                  <>
                    <div className="section-hdr">
                      All Users
                      <span style={{fontSize:'12px',color:'#64748b',fontWeight:'500'}}>{data.users.length} total</span>
                    </div>
                    <div className="table-wrap">
                      {data.users.length === 0 ? (
                        <div className="empty">No users found</div>
                      ) : (
                        <table>
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Role</th>
                              <th>Status</th>
                              <th>Joined</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.users.map(u => (
                              <tr key={u.id}>
                                <td>
                                  <div style={{fontWeight:'600',color:'#060E1C'}}>{u.first_name} {u.last_name}</div>
                                  <div style={{fontSize:'11px',color:'#94a3b8'}}>{u.email}</div>
                                </td>
                                <td><StatusBadge status={u.role}/></td>
                                <td><StatusBadge status={u.is_active ? 'active' : 'suspended'}/></td>
                                <td style={{color:'#64748b',fontSize:'12px'}}>
                                  {new Date(u.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
                                </td>
                                <td>
                                  <div className="act-wrap">
                                    {u.role !== 'admin' && (
                                      <>
                                        <button
                                          className="btn btn-outline"
                                          onClick={() => toggleUser(u.id, !u.is_active)}
                                        >
                                          {u.is_active ? 'Suspend' : 'Activate'}
                                        </button>
                                        <button
                                          className="btn btn-ghost"
                                          onClick={() => { setModal({ type:'reset_pw', item:u }); setResetPassword(''); }}
                                        >
                                          Reset PW
                                        </button>
                                        <button
                                          className="btn btn-ghost"
                                          onClick={() => setModal({ type:'delete_user', item:u })}
                                        >
                                          Delete
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </>
                )}

                {/* BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                  <>
                    <div className="section-hdr">
                      All Bookings
                      <span style={{fontSize:'12px',color:'#64748b',fontWeight:'500'}}>{data.bookings.length} total</span>
                    </div>
                    <div className="table-wrap">
                      {data.bookings.length === 0 ? (
                        <div className="empty">No bookings found</div>
                      ) : (
                        <table>
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Hostel</th>
                              <th>Room</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Payment</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.bookings.map(b => (
                              <tr key={b.id}>
                                <td>
                                  <div style={{fontWeight:'600',color:'#060E1C'}}>{b.users?.first_name} {b.users?.last_name}</div>
                                  <div style={{fontSize:'11px',color:'#94a3b8'}}>{b.users?.email}</div>
                                </td>
                                <td style={{fontWeight:'500'}}>{b.hostels?.name}</td>
                                <td style={{color:'#64748b',fontSize:'12px'}}>{b.rooms?.room_type}</td>
                                <td style={{fontWeight:'600'}}>TZS {Number(b.total_amount||0).toLocaleString()}</td>
                                <td><StatusBadge status={b.status}/></td>
                                <td><StatusBadge status={b.payment_status || 'unpaid'}/></td>
                                <td>
                                  {b.payment_status === 'pending_confirmation' && (
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => confirmPayment(b.id)}
                                    >
                                      Confirm Payment
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* REJECT HOSTEL MODAL */}
      {modal?.type === 'reject' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Reject Hostel</h3>
            <p>Rejecting <strong>{modal.item.name}</strong>. Optionally add a reason for the host.</p>
            <textarea
              className="modal-input"
              style={{resize:'vertical',minHeight:'80px'}}
              placeholder="Reason (optional)"
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setModal(null)} disabled={actionLoading}>Cancel</button>
              <button className="btn btn-primary" onClick={() => rejectHostel(modal.item.id)} disabled={actionLoading}>
                {actionLoading ? 'Rejecting...' : 'Reject Hostel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE HOSTEL MODAL */}
      {modal?.type === 'delete_hostel' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Hostel</h3>
            <p>Permanently delete <strong>{modal.item.name}</strong>? This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setModal(null)} disabled={actionLoading}>Cancel</button>
              <button className="btn btn-primary" onClick={() => deleteHostel(modal.item.id)} disabled={actionLoading}>
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE USER MODAL */}
      {modal?.type === 'delete_user' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete User</h3>
            <p>Permanently delete <strong>{modal.item.first_name} {modal.item.last_name}</strong>?</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setModal(null)} disabled={actionLoading}>Cancel</button>
              <button className="btn btn-primary" onClick={() => deleteUser(modal.item.id)} disabled={actionLoading}>
                {actionLoading ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {modal?.type === 'reset_pw' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Reset Password</h3>
            <p>Set a new password for <strong>{modal.item.first_name} {modal.item.last_name}</strong>.</p>
            <input
              type="password"
              className="modal-input"
              placeholder="New password (min 6 characters)"
              value={resetPassword}
              onChange={e => setResetPassword(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setModal(null)} disabled={actionLoading}>Cancel</button>
              <button className="btn btn-primary" onClick={() => doResetPassword(modal.item.id)} disabled={actionLoading}>
                {actionLoading ? 'Saving...' : 'Reset Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
