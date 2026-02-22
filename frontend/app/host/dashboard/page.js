
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AMENITIES = ['WiFi','Water','Security','Kitchen','Parking','Laundry','Generator','CCTV','Gym','Study Room','Hot Shower','Furnished'];
const ROOM_TYPES = ['Single Room','Double Room','Triple Room','Quad Room','Self Contained','Studio'];
const ROOM_CAPS  = { 'Single Room':1,'Double Room':2,'Triple Room':3,'Quad Room':4,'Self Contained':2,'Studio':1 };

const STATUS = {
  pending:              { bg:'#fef3c7', color:'#92400e', dot:'#f59e0b', label:'Pending' },
  confirmed:            { bg:'#d1fae5', color:'#065f46', dot:'#10b981', label:'Confirmed' },
  cancelled:            { bg:'#fee2e2', color:'#991b1b', dot:'#ef4444', label:'Cancelled' },
  unpaid:               { bg:'#fee2e2', color:'#991b1b', dot:'#ef4444', label:'Unpaid' },
  pending_confirmation: { bg:'#fef3c7', color:'#92400e', dot:'#f59e0b', label:'Verifying' },
  paid:                 { bg:'#d1fae5', color:'#065f46', dot:'#10b981', label:'Paid' },
  approved:             { bg:'#d1fae5', color:'#065f46', dot:'#10b981', label:'Live' },
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

const Btn = ({ children, color='gray', onClick, disabled, style={} }) => {
  const colors = {
    gray:  { bg:'#f1f5f9', hover:'#e2e8f0', color:'#475569' },
    blue:  { bg:'#dbeafe', hover:'#bfdbfe', color:'#1e3a8a' },
    green: { bg:'#d1fae5', hover:'#a7f3d0', color:'#065f46' },
    red:   { bg:'#fee2e2', hover:'#fecaca', color:'#991b1b' },
    dark:  { bg:'#0f172a', hover:'#1e293b', color:'white' },
  };
  const c = colors[color] || colors.gray;
  return (
    <button onClick={onClick} disabled={disabled}
      style={{border:'none',padding:'5px 11px',borderRadius:'6px',fontSize:'11px',fontWeight:'600',cursor:disabled?'not-allowed':'pointer',fontFamily:'Inter,sans-serif',background:c.bg,color:c.color,display:'inline-flex',alignItems:'center',gap:'3px',whiteSpace:'nowrap',opacity:disabled?0.5:1,transition:'all 0.15s',...style}}>
      {children}
    </button>
  );
};

const Input = ({ label, hint, ...props }) => (
  <div style={{marginBottom:'14px'}}>
    <label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>
      {label}{hint && <span style={{fontWeight:'400',color:'#94a3b8'}}> — {hint}</span>}
    </label>
    <input style={{width:'100%',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'9px 12px',fontSize:'13px',fontFamily:'Inter,sans-serif',outline:'none',background:'#f9fafb',color:'#0f172a',transition:'border 0.15s'}} {...props}/>
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div style={{marginBottom:'14px'}}>
    <label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'5px'}}>{label}</label>
    <textarea style={{width:'100%',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'9px 12px',fontSize:'13px',fontFamily:'Inter,sans-serif',outline:'none',background:'#f9fafb',color:'#0f172a',resize:'vertical',minHeight:'72px'}} {...props}/>
  </div>
);

function Modal({ title, big, children, onClose }) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.55)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',backdropFilter:'blur(4px)'}} onClick={onClose}>
      <div style={{background:'white',borderRadius:'14px',width:'100%',maxWidth: big ? '620px' : '400px',overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'15px 18px',borderBottom:'1px solid #f1f5f9'}}>
          <span style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>{title}</span>
          <button onClick={onClose} style={{background:'#f1f5f9',border:'none',width:'26px',height:'26px',borderRadius:'6px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b'}}>
            <span className="material-icons-round" style={{fontSize:'17px'}}>close</span>
          </button>
        </div>
        <div style={{padding:'18px',maxHeight:'80vh',overflowY:'auto'}}>{children}</div>
      </div>
    </div>
  );
}

