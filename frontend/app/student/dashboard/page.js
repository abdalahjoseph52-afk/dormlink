 'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const STATUS = {
  pending:              { bg:'#fef3c7', color:'#92400e', dot:'#f59e0b', label:'Pending' },
  confirmed:            { bg:'#d1fae5', color:'#065f46', dot:'#10b981', label:'Confirmed' },
  cancelled:            { bg:'#fee2e2', color:'#991b1b', dot:'#ef4444', label:'Cancelled' },
  unpaid:               { bg:'#fee2e2', color:'#991b1b', dot:'#ef4444', label:'Unpaid' },
  pending_confirmation: { bg:'#fef3c7', color:'#92400e', dot:'#f59e0b', label:'Verifying' },
  paid:                 { bg:'#d1fae5', color:'#065f46', dot:'#10b981', label:'Paid' },
  rejected:             { bg:'#fee2e2', color:'#991b1b', dot:'#ef4444', label:'Rejected' },
};

const Badge = ({ s }) => {
  const st = STATUS[s] || STATUS.pending;
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:st.bg,color:st.color,padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:'600',whiteSpace:'nowrap'}}>
      <span style={{width:'5px',height:'5px',borderRadius:'50%',background:st.dot,display:'inline-block'}}/>
      {st.label}
    </span>
  );
};

