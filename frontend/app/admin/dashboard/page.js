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
  const [data, setData] = useState({ hostels: [], users: [], bookings: [] });
  const [dataLoading, setDataLoading] = useState(true);
  const [tab, setTab] = useState('hostels');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(null); // { type, item }
  const [resetPw, setResetPw] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // for security info modal

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== 'admin') { router.push('/login'); return; }
    fetchAll();
  }, [user, loading]);

  const fetchAll = async () => {
    setDataLoading(true);
    try {
      const [h, u, b] = await Promise.all([
        api.get('/admin/hostels'),
        api.get('/admin/users'),
        api.get('/admin/bookings').catch(() => ({ data: { bookings: [] } })),
      ]);
      setData({
        hostels: h.data.hostels || [],
        users: u.data.users || [],
        bookings: b.data.bookings || [],
      });
    } catch (e) { console.error(e); toast.error('Failed to load data'); }
    finally { setDataLoading(false); }
  };

  const doAction = async (fn) => {
    setActionLoading(true);
    try { await fn(); fetchAll(); setModal(null); setResetPw(''); setRejectReason(''); }
    catch (e) { toast.error(e.response?.data?.error || 'Action failed'); }
    finally { setActionLoading(false); }
  };

  const approveHostel = (id) => doAction(async () => {
    await api.patch(`/admin/hostels/${id}/approve`);
    toast.success('Hostel approved and is now live!');
  });

  const rejectHostel = (id) => doAction(async () => {
    await api.patch(`/admin/hostels/${id}/reject`, { reason: rejectReason });
    toast.success('Hostel rejected');
  });

  const deleteHostel = (id) => doAction(async () => {
    await api.delete(`/admin/hostels/${id}`);
    toast.success('Hostel deleted');
  });

  const deleteUser = (id) => doAction(async () => {
    await api.delete(`/admin/users/${id}`);
    toast.success('User deleted');
  });

  const resetPassword = (id) => doAction(async () => {
    if (!resetPw || resetPw.length < 6) { toast.error('Password too short'); return; }
    await api.patch(`/admin/users/${id}/reset-password`, { new_password: resetPw });
    toast.success('Password reset successfully');
  });

  const toggleUser = (id, current) => doAction(async () => {
    await api.patch(`/admin/users/${id}/toggle-status`, { is_active: !current });
    toast.success(!current ? 'User activated' : 'User suspended');
  });

  const confirmPayment = (bookingId) => doAction(async () => {
    await api.patch(`/admin/bookings/${bookingId}/confirm-payment`);
    toast.success('Payment confirmed! Student and host notified.');
  });

  const ss = (s) => ({
    pending:   { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
    approved:  { bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
    rejected:  { bg: '#fee2e2', color: '#7f1d1d', dot: '#ef4444' },
    confirmed: { bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
    cancelled: { bg: '#fee2e2', color: '#7f1d1d', dot: '#ef4444' },
    student:   { bg: '#eff6ff', color: '#1e3a8a', dot: '#3b82f6' },
    host:      { bg: '#f5f3ff', color: '#4c1d95', dot: '#8b5cf6' },
    admin:     { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
    paid:      { bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
    unpaid:    { bg: '#fee2e2', color: '#7f1d1d', dot: '#ef4444' },
    pending_confirmation: { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  }[s] || { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' });

  const pendingHostels = data.hostels.filter(h => h.status === 'pending');
  const pendingPayments = data.bookings.filter(b => b.payment_status === 'pending_confirmation');

  if (loading) return <Spinner/>;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{CSS}</style>

      <div className="layout">
        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}/>}

        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-logo">
            <div className="logo-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="logo-name">DormLink</div>
              <div className="logo-sub">Admin Console</div>
            </div>
          </div>

          <div className="sidebar-nav">
            <div className="nav-group-label">Overview</div>
            {[
              { id: 'hostels',  icon: 'apartment',   label: 'Properties',  count: pendingHostels.length },
              { id: 'users',    icon: 'group',        label: 'Users',       count: 0 },
              { id: 'bookings', icon: 'receipt_long', label: 'Bookings',    count: 0 },
              { id: 'payments', icon: 'payments',     label: 'Payments',    count: pendingPayments.length },
            ].map(n => (
              <button key={n.id} className={`nav-btn ${tab === n.id ? 'active' : ''}`}
                onClick={() => { setTab(n.id); setSidebarOpen(false); }}>
                <span className="material-icons-round nav-icon">{n.icon}</span>
                <span className="nav-label">{n.label}</span>
                {n.count > 0 && <span className="nav-count">{n.count}</span>}
              </button>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="admin-profile">
              <div className="admin-avatar">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
              <div className="admin-info">
                <div className="admin-name">{user?.first_name} {user?.last_name}</div>
                <div className="admin-role">Administrator</div>
              </div>
            </div>
            <button className="btn-signout" onClick={logout}>
              <span className="material-icons-round" style={{fontSize:'16px'}}>logout</span>
              Sign out
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          <header className="topbar">
            <div className="topbar-left">
              <button className="hamburger" onClick={() => setSidebarOpen(true)}>
                <span className="material-icons-round">menu</span>
              </button>
              <div className="topbar-title">
                {tab === 'hostels' && 'Properties'}
                {tab === 'users' && 'User Management'}
                {tab === 'bookings' && 'Bookings'}
                {tab === 'payments' && 'Payments'}
              </div>
            </div>
            <div className="topbar-alerts">
              {pendingHostels.length > 0 && (
                <div className="alert-chip" onClick={() => setTab('hostels')}>
                  <span className="alert-dot"/>
                  {pendingHostels.length} pending approval
                </div>
              )}
              {pendingPayments.length > 0 && (
                <div className="alert-chip orange" onClick={() => setTab('payments')}>
                  <span className="alert-dot orange"/>
                  {pendingPayments.length} pending payment
                </div>
              )}
            </div>
          </header>

          <div className="page-content">
            {/* STATS ROW */}
            <div className="stats-row">
              {[
                { label: 'Total Properties', value: data.hostels.length, icon: 'apartment', sub: `${pendingHostels.length} pending` },
                { label: 'Total Users', value: data.users.length, icon: 'group', sub: `${data.users.filter(u=>u.role==='host').length} hosts` },
                { label: 'Total Bookings', value: data.bookings.length, icon: 'receipt_long', sub: 'All time' },
                { label: 'Pending Payments', value: pendingPayments.length, icon: 'payments', sub: 'Need confirmation', urgent: pendingPayments.length > 0 },
              ].map((s, i) => (
                <div key={i} className={`stat-tile ${s.urgent ? 'urgent' : ''}`}>
                  <div className="stat-icon-wrap">
                    <span className="material-icons-round stat-icon">{s.icon}</span>
                  </div>
                  <div className="stat-num">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* PROPERTIES TAB */}
            {tab === 'hostels' && (
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">All Properties</div>
                  <div className="panel-sub">{pendingHostels.length} awaiting review</div>
                </div>
                <div className="table-scroll">
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>Property</th><th>Host</th><th>University</th><th>City</th><th>Rooms</th><th>Status</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataLoading ? <tr><td colSpan="7" className="empty">Loading...</td></tr>
                      : data.hostels.length === 0 ? <tr><td colSpan="7" className="empty">No properties yet</td></tr>
                      : data.hostels.map(h => {
                        const st = ss(h.status);
                        return (
                          <tr key={h.id} className={h.status === 'pending' ? 'highlight' : ''}>
                            <td>
                              <div className="cell-primary">{h.name}</div>
                              <div className="cell-secondary">{h.address}</div>
                            </td>
                            <td>
                              <div className="cell-primary">{h.users?.first_name} {h.users?.last_name}</div>
                              <div className="cell-secondary">{h.users?.email}</div>
                            </td>
                            <td className="cell-secondary">{h.universities?.name || '—'}</td>
                            <td className="cell-secondary">{h.city}</td>
                            <td className="cell-secondary">{h.rooms?.length || 0}</td>
                            <td>
                              <span className="badge" style={{background:st.bg,color:st.color}}>
                                <span style={{width:'6px',height:'6px',borderRadius:'50%',background:st.dot,display:'inline-block',marginRight:'5px'}}/>
                                {h.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-row">
                                {h.status === 'pending' && <>
                                  <button className="act-btn green" onClick={() => approveHostel(h.id)}>Approve</button>
                                  <button className="act-btn red" onClick={() => setModal({ type: 'reject_hostel', item: h })}>Reject</button>
                                </>}
                                <button className="act-btn gray" onClick={() => setModal({ type: 'view_host_security', item: h.users })}>
                                  <span className="material-icons-round" style={{fontSize:'14px'}}>shield</span>
                                </button>
                                <button className="act-btn red" onClick={() => setModal({ type: 'delete_hostel', item: h })}>
                                  <span className="material-icons-round" style={{fontSize:'14px'}}>delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* USERS TAB */}
            {tab === 'users' && (
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">All Users</div>
                  <div className="panel-sub">{data.users.length} registered accounts</div>
                </div>
                <div className="table-scroll">
                  <table className="tbl">
                    <thead>
                      <tr><th>User</th><th>Phone</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {dataLoading ? <tr><td colSpan="6" className="empty">Loading...</td></tr>
                      : data.users.map(u => {
                        const rt = ss(u.role);
                        return (
                          <tr key={u.id}>
                            <td>
                              <div className="user-cell">
                                <div className="user-av">{u.first_name?.[0]}{u.last_name?.[0]}</div>
                                <div>
                                  <div className="cell-primary">{u.first_name} {u.last_name}</div>
                                  <div className="cell-secondary">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="cell-secondary">{u.phone || '—'}</td>
                            <td><span className="badge" style={{background:rt.bg,color:rt.color}}>{u.role}</span></td>
                            <td>
                              <span className="badge" style={{background: u.is_active===false?'#fee2e2':'#d1fae5', color: u.is_active===false?'#7f1d1d':'#065f46'}}>
                                <span style={{width:'6px',height:'6px',borderRadius:'50%',background: u.is_active===false?'#ef4444':'#10b981',display:'inline-block',marginRight:'5px'}}/>
                                {u.is_active === false ? 'Suspended' : 'Active'}
                              </span>
                            </td>
                            <td className="cell-secondary">{u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB') : '—'}</td>
                            <td>
                              <div className="action-row">
                                {u.role === 'host' && (
                                  <button className="act-btn gray" onClick={() => setModal({ type: 'view_host_security', item: u })} title="View NIDA/TIN">
                                    <span className="material-icons-round" style={{fontSize:'14px'}}>shield</span>
                                  </button>
                                )}
                                <button className="act-btn gray" onClick={() => setModal({ type: 'reset_password', item: u })} title="Reset Password">
                                  <span className="material-icons-round" style={{fontSize:'14px'}}>lock_reset</span>
                                </button>
                                <button className="act-btn gray" onClick={() => toggleUser(u.id, u.is_active !== false)} title={u.is_active===false?'Activate':'Suspend'}>
                                  <span className="material-icons-round" style={{fontSize:'14px'}}>{u.is_active===false?'check_circle':'block'}</span>
                                </button>
                                <button className="act-btn red" onClick={() => setModal({ type: 'delete_user', item: u })} title="Delete User">
                                  <span className="material-icons-round" style={{fontSize:'14px'}}>delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {tab === 'bookings' && (
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">All Bookings</div>
                  <div className="panel-sub">{data.bookings.length} total</div>
                </div>
                <div className="table-scroll">
                  <table className="tbl">
                    <thead>
                      <tr><th>Student</th><th>Property</th><th>Room</th><th>Semester</th><th>Deposit</th><th>Status</th><th>Payment</th></tr>
                    </thead>
                    <tbody>
                      {dataLoading ? <tr><td colSpan="7" className="empty">Loading...</td></tr>
                      : data.bookings.length === 0 ? <tr><td colSpan="7" className="empty">No bookings yet</td></tr>
                      : data.bookings.map(b => {
                        const bs = ss(b.status);
                        const ps = ss(b.payment_status || 'unpaid');
                        return (
                          <tr key={b.id}>
                            <td><div className="cell-primary">{b.users?.first_name} {b.users?.last_name}</div><div className="cell-secondary">{b.users?.email}</div></td>
                            <td className="cell-primary">{b.hostels?.name}</td>
                            <td className="cell-secondary">{b.rooms?.room_type}</td>
                            <td className="cell-secondary">{b.semester}</td>
                            <td><div className="cell-primary" style={{color:'#1d4ed8'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</div></td>
                            <td><span className="badge" style={{background:bs.bg,color:bs.color}}>{b.status}</span></td>
                            <td><span className="badge" style={{background:ps.bg,color:ps.color}}>{b.payment_status || 'unpaid'}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {tab === 'payments' && (
              <div className="panel">
                <div className="panel-head">
                  <div className="panel-title">Payment Verifications</div>
                  <div className="panel-sub">{pendingPayments.length} waiting for admin confirmation</div>
                </div>
                <div className="table-scroll">
                  <table className="tbl">
                    <thead>
                      <tr><th>Student</th><th>Property</th><th>Semester</th><th>Deposit</th><th>Method</th><th>Transaction ID</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {pendingPayments.length === 0 ? (
                        <tr><td colSpan="7" className="empty">
                          <span className="material-icons-round" style={{fontSize:'32px',color:'#d1fae5',display:'block',margin:'0 auto 8px'}}>check_circle</span>
                          All payments verified
                        </td></tr>
                      ) : pendingPayments.map(b => (
                        <tr key={b.id} className="highlight">
                          <td><div className="cell-primary">{b.users?.first_name} {b.users?.last_name}</div><div className="cell-secondary">{b.users?.email}</div></td>
                          <td className="cell-primary">{b.hostels?.name}</td>
                          <td className="cell-secondary">{b.semester}</td>
                          <td><div className="cell-primary" style={{color:'#1d4ed8'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</div></td>
                          <td className="cell-secondary" style={{textTransform:'capitalize'}}>{b.payment_method}</td>
                          <td><span className="txid">{b.transaction_id}</span></td>
                          <td>
                            <div className="action-row">
                              <button className="act-btn green" onClick={() => confirmPayment(b.id)}>Confirm</button>
                              <button className="act-btn red" onClick={() => setModal({ type: 'reject_payment', item: b })}>Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── MODALS ─────────────────────────── */}

      {/* DELETE HOSTEL */}
      {modal?.type === 'delete_hostel' && (
        <Modal title="Delete Property" onClose={() => setModal(null)}>
          <div className="modal-warn">
            <span className="material-icons-round" style={{fontSize:'32px',color:'#ef4444'}}>warning</span>
            <p>Are you sure you want to permanently delete <strong>{modal.item.name}</strong>? This cannot be undone and all bookings will be affected.</p>
          </div>
          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-btn-danger" disabled={actionLoading} onClick={() => deleteHostel(modal.item.id)}>
              {actionLoading ? 'Deleting...' : 'Delete Property'}
            </button>
          </div>
        </Modal>
      )}

      {/* REJECT HOSTEL */}
      {modal?.type === 'reject_hostel' && (
        <Modal title="Reject Property" onClose={() => setModal(null)}>
          <p style={{fontSize:'14px',color:'#64748b',marginBottom:'14px'}}>Provide a reason for rejection. This will be sent to the host.</p>
          <textarea className="modal-textarea" placeholder="Reason for rejection (optional)..."
            value={rejectReason} onChange={e => setRejectReason(e.target.value)}/>
          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-btn-danger" disabled={actionLoading} onClick={() => rejectHostel(modal.item.id)}>
              {actionLoading ? 'Rejecting...' : 'Reject Property'}
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE USER */}
      {modal?.type === 'delete_user' && (
        <Modal title="Delete User Account" onClose={() => setModal(null)}>
          <div className="modal-warn">
            <span className="material-icons-round" style={{fontSize:'32px',color:'#ef4444'}}>warning</span>
            <p>Delete <strong>{modal.item.first_name} {modal.item.last_name}</strong> ({modal.item.email})? All their data will be permanently removed.</p>
          </div>
          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-btn-danger" disabled={actionLoading} onClick={() => deleteUser(modal.item.id)}>
              {actionLoading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </Modal>
      )}

      {/* RESET PASSWORD */}
      {modal?.type === 'reset_password' && (
        <Modal title={`Reset Password — ${modal.item.first_name}`} onClose={() => setModal(null)}>
          <p style={{fontSize:'14px',color:'#64748b',marginBottom:'14px'}}>Enter a new password for this user. They will be notified.</p>
          <input className="modal-input" type="text" placeholder="New password (min 6 chars)"
            value={resetPw} onChange={e => setResetPw(e.target.value)}/>
          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-btn-primary" disabled={actionLoading || resetPw.length < 6} onClick={() => resetPassword(modal.item.id)}>
              {actionLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </Modal>
      )}

      {/* VIEW HOST SECURITY INFO */}
      {modal?.type === 'view_host_security' && (
        <Modal title="Host Security Information" onClose={() => setModal(null)}>
          <div className="security-grid">
            {[
              { label: 'Full Name', value: `${modal.item?.first_name || ''} ${modal.item?.last_name || ''}`, icon: 'person' },
              { label: 'Email', value: modal.item?.email || '—', icon: 'mail' },
              { label: 'Phone', value: modal.item?.phone || '—', icon: 'phone' },
              { label: 'NIDA Number', value: modal.item?.nida_number || 'Not provided', icon: 'badge', highlight: !modal.item?.nida_number },
              { label: 'TIN Number', value: modal.item?.tin_number || 'Not provided (optional)', icon: 'receipt', highlight: false },
              { label: 'Address', value: modal.item?.address || '—', icon: 'home' },
            ].map((f, i) => (
              <div key={i} className={`security-field ${f.highlight ? 'missing' : ''}`}>
                <div className="security-field-label">
                  <span className="material-icons-round" style={{fontSize:'14px',color:'#64748b'}}>{f.icon}</span>
                  {f.label}
                </div>
                <div className={`security-field-value ${f.highlight ? 'missing-text' : ''}`}>{f.value}</div>
              </div>
            ))}
          </div>
          <div className="modal-actions" style={{marginTop:'16px'}}>
            <button className="modal-btn-cancel" onClick={() => setModal(null)}>Close</button>
          </div>
        </Modal>
      )}

      {/* REJECT PAYMENT */}
      {modal?.type === 'reject_payment' && (
        <Modal title="Reject Payment" onClose={() => setModal(null)}>
          <p style={{fontSize:'14px',color:'#64748b',marginBottom:'14px'}}>
            Rejecting payment from <strong>{modal.item.users?.first_name}</strong> for TZS {parseFloat(modal.item.deposit_amount||0).toLocaleString()}
          </p>
          <textarea className="modal-textarea" placeholder="Reason (e.g. Transaction not found)..."
            value={rejectReason} onChange={e => setRejectReason(e.target.value)}/>
          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-btn-danger" disabled={actionLoading} onClick={() => doAction(async () => {
              await api.patch(`/payments/reject/${modal.item.id}`, { reason: rejectReason });
              toast.success('Payment rejected, student notified');
            })}>
              {actionLoading ? 'Rejecting...' : 'Reject Payment'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>
            <span className="material-icons-round" style={{fontSize:'18px'}}>close</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{width:'32px',height:'32px',border:'2px solid #e2e8f0',borderTop:'2px solid #2563eb',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;background:#f8fafc;color:#0f172a;font-size:14px;}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}

  .layout{display:flex;min-height:100vh;}

  /* SIDEBAR */
  .sidebar{width:240px;background:white;border-right:1px solid #f1f5f9;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.25s cubic-bezier(0.4,0,0.2,1);}
  .sidebar-logo{display:flex;align-items:center;gap:10px;padding:20px 16px;border-bottom:1px solid #f1f5f9;}
  .logo-mark{width:32px;height:32px;background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .logo-name{font-size:15px;font-weight:700;color:#0f172a;letter-spacing:-0.3px;}
  .logo-sub{font-size:10px;color:#94a3b8;font-weight:500;margin-top:1px;text-transform:uppercase;letter-spacing:0.5px;}
  .sidebar-nav{padding:12px 8px;flex:1;overflow-y:auto;}
  .nav-group-label{font-size:10px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;padding:0 8px;margin:8px 0 6px;}
  .nav-btn{display:flex;align-items:center;gap:8px;width:100%;padding:9px 10px;border-radius:8px;border:none;background:none;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:#64748b;cursor:pointer;transition:all 0.15s;text-align:left;}
  .nav-btn:hover{background:#f8fafc;color:#0f172a;}
  .nav-btn.active{background:#eff6ff;color:#1d4ed8;font-weight:600;}
  .nav-icon{font-size:18px!important;opacity:0.8;}
  .nav-btn.active .nav-icon{opacity:1;}
  .nav-label{flex:1;}
  .nav-count{background:#ef4444;color:white;border-radius:20px;padding:1px 7px;font-size:10px;font-weight:700;min-width:18px;text-align:center;}
  .sidebar-footer{padding:12px;border-top:1px solid #f1f5f9;}
  .admin-profile{display:flex;align-items:center;gap:8px;padding:10px;background:#f8fafc;border-radius:10px;margin-bottom:8px;}
  .admin-avatar{width:32px;height:32px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0;}
  .admin-name{font-size:12px;font-weight:600;color:#0f172a;}
  .admin-role{font-size:10px;color:#94a3b8;}
  .btn-signout{width:100%;display:flex;align-items:center;justify-content:center;gap:6px;background:none;border:1px solid #e2e8f0;padding:8px;border-radius:8px;font-size:12px;font-weight:500;color:#64748b;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .btn-signout:hover{border-color:#ef4444;color:#ef4444;background:#fef2f2;}

  /* MAIN */
  .main{margin-left:240px;flex:1;min-height:100vh;display:flex;flex-direction:column;}

  /* TOPBAR */
  .topbar{background:white;border-bottom:1px solid #f1f5f9;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:50;}
  .topbar-left{display:flex;align-items:center;gap:12px;}
  .topbar-title{font-size:15px;font-weight:600;color:#0f172a;}
  .hamburger{display:none;background:none;border:none;cursor:pointer;color:#64748b;padding:4px;}
  .topbar-alerts{display:flex;align-items:center;gap:8px;}
  .alert-chip{display:flex;align-items:center;gap:6px;background:#fef3c7;color:#92400e;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;}
  .alert-chip:hover{background:#fde68a;}
  .alert-chip.orange{background:#fef3c7;}
  .alert-dot{width:6px;height:6px;border-radius:50%;background:#f59e0b;display:inline-block;animation:pulse 2s infinite;}
  .alert-dot.orange{background:#f59e0b;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}

  /* CONTENT */
  .page-content{padding:24px;flex:1;animation:fadeIn 0.3s ease;}

  /* STATS */
  .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
  .stat-tile{background:white;border:1px solid #f1f5f9;border-radius:12px;padding:18px 16px;transition:all 0.2s;}
  .stat-tile:hover{border-color:#e2e8f0;box-shadow:0 2px 12px rgba(0,0,0,0.04);}
  .stat-tile.urgent{border-color:#fde68a;background:#fffbeb;}
  .stat-icon-wrap{width:36px;height:36px;background:#f1f5f9;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
  .stat-tile.urgent .stat-icon-wrap{background:#fef3c7;}
  .stat-icon{font-size:18px!important;color:#64748b;}
  .stat-tile.urgent .stat-icon{color:#f59e0b;}
  .stat-num{font-size:26px;font-weight:700;color:#0f172a;letter-spacing:-0.5px;}
  .stat-label{font-size:12px;font-weight:600;color:#64748b;margin-top:2px;}
  .stat-sub{font-size:11px;color:#94a3b8;margin-top:3px;}

  /* PANEL */
  .panel{background:white;border:1px solid #f1f5f9;border-radius:12px;overflow:hidden;}
  .panel-head{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:baseline;gap:12px;}
  .panel-title{font-size:14px;font-weight:600;color:#0f172a;}
  .panel-sub{font-size:12px;color:#94a3b8;}

  /* TABLE */
  .table-scroll{overflow-x:auto;}
  .tbl{width:100%;border-collapse:collapse;}
  .tbl th{text-align:left;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;padding:11px 16px;background:#fafafa;border-bottom:1px solid #f1f5f9;white-space:nowrap;}
  .tbl td{padding:13px 16px;border-bottom:1px solid #f9fafb;vertical-align:middle;}
  .tbl tr:last-child td{border-bottom:none;}
  .tbl tr:hover td{background:#fafafa;}
  .tbl tr.highlight td{background:#fffbeb;}
  .tbl tr.highlight:hover td{background:#fef3c7;}

  .cell-primary{font-size:13px;font-weight:500;color:#0f172a;}
  .cell-secondary{font-size:12px;color:#94a3b8;margin-top:2px;}
  td.cell-primary{font-size:13px;font-weight:500;color:#0f172a;}
  td.cell-secondary{font-size:12px;color:#94a3b8;}

  .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;}
  .txid{font-family:monospace;font-size:12px;background:#f1f5f9;padding:3px 8px;border-radius:6px;color:#0f172a;font-weight:600;}

  .user-cell{display:flex;align-items:center;gap:8px;}
  .user-av{width:30px;height:30px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#1e3a8a;flex-shrink:0;}

  .action-row{display:flex;align-items:center;gap:4px;}
  .act-btn{border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;display:flex;align-items:center;gap:3px;white-space:nowrap;}
  .act-btn.green{background:#d1fae5;color:#065f46;}
  .act-btn.green:hover{background:#a7f3d0;}
  .act-btn.red{background:#fee2e2;color:#7f1d1d;}
  .act-btn.red:hover{background:#fecaca;}
  .act-btn.gray{background:#f1f5f9;color:#475569;}
  .act-btn.gray:hover{background:#e2e8f0;}

  .empty{text-align:center;padding:48px;color:#94a3b8;font-size:13px;}

  /* MODAL */
  .overlay,.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);animation:fadeIn 0.15s ease;}
  .modal-box{background:white;border-radius:16px;width:100%;max-width:480px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.2);}
  .modal-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #f1f5f9;}
  .modal-title{font-size:15px;font-weight:600;color:#0f172a;}
  .modal-close{background:#f1f5f9;border:none;width:28px;height:28px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;transition:all 0.15s;}
  .modal-close:hover{background:#e2e8f0;}
  .modal-body{padding:20px;}
  .modal-warn{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding:8px 0 16px;}
  .modal-warn p{font-size:14px;color:#475569;line-height:1.7;}
  .modal-textarea{width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px 12px;font-size:13px;font-family:'Inter',sans-serif;outline:none;resize:vertical;min-height:80px;background:#f9fafb;transition:border 0.15s;}
  .modal-textarea:focus{border-color:#2563eb;background:white;}
  .modal-input{width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px 12px;font-size:14px;font-family:'Inter',sans-serif;outline:none;background:#f9fafb;transition:border 0.15s;margin-bottom:4px;}
  .modal-input:focus{border-color:#2563eb;background:white;}
  .modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;}
  .modal-btn-cancel{background:#f1f5f9;color:#475569;border:none;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-btn-cancel:hover{background:#e2e8f0;}
  .modal-btn-danger{background:#ef4444;color:white;border:none;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-btn-danger:hover{background:#dc2626;}
  .modal-btn-danger:disabled{opacity:0.5;cursor:not-allowed;}
  .modal-btn-primary{background:#2563eb;color:white;border:none;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-btn-primary:hover{background:#1d4ed8;}
  .modal-btn-primary:disabled{opacity:0.5;cursor:not-allowed;}

  /* SECURITY GRID */
  .security-grid{display:flex;flex-direction:column;gap:10px;}
  .security-field{background:#f8fafc;border:1px solid #f1f5f9;border-radius:10px;padding:12px 14px;}
  .security-field.missing{border-color:#fde68a;background:#fffbeb;}
  .security-field-label{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;}
  .security-field-value{font-size:14px;font-weight:500;color:#0f172a;}
  .security-field-value.missing-text{color:#92400e;font-style:italic;}

  @media(max-width:1024px){.stats-row{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:768px){
    .sidebar{transform:translateX(-100%);}
    .sidebar.open{transform:translateX(0);}
    .main{margin-left:0;}
    .hamburger{display:flex;}
    .page-content{padding:16px;}
    .topbar{padding:0 16px;}
    .stats-row{grid-template-columns:repeat(2,1fr);gap:10px;}
    .stat-num{font-size:20px;}
    .topbar-alerts{display:none;}
  }
`;