export default function HostDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [hostels, setHostels]       = useState([]);
  const [bookings, setBookings]     = useState([]);
  const [tab, setTab]               = useState('hostels');
  const [roomView, setRoomView]     = useState(null);
  const [sideOpen, setSideOpen]     = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modal, setModal]           = useState(null);
  const [deletePw, setDeletePw]     = useState('');

  const emptyHostel = { name:'', city:'', address:'', description:'', university_id:'', distance_from_university:'', amenities:[], transport_notes:'', latitude:'', longitude:'' };
  const emptyRoom   = { room_label:'', room_type:'Single Room', floor:'', capacity:1, price_per_semester:'', available_count:1, description:'', features:[], is_full:false };

  const [hForm, setHForm] = useState(emptyHostel);
  const [rForm, setRForm] = useState(emptyRoom);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== 'host') { router.push('/login'); return; }
    fetchAll();
  }, [user, loading]);

  const fetchAll = async () => {
    setDataLoading(true);
    try {
      const [h, b] = await Promise.all([
        api.get('/host/hostels'),
        api.get('/host/bookings').catch(() => ({ data: { bookings: [] } })),
      ]);
      setHostels(h.data.hostels || []);
      setBookings(b.data.bookings || []);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const saveHostel = async () => {
    if (!hForm.name || !hForm.city || !hForm.address) { toast.error('Name, city and address required'); return; }
    setActionLoading(true);
    try {
      if (modal?.hostelId) { await api.patch(`/host/hostels/${modal.hostelId}`, hForm); toast.success('Hostel updated'); }
      else { await api.post('/host/hostels', hForm); toast.success('Submitted for admin review!'); }
      fetchAll(); setModal(null);
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const saveRoom = async () => {
    if (!rForm.room_label || !rForm.price_per_semester) { toast.error('Room label and price required'); return; }
    setActionLoading(true);
    try {
      if (modal?.roomId) { await api.patch(`/host/rooms/${modal.roomId}`, rForm); toast.success('Room updated'); }
      else { await api.post(`/host/hostels/${modal.forHostel}/rooms`, rForm); toast.success('Room added!'); }
      fetchAll(); setModal(null);
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const removeRoom = async (id) => {
    if (!confirm('Delete this room? This cannot be undone.')) return;
    setActionLoading(true);
    try { await api.delete(`/host/rooms/${id}`); toast.success('Room deleted'); fetchAll(); }
    catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const doBooking = async (id, action) => {
    setActionLoading(true);
    try {
      await api.patch(`/host/bookings/${id}/${action}`);
      toast.success(action === 'confirm' ? 'Booking confirmed! Student notified.' : 'Booking rejected');
      fetchAll();
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const doDeleteAccount = async () => {
    if (!deletePw) { toast.error('Enter password'); return; }
    setActionLoading(true);
    try { await api.delete('/host/account', { data: { password: deletePw } }); logout(); router.push('/'); }
    catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const pendingB = bookings.filter(b => b.status === 'pending');
  const selectedHostel = hostels.find(h => h.id === roomView);

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{width:'28px',height:'28px',border:'2px solid #e2e8f0',borderTop:'2px solid #2563eb',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
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
        .sidebar{width:236px;background:white;border-right:1px solid #f1f5f9;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.25s cubic-bezier(.4,0,.2,1);}
        .tbl th{text-align:left;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.5px;text-transform:uppercase;padding:10px 16px;background:#fafafa;border-bottom:1px solid #f1f5f9;white-space:nowrap;}
        .tbl td{padding:12px 16px;border-bottom:1px solid #f9fafb;vertical-align:middle;}
        .tbl{width:100%;border-collapse:collapse;}
        .tbl tr:last-child td{border-bottom:none;}
        .tbl tr:hover td{background:#fafafa;}
        .tbl tr.hl td{background:#fffbeb;}
        .rooms-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;}
        @media(max-width:768px){
          .sidebar{transform:translateX(-100%);}
          .sidebar.open{transform:translateX(0);}
          .main-area{margin-left:0!important;}
          .hamburger{display:flex!important;}
          .content{padding:14px!important;}
          .topbar{padding:0 14px!important;}
          .stats-row{grid-template-columns:repeat(2,1fr)!important;}
          .tbl-wrap{display:none;}
          .m-cards{display:block!important;}
          .rooms-grid{grid-template-columns:repeat(2,1fr)!important;}
          .form-g2{grid-template-columns:1fr!important;}
          .form-g3{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:420px){.rooms-grid{grid-template-columns:1fr!important;}}
      `}</style>

      <div style={{display:'flex',minHeight:'100vh'}}>
        {sideOpen && <div onClick={() => setSideOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:99,backdropFilter:'blur(2px)'}}/>}

        {/* SIDEBAR */}
        <aside className={`sidebar ${sideOpen ? 'open' : ''}`}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'18px 16px 14px',borderBottom:'1px solid #f8fafc'}}>
            <div style={{width:'28px',height:'28px',background:'linear-gradient(135deg,#1d4ed8,#2563eb)',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{fontSize:'15px',fontWeight:'700',color:'#0f172a',letterSpacing:'-0.3px'}}>DormLink</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'14px 16px',borderBottom:'1px solid #f8fafc'}}>
            <div style={{width:'34px',height:'34px',background:'linear-gradient(135deg,#d1fae5,#a7f3d0)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'#065f46',flexShrink:0}}>
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div>
              <div style={{fontSize:'13px',fontWeight:'600',color:'#0f172a'}}>{user?.first_name} {user?.last_name}</div>
              <div style={{fontSize:'10px',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.5px'}}>Host</div>
            </div>
          </div>
          <nav style={{padding:'10px 8px',flex:1}}>
            {[
              { id:'hostels',  icon:'apartment',      label:'My Properties' },
              { id:'bookings', icon:'receipt_long',   label:'Bookings', count: pendingB.length },
              { id:'account',  icon:'manage_accounts',label:'Account' },
            ].map(n => (
              <button key={n.id} onClick={() => { setTab(n.id); setRoomView(null); setSideOpen(false); }}
                style={{display:'flex',alignItems:'center',gap:'8px',width:'100%',padding:'9px 10px',borderRadius:'8px',border:'none',background: tab===n.id&&!roomView ? '#eff6ff' : 'none',fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight: tab===n.id&&!roomView ? '600' : '500',color: tab===n.id&&!roomView ? '#1d4ed8' : '#64748b',cursor:'pointer',textAlign:'left',marginBottom:'2px',transition:'all 0.15s'}}>
                <span className="material-icons-round" style={{fontSize:'17px'}}>{n.icon}</span>
                <span style={{flex:1}}>{n.label}</span>
                {n.count > 0 && <span style={{background:'#ef4444',color:'white',borderRadius:'20px',padding:'1px 6px',fontSize:'10px',fontWeight:'700'}}>{n.count}</span>}
              </button>
            ))}
          </nav>
          <div style={{padding:'12px',borderTop:'1px solid #f8fafc'}}>
            <button onClick={logout} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',width:'100%',background:'none',border:'1px solid #f1f5f9',padding:'8px',borderRadius:'8px',fontSize:'12px',fontWeight:'500',color:'#94a3b8',cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'all 0.15s'}}>
              <span className="material-icons-round" style={{fontSize:'15px'}}>logout</span>
              Sign out
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main-area" style={{marginLeft:'236px',flex:1,display:'flex',flexDirection:'column'}}>
          <header className="topbar" style={{background:'white',borderBottom:'1px solid #f1f5f9',height:'54px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',position:'sticky',top:0,zIndex:50}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <button className="hamburger" onClick={() => setSideOpen(true)} style={{display:'none',background:'none',border:'none',cursor:'pointer',color:'#64748b',padding:'2px'}}>
                <span className="material-icons-round">menu</span>
              </button>
              {roomView ? (
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <button onClick={() => setRoomView(null)} style={{display:'flex',alignItems:'center',background:'#f1f5f9',border:'none',borderRadius:'7px',padding:'5px',cursor:'pointer',color:'#475569',transition:'all 0.15s'}}>
                    <span className="material-icons-round" style={{fontSize:'16px'}}>arrow_back</span>
                  </button>
                  <span style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>{selectedHostel?.name} — Rooms</span>
                </div>
              ) : (
                <span style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>
                  {tab==='hostels'?'My Properties':tab==='bookings'?'Bookings':'Account'}
                </span>
              )}
            </div>
            {tab==='hostels' && !roomView && (
              <button onClick={() => { setHForm(emptyHostel); setModal({ type:'hostel' }); }}
                style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#0f172a',color:'white',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                <span className="material-icons-round" style={{fontSize:'15px'}}>add</span>
                Add Property
              </button>
            )}
            {roomView && (
              <button onClick={() => { setRForm(emptyRoom); setModal({ type:'room', forHostel: roomView }); }}
                style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#0f172a',color:'white',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                <span className="material-icons-round" style={{fontSize:'15px'}}>add</span>
                Add Room
              </button>
            )}
          </header>

          <div className="content" style={{padding:'24px',flex:1,animation:'fadeIn 0.3s ease'}}>

            {/* STATS */}
            {!roomView && (
              <div className="stats-row" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'20px'}}>
                {[
                  { n: hostels.length, l:'Properties', icon:'apartment', s:'' },
                  { n: hostels.filter(h=>h.status==='approved').length, l:'Live', icon:'check_circle', s:'good' },
                  { n: bookings.length, l:'Bookings', icon:'receipt_long', s:'' },
                  { n: pendingB.length, l:'Need Review', icon:'schedule', s: pendingB.length>0?'warn':'' },
                ].map((s,i) => (
                  <div key={i} style={{background: s.s==='good'?'#f0fdf4':s.s==='warn'?'#fffbeb':'white',border:`1px solid ${s.s==='good'?'#d1fae5':s.s==='warn'?'#fde68a':'#f1f5f9'}`,borderRadius:'12px',padding:'16px',transition:'all 0.2s'}}>
                    <span className="material-icons-round" style={{fontSize:'18px',color: s.s==='good'?'#10b981':s.s==='warn'?'#f59e0b':'#94a3b8',marginBottom:'10px',display:'block'}}>{s.icon}</span>
                    <div style={{fontSize:'24px',fontWeight:'700',color:'#0f172a',letterSpacing:'-0.5px'}}>{s.n}</div>
                    <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{s.l}</div>
                  </div>
                ))}
              </div>
            )}

            {/* HOSTELS LIST */}
            {tab==='hostels' && !roomView && (
              <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:'12px',overflow:'hidden'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>Properties</div>
                  <div style={{fontSize:'12px',color:'#94a3b8'}}>{hostels.length} total</div>
                </div>
                {hostels.length === 0 ? (
                  <div style={{padding:'48px',textAlign:'center',color:'#94a3b8'}}>
                    <span className="material-icons-round" style={{fontSize:'40px',color:'#cbd5e1',display:'block',marginBottom:'12px'}}>apartment</span>
                    <div style={{fontWeight:'500',color:'#475569',marginBottom:'4px'}}>No properties yet</div>
                    <div style={{fontSize:'13px',marginBottom:'16px'}}>Add your first hostel to start receiving bookings</div>
                    <button onClick={() => { setHForm(emptyHostel); setModal({ type:'hostel' }); }} style={{background:'#0f172a',color:'white',border:'none',padding:'9px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Add Property</button>
                  </div>
                ) : hostels.map(h => {
                  const avail = h.rooms?.filter(r => !r.is_full).length || 0;
                  return (
                    <div key={h.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 20px',borderBottom:'1px solid #f9fafb',transition:'background 0.15s'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'12px',flex:1}}>
                        <div style={{width:'38px',height:'38px',background:'#f1f5f9',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                          <span className="material-icons-round" style={{fontSize:'20px',color:'#64748b'}}>apartment</span>
                        </div>
                        <div>
                          <div style={{fontSize:'13px',fontWeight:'600',color:'#0f172a'}}>{h.name}</div>
                          <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px',display:'flex',gap:'8px',flexWrap:'wrap'}}>
                            <span>{h.city}</span>
                            {h.universities?.name && <span>· {h.universities.name}</span>}
                            <span>· {h.rooms?.length||0} rooms</span>
                            {(h.rooms?.length||0) > 0 && <span style={{color: avail===0?'#ef4444':'#10b981'}}>· {avail} available</span>}
                          </div>
                        </div>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <Badge s={h.status}/>
                        <div style={{display:'flex',gap:'4px'}}>
                          {h.status==='approved' && (
                            <Btn color="blue" onClick={() => setRoomView(h.id)}>
                              <span className="material-icons-round" style={{fontSize:'13px'}}>bed</span>
                              Rooms
                            </Btn>
                          )}
                          <Btn color="gray" onClick={() => { setHForm({ name:h.name,city:h.city,address:h.address,description:h.description||'',university_id:h.university_id||'',distance_from_university:h.distance_from_university||'',amenities:h.amenities||[],transport_notes:h.transport_notes||'',latitude:h.latitude||'',longitude:h.longitude||'' }); setModal({ type:'hostel', hostelId:h.id }); }}>
                            <span className="material-icons-round" style={{fontSize:'13px'}}>edit</span>
                          </Btn>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ROOMS VIEW */}
            {tab==='hostels' && roomView && selectedHostel && (
              <div>
                <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:'12px',padding:'14px 18px',marginBottom:'16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontWeight:'600',color:'#0f172a'}}>{selectedHostel.name}</div>
                    <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{selectedHostel.address} · {selectedHostel.city}</div>
                  </div>
                  <div style={{display:'flex',gap:'16px',fontSize:'13px'}}>
                    <div><strong>{selectedHostel.rooms?.length||0}</strong> <span style={{color:'#94a3b8'}}>rooms total</span></div>
                    <div><strong style={{color:'#10b981'}}>{selectedHostel.rooms?.filter(r=>!r.is_full).length||0}</strong> <span style={{color:'#94a3b8'}}>available</span></div>
                  </div>
                </div>

                {!selectedHostel.rooms?.length ? (
                  <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:'12px',padding:'48px',textAlign:'center',color:'#94a3b8'}}>
                    <span className="material-icons-round" style={{fontSize:'40px',color:'#cbd5e1',display:'block',marginBottom:'12px'}}>bed</span>
                    <div style={{fontWeight:'500',color:'#475569',marginBottom:'4px'}}>No rooms added yet</div>
                    <div style={{fontSize:'13px',marginBottom:'16px'}}>Add rooms one by one with labels like A101, B205</div>
                    <button onClick={() => { setRForm(emptyRoom); setModal({ type:'room', forHostel: roomView }); }} style={{background:'#0f172a',color:'white',border:'none',padding:'9px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Add First Room</button>
                  </div>
                ) : (
                  <div className="rooms-grid">
                    {selectedHostel.rooms.map(room => (
                      <div key={room.id} style={{background: room.is_full ? '#f8fafc' : 'white',border:'1px solid #f1f5f9',borderRadius:'12px',padding:'14px',transition:'all 0.2s',opacity: room.is_full ? 0.7 : 1}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
                          <span style={{background:'#0f172a',color:'white',padding:'3px 9px',borderRadius:'5px',fontSize:'12px',fontWeight:'700',fontFamily:'monospace',letterSpacing:'0.3px'}}>{room.room_label||'—'}</span>
                          <span style={{fontSize:'11px',fontWeight:'600',padding:'2px 8px',borderRadius:'20px',background: room.is_full?'#fee2e2':'#d1fae5',color: room.is_full?'#991b1b':'#065f46'}}>
                            {room.is_full ? 'Full' : `${room.available_count} left`}
                          </span>
                        </div>
                        <div style={{fontSize:'13px',fontWeight:'600',color:'#0f172a',marginBottom:'2px'}}>{room.room_type}</div>
                        {room.floor && <div style={{fontSize:'11px',color:'#94a3b8',marginBottom:'8px'}}>Floor {room.floor}</div>}
                        <div style={{display:'flex',flexDirection:'column',gap:'4px',marginBottom:'8px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'12px',color:'#475569'}}>
                            <span className="material-icons-round" style={{fontSize:'13px',color:'#94a3b8'}}>people</span>
                            {room.capacity} person{room.capacity>1?'s':''}
                          </div>
                          <div style={{fontSize:'13px',fontWeight:'700',color:'#1d4ed8'}}>
                            TZS {parseFloat(room.price_per_semester||0).toLocaleString()}/sem
                          </div>
                          <div style={{fontSize:'11px',color:'#94a3b8'}}>
                            Deposit: TZS {(parseFloat(room.price_per_semester||0)*0.5).toLocaleString()}
                          </div>
                        </div>
                        {room.description && <div style={{fontSize:'12px',color:'#94a3b8',marginBottom:'8px',lineHeight:'1.5',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{room.description}</div>}
                        <div style={{display:'flex',gap:'6px',marginTop:'4px'}}>
                          <Btn color="gray" style={{flex:1,justifyContent:'center'}} onClick={() => { setRForm({ ...room }); setModal({ type:'room', roomId: room.id }); }}>
                            <span className="material-icons-round" style={{fontSize:'13px'}}>edit</span>
                            Edit
                          </Btn>
                          <Btn color="red" onClick={() => removeRoom(room.id)}>
                            <span className="material-icons-round" style={{fontSize:'13px'}}>delete</span>
                          </Btn>
                        </div>
                      </div>
                    ))}
                    {/* Add tile */}
                    <div onClick={() => { setRForm(emptyRoom); setModal({ type:'room', forHostel: roomView }); }}
                      style={{background:'white',border:'1.5px dashed #e2e8f0',borderRadius:'12px',padding:'14px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer',minHeight:'120px',transition:'all 0.2s'}}>
                      <span className="material-icons-round" style={{fontSize:'28px',color:'#cbd5e1',marginBottom:'8px'}}>add_circle_outline</span>
                      <div style={{fontSize:'13px',color:'#94a3b8',fontWeight:'500'}}>Add Room</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BOOKINGS */}
            {tab==='bookings' && (
              <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:'12px',overflow:'hidden'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>Bookings</div>
                  <div style={{fontSize:'12px',color:'#94a3b8'}}>{pendingB.length} pending review</div>
                </div>
                {bookings.length === 0 ? (
                  <div style={{padding:'48px',textAlign:'center',color:'#94a3b8',fontSize:'13px'}}>No bookings yet</div>
                ) : (
                  <>
                    <div className="tbl-wrap" style={{overflowX:'auto'}}>
                      <table className="tbl">
                        <thead><tr><th>Student</th><th>Property</th><th>Room</th><th>Semester</th><th>Deposit</th><th>Status</th><th>Payment</th><th>Action</th></tr></thead>
                        <tbody>
                          {bookings.map(b => (
                            <tr key={b.id} className={b.status==='pending'?'hl':''}>
                              <td><div style={{fontSize:'13px',fontWeight:'500',color:'#0f172a'}}>{b.users?.first_name} {b.users?.last_name}</div><div style={{fontSize:'12px',color:'#94a3b8'}}>{b.users?.phone}</div></td>
                              <td style={{fontSize:'13px',fontWeight:'500',color:'#0f172a'}}>{b.hostels?.name}</td>
                              <td><div style={{fontSize:'13px',fontWeight:'500',color:'#0f172a'}}>{b.rooms?.room_label}</div><div style={{fontSize:'12px',color:'#94a3b8'}}>{b.rooms?.room_type}</div></td>
                              <td style={{fontSize:'12px',color:'#94a3b8'}}>{b.semester}</td>
                              <td style={{color:'#1d4ed8',fontWeight:'600',fontSize:'13px'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</td>
                              <td><Badge s={b.status}/></td>
                              <td><Badge s={b.payment_status||'unpaid'}/></td>
                              <td>
                                <div style={{display:'flex',gap:'4px'}}>
                                  {b.status==='pending' && <>
                                    <Btn color="green" onClick={() => doBooking(b.id,'confirm')} disabled={actionLoading}>Confirm</Btn>
                                    <Btn color="red" onClick={() => doBooking(b.id,'reject')} disabled={actionLoading}>Reject</Btn>
                                  </>}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="m-cards" style={{display:'none'}}>
                      {bookings.map(b => (
                        <div key={b.id} style={{padding:'16px',borderBottom:'1px solid #f1f5f9',background:b.status==='pending'?'#fffbeb':'white'}}>
                          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'8px'}}>
                            <div>
                              <div style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>{b.users?.first_name} {b.users?.last_name}</div>
                              <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{b.hostels?.name} · {b.rooms?.room_label} · {b.semester}</div>
                            </div>
                            <Badge s={b.status}/>
                          </div>
                          <div style={{fontSize:'14px',fontWeight:'600',color:'#1d4ed8',marginBottom:'10px'}}>Deposit: TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</div>
                          {b.status==='pending' && (
                            <div style={{display:'flex',gap:'6px'}}>
                              <Btn color="green" style={{flex:1,justifyContent:'center'}} onClick={() => doBooking(b.id,'confirm')}>Confirm</Btn>
                              <Btn color="red" style={{flex:1,justifyContent:'center'}} onClick={() => doBooking(b.id,'reject')}>Reject</Btn>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ACCOUNT */}
            {tab==='account' && (
              <div style={{background:'white',border:'1px solid #f1f5f9',borderRadius:'12px',overflow:'hidden'}}>
                <div style={{padding:'16px 20px',borderBottom:'1px solid #f1f5f9'}}><div style={{fontSize:'14px',fontWeight:'600',color:'#0f172a'}}>Account Settings</div></div>
                <div style={{padding:'20px'}}>
                  <div style={{marginBottom:'24px',paddingBottom:'24px',borderBottom:'1px solid #f1f5f9'}}>
                    <div style={{fontSize:'12px',fontWeight:'600',color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'14px'}}>Profile</div>
                    <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                      <div style={{width:'44px',height:'44px',background:'linear-gradient(135deg,#d1fae5,#a7f3d0)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:'700',color:'#065f46'}}>{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
                      <div>
                        <div style={{fontWeight:'600',color:'#0f172a'}}>{user?.first_name} {user?.last_name}</div>
                        <div style={{fontSize:'13px',color:'#94a3b8'}}>{user?.email}</div>
                        <div style={{fontSize:'12px',color:'#94a3b8'}}>{user?.phone||'No phone'}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{background:'#fff5f5',border:'1px solid #fee2e2',borderRadius:'10px',padding:'16px'}}>
                    <div style={{fontSize:'12px',fontWeight:'600',color:'#ef4444',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px'}}>Danger Zone</div>
                    <p style={{fontSize:'13px',color:'#64748b',marginBottom:'14px',lineHeight:'1.6'}}>Permanently delete your host account and all properties. This cannot be undone.</p>
                    <button onClick={() => setModal({ type:'delete' })} style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'white',border:'1.5px solid #ef4444',color:'#ef4444',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
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

      {/* HOSTEL MODAL */}
      {modal?.type === 'hostel' && (
        <Modal title={modal.hostelId ? 'Edit Property' : 'Add New Property'} big onClose={() => setModal(null)}>
          <div className="form-g2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <Input label="Property Name *" placeholder="e.g. Sunrise Hostel" value={hForm.name} onChange={e => setHForm(f=>({...f,name:e.target.value}))}/>
            <Input label="City *" placeholder="e.g. Dar es Salaam" value={hForm.city} onChange={e => setHForm(f=>({...f,city:e.target.value}))}/>
          </div>
          <Input label="Full Address *" placeholder="Street address, area, city" value={hForm.address} onChange={e => setHForm(f=>({...f,address:e.target.value}))}/>
          <div className="form-g2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <Input label="Latitude (GPS)" placeholder="-6.7924" value={hForm.latitude} onChange={e => setHForm(f=>({...f,latitude:e.target.value}))}/>
            <Input label="Longitude (GPS)" placeholder="39.2083" value={hForm.longitude} onChange={e => setHForm(f=>({...f,longitude:e.target.value}))}/>
          </div>
          <div className="form-g2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <Input label="Distance from University (km)" type="number" placeholder="0.5" value={hForm.distance_from_university} onChange={e => setHForm(f=>({...f,distance_from_university:e.target.value}))}/>
            <Input label="Transport Notes" placeholder="Bus 34, stops 200m away, TZS 300" value={hForm.transport_notes} onChange={e => setHForm(f=>({...f,transport_notes:e.target.value}))}/>
          </div>
          <Textarea label="Description" placeholder="Describe your hostel..." value={hForm.description} onChange={e => setHForm(f=>({...f,description:e.target.value}))}/>
          <div style={{marginBottom:'14px'}}>
            <label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'8px'}}>Amenities</label>
            <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
              {AMENITIES.map(a => (
                <button key={a} type="button"
                  onClick={() => setHForm(f => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter(x=>x!==a) : [...f.amenities,a] }))}
                  style={{border:`1.5px solid ${hForm.amenities.includes(a)?'#2563eb':'#e2e8f0'}`,background: hForm.amenities.includes(a)?'#eff6ff':'#f9fafb',borderRadius:'7px',padding:'5px 12px',fontSize:'12px',fontWeight: hForm.amenities.includes(a)?'600':'500',color: hForm.amenities.includes(a)?'#1d4ed8':'#64748b',cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'all 0.15s',display:'flex',alignItems:'center',gap:'4px'}}>
                  {hForm.amenities.includes(a) && <span className="material-icons-round" style={{fontSize:'12px'}}>check</span>}
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',marginTop:'8px'}}>
            <button onClick={() => setModal(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'500',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Cancel</button>
            <button disabled={actionLoading} onClick={saveHostel} style={{background:'#0f172a',color:'white',border:'none',padding:'9px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif',opacity:actionLoading?0.5:1}}>
              {actionLoading ? 'Saving...' : modal.hostelId ? 'Save Changes' : 'Submit for Review'}
            </button>
          </div>
        </Modal>
      )}

      {/* ROOM MODAL */}
      {modal?.type === 'room' && (
        <Modal title={modal.roomId ? 'Edit Room' : 'Add Room'} big onClose={() => setModal(null)}>
          <div className="form-g2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <Input label="Room Label *" hint="e.g. A101, B205" placeholder="A101" value={rForm.room_label} onChange={e => setRForm(f=>({...f,room_label:e.target.value.toUpperCase()}))}/>
            <Input label="Floor" placeholder="Ground, 1st, 2nd..." value={rForm.floor} onChange={e => setRForm(f=>({...f,floor:e.target.value}))}/>
          </div>
          <div style={{marginBottom:'14px'}}>
            <label style={{display:'block',fontSize:'12px',fontWeight:'600',color:'#374151',marginBottom:'8px'}}>Room Type *</label>
            <div className="form-g3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'}}>
              {ROOM_TYPES.map(t => (
                <button key={t} type="button"
                  onClick={() => setRForm(f => ({ ...f, room_type:t, capacity: ROOM_CAPS[t]||1 }))}
                  style={{border:`1.5px solid ${rForm.room_type===t?'#2563eb':'#e2e8f0'}`,background: rForm.room_type===t?'#eff6ff':'#f9fafb',borderRadius:'8px',padding:'8px 6px',fontSize:'12px',fontWeight: rForm.room_type===t?'600':'500',color: rForm.room_type===t?'#1d4ed8':'#64748b',cursor:'pointer',fontFamily:'Inter,sans-serif',transition:'all 0.15s',textAlign:'center'}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="form-g3" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}}>
            <Input label="Capacity (persons)" type="number" min="1" max="20" value={rForm.capacity} onChange={e => setRForm(f=>({...f,capacity:parseInt(e.target.value)||1}))}/>
            <Input label="Price / Semester (TZS) *" type="number" placeholder="400000" value={rForm.price_per_semester} onChange={e => setRForm(f=>({...f,price_per_semester:e.target.value}))}/>
            <Input label="Number of Rooms" type="number" min="0" value={rForm.available_count} onChange={e => setRForm(f=>({...f,available_count:parseInt(e.target.value)||0}))}/>
          </div>
          {parseFloat(rForm.price_per_semester) > 0 && (
            <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:'8px',padding:'8px 12px',fontSize:'12px',color:'#1d4ed8',marginBottom:'12px',display:'flex',alignItems:'center',gap:'6px'}}>
              <span className="material-icons-round" style={{fontSize:'14px'}}>info</span>
              50% deposit = <strong>TZS {(parseFloat(rForm.price_per_semester)*0.5).toLocaleString()}</strong> · per person, per semester
            </div>
          )}
          <div style={{marginBottom:'14px'}}>
            <label style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',fontSize:'13px',color:'#475569'}}>
              <input type="checkbox" checked={rForm.available_count===0||rForm.is_full}
                onChange={e => setRForm(f=>({...f,is_full:e.target.checked,available_count:e.target.checked?0:f.available_count||1}))}/>
              Mark this room as full (no more bookings)
            </label>
          </div>
          <Textarea label="Description" placeholder="Additional details about this specific room..." value={rForm.description} onChange={e => setRForm(f=>({...f,description:e.target.value}))}/>
          <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',marginTop:'8px'}}>
            <button onClick={() => setModal(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'500',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Cancel</button>
            <button disabled={actionLoading} onClick={saveRoom} style={{background:'#0f172a',color:'white',border:'none',padding:'9px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif',opacity:actionLoading?0.5:1}}>
              {actionLoading ? 'Saving...' : modal.roomId ? 'Save Changes' : 'Add Room'}
            </button>
          </div>
        </Modal>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {modal?.type === 'delete' && (
        <Modal title="Delete Account" onClose={() => setModal(null)}>
          <div style={{textAlign:'center',padding:'8px 0 16px'}}>
            <span className="material-icons-round" style={{fontSize:'40px',color:'#ef4444',display:'block',marginBottom:'12px'}}>delete_forever</span>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:'1.7',marginBottom:'16px'}}>This will permanently delete your account, all properties, and cancel all pending bookings.</p>
          </div>
          <input type="password" placeholder="Your password" value={deletePw} onChange={e => setDeletePw(e.target.value)}
            style={{width:'100%',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'10px 12px',fontSize:'14px',fontFamily:'Inter,sans-serif',outline:'none',background:'#f9fafb',marginBottom:'4px'}}/>
          <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',marginTop:'14px'}}>
            <button onClick={() => setModal(null)} style={{background:'#f1f5f9',color:'#475569',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'500',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>Cancel</button>
            <button disabled={actionLoading||!deletePw} onClick={doDeleteAccount} style={{background:'#ef4444',color:'white',border:'none',padding:'9px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter,sans-serif',opacity:(actionLoading||!deletePw)?0.5:1}}>
              {actionLoading ? 'Deleting...' : 'Delete Forever'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