function Modal({ title, children, onClose }) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.5)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',backdropFilter:'blur(4px)'}} onClick={onClose}>
      <div style={{background:'white',borderRadius:'14px',width:'100%',maxWidth:'400px',overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',borderBottom:'1px solid #f1f5f9'}}>
          <span style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>{title}</span>
          <button onClick={onClose} style={{background:'#f1f5f9',border:'none',width:'26px',height:'26px',borderRadius:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b'}}>
            <span className="material-icons-round" style={{fontSize:'17px'}}>close</span>
          </button>
        </div>
        <div style={{padding:'18px'}}>{children}</div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [tab, setTab] = useState('bookings');
  const [sideOpen, setSideOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== 'student') { router.push('/login'); return; }
    fetchBookings();
  }, [user, loading]);

  const fetchBookings = async () => {
    setDataLoading(true);
    try {
      const res = await api.get('/student/bookings');
      setBookings(res.data.bookings || []);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const cancelBooking = async (id) => {
    setActionLoading(true);
    try {
      await api.patch(`/student/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings(); setModal(null);
    } catch (e) { toast.error(e.response?.data?.error || 'Could not cancel'); }
    finally { setActionLoading(false); }
  };

  const deleteAccount = async () => {
    if (!deletePassword) { toast.error('Enter your password'); return; }
    setActionLoading(true);
    try {
      await api.delete('/student/account', { data: { password: deletePassword } });
      toast.success('Account deleted');
      logout(); router.push('/');
    } catch (e) { toast.error(e.response?.data?.error || 'Could not delete account'); }
    finally { setActionLoading(false); }
  };

  const confirmed = bookings.filter(b => b.status === 'confirmed');
  const pending   = bookings.filter(b => b.status === 'pending');
  const paid      = bookings.filter(b => b.payment_status === 'paid');

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{width:'28px',height:'28px',border:'2px solid #e2e8f0',borderTop:'2px solid #2563eb',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  const SidebarContent = () => (
    <>
      <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'18px 16px 14px',borderBottom:'1px solid #f8fafc'}}>
        <div style={{width:'28px',height:'28px',background:'linear-gradient(135deg,#1d4ed8,#2563eb)',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{fontSize:'15px',fontWeight:'700',color:'#0f172a',letterSpacing:'-0.3px'}}>DormLink</span>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'14px 16px',borderBottom:'1px solid #f8fafc'}}>
        <div style={{width:'34px',height:'34px',background:'linear-gradient(135deg,#dbeafe,#bfdbfe)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'#1d4ed8',flexShrink:0}}>
          {user?.first_name?.[0]}{user?.last_name?.[0]}
        </div>
        <div>
          <div style={{fontSize:'13px',fontWeight:'600',color:'#0f172a'}}>{user?.first_name} {user?.last_name}</div>
          <div style={{fontSize:'10px',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.5px'}}>Student</div>
        </div>
      </div>

      <nav style={{padding:'10px 8px',flex:1}}>
        {[
          { id:'bookings', icon:'receipt_long', label:'My Bookings', count: pending.length },
          { id:'account',  icon:'manage_accounts', label:'Account' },
        ].map(n => (
          <button key={n.id} onClick={() => { setTab(n.id); setSideOpen(false); }}
            style={{display:'flex',alignItems:'center',gap:'8px',width:'100%',padding:'9px 10px',borderRadius:'8px',border:'none',background: tab===n.id ? '#eff6ff' : 'none',fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight: tab===n.id ? '600' : '500',color: tab===n.id ? '#1d4ed8' : '#64748b',cursor:'pointer',textAlign:'left',marginBottom:'2px',transition:'all 0.15s'}}>
            <span className="material-icons-round" style={{fontSize:'17px'}}>{n.icon}</span>
            <span style={{flex:1}}>{n.label}</span>
            {n.count > 0 && <span style={{background:'#ef4444',color:'white',borderRadius:'20px',padding:'1px 6px',fontSize:'10px',fontWeight:'700'}}>{n.count}</span>}
          </button>
        ))}
        <Link href="/" style={{display:'flex',alignItems:'center',gap:'8px',width:'100%',padding:'9px 10px',borderRadius:'8px',fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:'500',color:'#64748b',textDecoration:'none',transition:'all 0.15s'}}>
          <span className="material-icons-round" style={{fontSize:'17px'}}>search</span>
          Find Hostel
        </Link>
      </nav>

      <div style={{padding:'12px',borderTop:'1px solid #f8fafc'}}>
        <button onClick={logout} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',width:'100%',background:'none',border:'1px solid #f1f5f9',padding:'8px',borderRadius:'8px',fontSize:'12px',fontWeight:'500',color:'#94a3b8',cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'all 0.15s'}}>
          <span className="material-icons-round" style={{fontSize:'15px'}}>logout</span>
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Inter',sans-serif;background:#f8fafc;color:#0f172a;font-size:14px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
        .tbl-wrap{overflow-x:auto;}
        .tbl{width:100%;border-collapse:collapse;}
        .tbl th{text-align:left;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.5px;text-transform:uppercase;padding:10px 16px;background:#fafafa;border-bottom:1px solid #f1f5f9;white-space:nowrap;}
        .tbl td{padding:12px 16px;border-bottom:1px solid #f9fafb;vertical-align:middle;}
        .tbl tr:last-child td{border-bottom:none;}
        .tbl tr:hover td{background:#fafafa;}
        .act-btn{border:none;padding:5px 11px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:3px;white-space:nowrap;}
        .sidebar{width:236px;background:white;border-right:1px solid #f1f5f9;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.25s cubic-bezier(.4,0,.2,1);}
        @media(max-width:768px){
          .sidebar{transform:translateX(-100%);}
          .sidebar.open{transform:translateX(0);}
          .main{margin-left:0!important;}
          .hamburger{display:flex!important;}
          .content{padding:14px!important;}
          .topbar{padding:0 14px!important;}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .tbl-wrap{display:none;}
          .mobile-cards{display:block!important;}
        }
      `}</style>

      <div style={{display:'flex',minHeight:'100vh'}}>
        {sideOpen && <div onClick={() => setSideOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:99,backdropFilter:'blur(2px)'}}/>}

        <aside className={`sidebar ${sideOpen ? 'open' : ''}`}><SidebarContent/></aside>

        <main style={{marginLeft:'236px',flex:1,display:'flex',flexDirection:'column'}}>
          {/* TOPBAR */}
          <header style={{background:'white',borderBottom:'1px solid #f1f5f9',height:'54px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',position:'sticky',top:0,zIndex:50}} className="topbar">
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <button className="hamburger" onClick={() => setSideOpen(true)} style={{display:'none',background:'none',border:'none',cursor:'pointer',color:'#64748b',padding:'2px'}}>
                <span className="material-icons-round">menu</span>
              </button>
              <span style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>
                {tab === 'bookings' ? 'My Bookings' : 'Account Settings'}
              </span>
            </div>
            <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#0f172a',color:'white',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',textDecoration:'none'}}>
              <span className="material-icons-round" style={{fontSize:'15px'}}>search</span>
              Find Hostel
            </Link>
          </header>

          <div className="content" style={{padding:'24px',flex:1,animation:'fadeIn 0.3s ease'}}>
            {/* STATS */}
            <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
              {[
                { n: bookings.length, l:'Total Requests', icon:'layers', s:'' },
                { n: confirmed.length, l:'Confirmed', icon:'check_circle', s:'good' },
                { n: pending.length, l:'Pending', icon:'schedule', s: pending.length > 0 ? 'warn' : '' },
                { n: paid.length, l:'Paid', icon:'payments', s: paid.length > 0 ? 'good' : '' },
              ].map((s, i) => (
                <div key={i} style={{background: s.s==='good' ? '#f0fdf4' : s.s==='warn' ? '#fffbeb' : 'white', border:`1px solid ${s.s==='good'?'#d1fae5':s.s==='warn'?'#fde68a':'#f1f5f9'}`, borderRadius:'12px', padding:'16px', transition:'all 0.2s'}}>
                  <span className="material-icons-round" style={{fontSize:'18px',color: s.s==='good'?'#10b981':s.s==='warn'?'#f59e0b':'#94a3b8',marginBottom:'10px',display:'block'}}>{s.icon}</span>
                  <div style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',letterSpacing:'-0.5px'}}>{s.n}</div>
                  <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* BOOKINGS TAB */}
            {tab === 'bookings' && (
              <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:'12px',overflow:'hidden'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>Booking Requests</div>
                    <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{bookings.length} total</div>
                  </div>
                </div>

                {dataLoading ? (
                  <div style={{padding:'48px',textAlign:'center'}}><div style={{width:'24px',height:'24px',border:'2px solid #e2e8f0',borderTop:'2px solid #2563eb',borderRadius:'50%',animation:'spin 0.7s linear infinite',margin:'0 auto'}}/></div>
                ) : bookings.length === 0 ? (
                  <div style={{padding:'48px',textAlign:'center',color:'#94a3b8'}}>
                    <span className="material-icons-round" style={{fontSize:'40px',color:'#cbd5e1',display:'block',marginBottom:'12px'}}>apartment</span>
                    <div style={{fontWeight:'500',color:'#475569',marginBottom:'4px'}}>No bookings yet</div>
                    <div style={{fontSize:'13px',marginBottom:'16px'}}>Find a hostel near your university</div>
                    <Link href="/" style={{display:'inline-flex',alignItems:'center',background:'#0f172a',color:'white',padding:'9px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',textDecoration:'none'}}>Browse Hostels</Link>
                  </div>
                ) : (
                  <>
                    {/* Desktop table */}
                    <div className="tbl-wrap">
                      <table className="tbl">
                        <thead>
                          <tr><th>Property</th><th>Room</th><th>Semester</th><th>Total</th><th>Deposit</th><th>Status</th><th>Payment</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {bookings.map(b => {
                            const canCancel = b.status === 'pending' || (b.status === 'confirmed' && b.payment_status === 'unpaid');
                            const canPay = b.status === 'confirmed' && (b.payment_status === 'unpaid' || b.payment_status === 'rejected');
                            return (
                              <tr key={b.id}>
                                <td>
                                  <div style={{fontSize:'13px',fontWeight:'500',color:'#0f172a'}}>{b.hostels?.name}</div>
                                  <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{b.hostels?.city}</div>
                                </td>
                                <td>
                                  <div style={{fontSize:'13px',fontWeight:'500',color:'#0f172a'}}>{b.rooms?.room_label || b.rooms?.room_type}</div>
                                  <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{b.rooms?.room_type}</div>
                                </td>
                                <td style={{fontSize:'12px',color:'#94a3b8'}}>{b.semester}</td>
                                <td style={{fontSize:'13px',fontWeight:'500',color:'#0f172a'}}>TZS {parseFloat(b.total_amount||0).toLocaleString()}</td>
                                <td style={{color:'#1d4ed8',fontWeight:'600',fontSize:'13px'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</td>
                                <td><Badge s={b.status}/></td>
                                <td><Badge s={b.payment_status || 'unpaid'}/></td>
                                <td>
                                  <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
                                    {canPay && <Link href={`/payment/${b.id}`} className="act-btn" style={{background:'#dbeafe',color:'#1e3a8a'}}>Pay</Link>}
                                    {b.payment_status === 'pending_confirmation' && <span className="act-btn" style={{background:'#fef3c7',color:'#92400e',cursor:'default'}}>Verifying</span>}
                                    {canCancel && <button className="act-btn" style={{background:'#fee2e2',color:'#991b1b'}} onClick={() => setModal({ type:'cancel', id:b.id, name:b.hostels?.name })}>Cancel</button>}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="mobile-cards" style={{display:'none'}}>
                      {bookings.map(b => {
                        const canCancel = b.status === 'pending' || (b.status === 'confirmed' && b.payment_status === 'unpaid');
                        const canPay = b.status === 'confirmed' && (b.payment_status === 'unpaid' || b.payment_status === 'rejected');
                        return (
                          <div key={b.id} style={{padding:'16px',borderBottom:'1px solid #f1f5f9'}}>
                            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'10px'}}>
                              <div>
                                <div style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>{b.hostels?.name}</div>
                                <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{b.rooms?.room_label || b.rooms?.room_type} · {b.semester}</div>
                              </div>
                              <Badge s={b.status}/>
                            </div>
                            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',background:'#f8fafc',borderRadius:'8px',padding:'10px',marginBottom:'10px'}}>
                              <div><div style={{fontSize:'10px',color:'#94a3b8',textTransform:'uppercase',marginBottom:'3px'}}>Total</div><div style={{fontSize:'13px',fontWeight:'600'}}>TZS {parseFloat(b.total_amount||0).toLocaleString()}</div></div>
                              <div><div style={{fontSize:'10px',color:'#94a3b8',textTransform:'uppercase',marginBottom:'3px'}}>Deposit</div><div style={{fontSize:'13px',fontWeight:'600',color:'#1d4ed8'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</div></div>
                              <div><div style={{fontSize:'10px',color:'#94a3b8',textTransform:'uppercase',marginBottom:'3px'}}>Payment</div><Badge s={b.payment_status||'unpaid'}/></div>
                            </div>
                            <div style={{display:'flex',gap:'6px'}}>
                              {canPay && <Link href={`/payment/${b.id}`} className="act-btn" style={{background:'#dbeafe',color:'#1e3a8a',flex:1,justifyContent:'center'}}>Pay Deposit</Link>}
                              {b.payment_status==='pending_confirmation' && <span className="act-btn" style={{background:'#fef3c7',color:'#92400e',cursor:'default'}}>Verifying...</span>}
                              {canCancel && <button className="act-btn" style={{background:'#fee2e2',color:'#991b1b',flex:1,justifyContent:'center'}} onClick={() => setModal({ type:'cancel', id:b.id, name:b.hostels?.name })}>Cancel</button>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ACCOUNT TAB */}
            {tab === 'account' && (
              <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:'12px',overflow:'hidden'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #f1f5f9'}}>
                  <div style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>Account Settings</div>
                </div>
                <div style={{padding:'20px'}}>
                  <div style={{marginBottom:'24px',paddingBottom:'24px',borderBottom:'1px solid #f1f5f9'}}>
                    <div style={{fontSize:'12px',fontWeight:'600',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'14px'}}>Profile</div>
                    <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                      <div style={{width:'44px',height:'44px',background:'linear-gradient(135deg,#dbeafe,#bfdbfe)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:'700',color:'#1d4ed8'}}>{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
                      <div>
                        <div style={{fontWeight:'600',color:'#0f172a'}}>{user?.first_name} {user?.last_name}</div>
                        <div style={{fontSize:'13px',color:'#94a3b8'}}>{user?.email}</div>
                        <div style={{fontSize:'12px',color:'#94a3b8'}}>{user?.phone || 'No phone'}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{background:'#fff5f5',border:'1px solid #fee2e2',borderRadius:'10px',padding:'16px'}}>
                    <div style={{fontSize:'12px',fontWeight:'600',color:'#ef4444',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px'}}>Danger Zone</div>
                    <p style={{fontSize:'13px',color:'#64748b',marginBottom:'14px',lineHeight:'1.6'}}>Permanently delete your account and all booking history. This cannot be undone.</p>
                    <button onClick={() => setModal({ type:'delete_account' })} style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'white',border:'1.5px solid #ef4444',color:'ef4444',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'all 0.15s',color:'#ef4444'}}>
                      <span className="material-icons-round" style={{fontSize:'15px'}}>delete_forever</span>
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CANCEL MODAL */}
      {modal?.type === 'cancel' && (
        <Modal title="Cancel Booking" onClose={() => setModal(null)}>
          <div style={{textAlign:'center',padding:'8px 0 16px'}}>
            <span className="material-icons-round" style={{fontSize:'40px',color:'#f59e0b',display:'block',marginBottom:'12px'}}>warning</span>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:'1.7'}}>Cancel your booking request for <strong>{modal.name}</strong>?</p>
          </div>
          <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',marginTop:'14px'}}>
            <button onClick={() => setModal(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'500',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Keep It</button>
            <button disabled={actionLoading} onClick={() => cancelBooking(modal.id)} style={{background:'#ef4444',color:'white',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif',opacity:actionLoading?0.5:1}}>
              {actionLoading ? 'Cancelling...' : 'Yes, Cancel'}
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {modal?.type === 'delete_account' && (
        <Modal title="Delete Account" onClose={() => setModal(null)}>
          <div style={{textAlign:'center',padding:'8px 0 16px'}}>
            <span className="material-icons-round" style={{fontSize:'40px',color:'#ef4444',display:'block',marginBottom:'12px'}}>delete_forever</span>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:'1.7',marginBottom:'16px'}}>This will permanently delete your account. Confirm your password to continue.</p>
          </div>
          <input type="password" placeholder="Your password" value={deletePassword} onChange={e => setDeletePassword(e.target.value)}
            style={{width:'100%',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'10px 12px',fontSize:'14px',fontFamily:'Inter,sans-serif',outline:'none',background:'#f9fafb',marginBottom:'4px'}}/>
          <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',marginTop:'14px'}}>
            <button onClick={() => setModal(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'500',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Cancel</button>
            <button disabled={actionLoading || !deletePassword} onClick={deleteAccount} style={{background:'#ef4444',color:'white',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif',opacity:(actionLoading||!deletePassword)?0.5:1}}>
              {actionLoading ? 'Deleting...' : 'Delete Forever'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

