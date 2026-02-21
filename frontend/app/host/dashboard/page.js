'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AMENITY_ICONS = {
  'WiFi':'wifi','Water':'water_drop','Security':'security','Kitchen':'kitchen',
  'Parking':'local_parking','Laundry':'local_laundry_service','Generator':'bolt',
  'CCTV':'videocam','Gym':'fitness_center','Study Room':'menu_book',
  'Cleaning':'cleaning_services','Air Conditioning':'ac_unit','Hot Shower':'shower',
  'Furnished':'chair','Garden':'park','Elevator':'elevator',
};

const ROOM_TYPES = [
  { value:'Single Room', icon:'bed', desc:'1 person' },
  { value:'2 Person Shared', icon:'bedroom_parent', desc:'2 persons' },
  { value:'3 Person Shared', icon:'bedroom_child', desc:'3 persons' },
  { value:'4 Person Shared', icon:'group', desc:'4 persons' },
  { value:'Self Contained', icon:'home', desc:'Private bathroom' },
  { value:'Studio', icon:'apartment', desc:'Full unit' },
];

export default function HostDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [hostels, setHostels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('properties');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHostelModal, setShowHostelModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedUnis, setSelectedUnis] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [hostelForm, setHostelForm] = useState({ name:'',description:'',address:'',city:'',university_id:'',distance_from_university:'' });
  const [roomForm, setRoomForm] = useState({ room_type:'',price_per_semester:'',capacity:'',available_count:'',description:'' });

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'host') { router.push('/login'); return; }
    fetchData();
  }, [user, loading]);

  const fetchData = async () => {
    try {
      const [h, b, u] = await Promise.all([
        api.get('/hostels/my/listings'),
        api.get('/bookings/host'),
        api.get('/hostels/universities'),
      ]);
      setHostels(h.data.hostels || []);
      setBookings(b.data.bookings || []);
      setUniversities(u.data.universities || []);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const toggleAmenity = (a) => setSelectedAmenities(p => p.includes(a) ? p.filter(x=>x!==a) : [...p,a]);
  const toggleUni = (id) => {
    setSelectedUnis(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
    if (!hostelForm.university_id) setHostelForm(f=>({...f,university_id:id}));
  };

  const submitHostel = async (e) => {
    e.preventDefault();
    if (!hostelForm.university_id) { toast.error('Please select at least one university'); return; }
    setFormLoading(true);
    try {
      await api.post('/hostels', { ...hostelForm, amenities: selectedAmenities });
      toast.success('Property submitted for admin approval!');
      setShowHostelModal(false);
      setHostelForm({ name:'',description:'',address:'',city:'',university_id:'',distance_from_university:'' });
      setSelectedAmenities([]); setSelectedUnis([]);
      fetchData();
    } catch (e) { toast.error(e.response?.data?.error || 'Failed to submit'); }
    finally { setFormLoading(false); }
  };

  const submitRoom = async (e) => {
    e.preventDefault();
    if (!roomForm.room_type) { toast.error('Please select a room type'); return; }
    setFormLoading(true);
    try {
      await api.post(`/hostels/${selectedHostel.id}/rooms`, {
        room_type: roomForm.room_type,
        price_per_semester: parseFloat(roomForm.price_per_semester),
        price_per_month: parseFloat(roomForm.price_per_semester) / 4,
        capacity: parseInt(roomForm.capacity),
        available_count: parseInt(roomForm.available_count),
        description: roomForm.description,
      });
      toast.success('Room added!');
      setShowRoomModal(false);
      setRoomForm({ room_type:'',price_per_semester:'',capacity:'',available_count:'',description:'' });
      fetchData();
    } catch (e) { toast.error(e.response?.data?.error || 'Failed to add room'); }
    finally { setFormLoading(false); }
  };

  const handleBooking = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}/review`, { status });
      toast.success(`Booking ${status}`); fetchData();
    } catch (e) { toast.error('Failed'); }
  };

  const handlePayment = async (id, action) => {
    try {
      await api.patch(`/payments/${action}/${id}`, { reason: 'Transaction not found' });
      toast.success(action === 'confirm' ? 'Payment confirmed!' : 'Payment rejected');
      fetchData();
    } catch (e) { toast.error('Failed'); }
  };

  const statusStyle = (s) => ({
    pending:   { bg:'#fef9c3', color:'#854d0e' },
    confirmed: { bg:'#dcfce7', color:'#166534' },
    cancelled: { bg:'#fee2e2', color:'#991b1b' },
    approved:  { bg:'#dcfce7', color:'#166534' },
    rejected:  { bg:'#fee2e2', color:'#991b1b' },
  }[s] || { bg:'#f1f5f9', color:'#475569' });

  const pendingPayments = bookings.filter(b => b.payment_status === 'pending_confirmation');

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}><div style={{width:'32px',height:'32px',border:'3px solid #bfdbfe',borderTop:'3px solid #2563eb',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/><style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style></div>;

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
        .sidebar-nav{padding:16px 12px;flex:1;overflow-y:auto;}
        .nav-label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;padding:0 8px;margin:16px 0 8px;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:14px;font-weight:500;color:#64748b;text-decoration:none;transition:all 0.15s;margin-bottom:2px;width:100%;border:none;background:none;font-family:'DM Sans',sans-serif;cursor:pointer;}
        .nav-item:hover{background:#f1f5f9;color:#0f172a;}
        .nav-item.active{background:#eff6ff;color:#2563eb;font-weight:600;}
        .sidebar-bottom{padding:16px;border-top:1px solid #e2e8f0;}
        .user-card{display:flex;align-items:center;gap:10px;padding:12px;background:#f8fafc;border-radius:12px;margin-bottom:10px;}
        .user-avatar{width:36px;height:36px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;flex-shrink:0;}
        .user-name{font-size:13px;font-weight:600;color:#0f172a;}
        .user-role{font-size:11px;color:#94a3b8;}
        .btn-logout{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:none;border:1.5px solid #e2e8f0;padding:9px;border-radius:10px;font-size:13px;font-weight:600;color:#64748b;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .btn-logout:hover{border-color:#ef4444;color:#ef4444;background:#fef2f2;}
        .main{margin-left:256px;flex:1;}
        .topbar{background:white;border-bottom:1px solid #e2e8f0;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
        .topbar-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:#0f172a;}
        .hamburger{display:none;background:none;border:none;cursor:pointer;color:#0f172a;}
        .content{padding:32px;}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
        .stat-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:20px;}
        .stat-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
        .stat-num{font-family:'Sora',sans-serif;font-size:28px;font-weight:800;color:#0f172a;}
        .stat-label{font-size:13px;color:#64748b;margin-top:2px;}
        .tabs{display:flex;gap:4px;background:#f1f5f9;border-radius:12px;padding:4px;margin-bottom:24px;width:fit-content;}
        .tab{padding:8px 20px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;background:none;color:#64748b;transition:all 0.15s;display:flex;align-items:center;gap:6px;white-space:nowrap;}
        .tab.active{background:white;color:#2563eb;box-shadow:0 1px 6px rgba(0,0,0,0.08);}
        .badge-count{background:#ef4444;color:white;border-radius:50px;padding:1px 7px;font-size:10px;font-weight:700;}
        .btn-primary{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:10px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s;text-decoration:none;}
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(37,99,235,0.25);}
        .table-wrap{background:white;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;}
        .table{width:100%;border-collapse:collapse;}
        .table th{text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}
        .table td{padding:14px 20px;font-size:14px;color:#475569;border-bottom:1px solid #f1f5f9;vertical-align:middle;}
        .table tr:last-child td{border-bottom:none;}
        .badge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:700;}
        .action-btns{display:flex;gap:6px;flex-wrap:wrap;}
        .btn-sm{border:none;padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .btn-confirm{background:#dcfce7;color:#166534;}
        .btn-confirm:hover{background:#bbf7d0;}
        .btn-cancel{background:#fee2e2;color:#991b1b;}
        .btn-cancel:hover{background:#fecaca;}
        .btn-add{background:#eff6ff;color:#1e40af;border:none;padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;}
        .empty-cell{text-align:center;padding:60px;color:#94a3b8;font-size:14px;}
        .txid{font-family:monospace;font-size:12px;background:#f1f5f9;padding:3px 8px;border-radius:6px;color:#0f172a;}
        /* MODAL */
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.6);z-index:200;display:flex;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;backdrop-filter:blur(4px);}
        .modal{background:white;border-radius:20px;padding:32px;width:100%;max-width:580px;margin:auto;position:relative;}
        .modal-title{font-family:'Sora',sans-serif;font-size:20px;font-weight:800;color:#0f172a;margin-bottom:4px;}
        .modal-sub{font-size:14px;color:#64748b;margin-bottom:24px;}
        .modal-close{position:absolute;top:20px;right:20px;background:#f1f5f9;border:none;width:32px;height:32px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;}
        .modal-close:hover{background:#e2e8f0;}
        .sec-label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin:20px 0 10px;padding-bottom:8px;border-bottom:1px solid #e2e8f0;}
        .form-group{margin-bottom:14px;}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:5px;}
        .form-hint{font-size:11px;color:#94a3b8;margin-top:3px;}
        .form-input,.form-select,.form-textarea{width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 14px;font-size:14px;font-family:'DM Sans',sans-serif;color:#0f172a;outline:none;transition:all 0.2s;background:#f9fafb;}
        .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:#2563eb;background:white;box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
        .form-textarea{min-height:72px;resize:vertical;}
        .amenities-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:4px;}
        .amenity-chip{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;transition:all 0.15s;background:#f9fafb;}
        .amenity-chip:hover{border-color:#93c5fd;}
        .amenity-chip.selected{border-color:#2563eb;background:#eff6ff;}
        .amenity-chip-label{font-size:10px;font-weight:500;color:#64748b;text-align:center;}
        .amenity-chip.selected .amenity-chip-label{color:#1e40af;}
        .room-types-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
        .room-type-card{display:flex;flex-direction:column;align-items:center;gap:5px;padding:14px 8px;border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;transition:all 0.15s;background:#f9fafb;}
        .room-type-card:hover{border-color:#93c5fd;}
        .room-type-card.selected{border-color:#2563eb;background:#eff6ff;}
        .room-type-label{font-size:12px;font-weight:700;color:#0f172a;text-align:center;}
        .room-type-desc{font-size:10px;color:#94a3b8;}
        .unis-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .uni-chip{display:flex;align-items:center;gap:8px;padding:10px 12px;border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;font-size:13px;font-weight:500;color:#64748b;transition:all 0.15s;background:#f9fafb;}
        .uni-chip:hover{border-color:#93c5fd;}
        .uni-chip.selected{border-color:#2563eb;background:#eff6ff;color:#1e40af;}
        .uni-check{width:18px;height:18px;border:2px solid #e2e8f0;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s;}
        .uni-chip.selected .uni-check{background:#2563eb;border-color:#2563eb;}
        .modal-footer{display:flex;gap:10px;justify-content:flex-end;margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;}
        .btn-cancel-modal{background:#f1f5f9;color:#475569;border:none;padding:10px 20px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;}
        .btn-submit-modal{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .btn-submit-modal:disabled{opacity:0.6;cursor:not-allowed;}
        .overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;}
        .payment-row td{background:#fffbeb!important;}
        @media(max-width:1024px){.stats{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:768px){
          .sidebar{transform:translateX(-100%);}
          .sidebar.open{transform:translateX(0);}
          .overlay{display:block;}
          .main{margin-left:0;}
          .hamburger{display:flex;}
          .content{padding:20px 16px;}
          .topbar{padding:0 16px;}
          .stats{grid-template-columns:repeat(2,1fr);gap:12px;}
          .table{font-size:13px;}
          .table th,.table td{padding:10px 12px;}
          .tabs{overflow-x:auto;width:100%;}
          .amenities-grid{grid-template-columns:repeat(3,1fr);}
          .form-row{grid-template-columns:1fr;}
          .form-row-3{grid-template-columns:1fr 1fr;}
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
            <div className="nav-label">Menu</div>
            {[
              {label:'Dashboard',icon:'dashboard',tab:'properties'},
              {label:'Bookings',icon:'book_online',tab:'bookings'},
              {label:'Payments',icon:'payments',tab:'payments'},
            ].map(n => (
              <button key={n.tab} className={`nav-item ${activeTab===n.tab?'active':''}`}
                onClick={() => { setActiveTab(n.tab); setSidebarOpen(false); }}>
                <span className="material-icons-round" style={{fontSize:'20px'}}>{n.icon}</span>
                {n.label}
                {n.tab==='payments' && pendingPayments.length>0 && (
                  <span className="badge-count" style={{marginLeft:'auto'}}>{pendingPayments.length}</span>
                )}
              </button>
            ))}
            <Link href="/" className="nav-item" onClick={() => setSidebarOpen(false)}>
              <span className="material-icons-round" style={{fontSize:'20px'}}>home</span>
              Browse Listings
            </Link>
          </div>
          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
              <div>
                <div className="user-name">{user?.first_name} {user?.last_name}</div>
                <div className="user-role">Property Host</div>
              </div>
            </div>
            <button className="btn-logout" onClick={logout}>
              <span className="material-icons-round" style={{fontSize:'16px'}}>logout</span>Sign Out
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span className="material-icons-round" style={{fontSize:'24px'}}>menu</span>
            </button>
            <div className="topbar-title">Host Dashboard</div>
            <button className="btn-primary" onClick={() => setShowHostelModal(true)}>
              <span className="material-icons-round" style={{fontSize:'16px'}}>add</span>
              Add Property
            </button>
          </div>

          <div className="content">
            <div className="stats">
              {[
                {icon:'apartment',color:'#eff6ff',iconColor:'#2563eb',num:hostels.length,label:'Properties'},
                {icon:'check_circle',color:'#dcfce7',iconColor:'#16a34a',num:hostels.filter(h=>h.status==='approved').length,label:'Approved'},
                {icon:'book_online',color:'#fef9c3',iconColor:'#ca8a04',num:bookings.length,label:'Bookings'},
                {icon:'payments',color:'#fef2f2',iconColor:'#dc2626',num:pendingPayments.length,label:'Pending Payments'},
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

            <div className="tabs">
              {[{id:'properties',label:'Properties'},{id:'bookings',label:'Bookings'},{id:'payments',label:'Payments',count:pendingPayments.length}].map(t => (
                <button key={t.id} className={`tab ${activeTab===t.id?'active':''}`} onClick={() => setActiveTab(t.id)}>
                  {t.label}
                  {t.count>0 && <span className="badge-count">{t.count}</span>}
                </button>
              ))}
            </div>

            {/* PROPERTIES */}
            {activeTab==='properties' && (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Property</th><th>City</th><th>University</th><th>Rooms</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {dataLoading ? <tr><td colSpan="6" className="empty-cell">Loading...</td></tr>
                    : hostels.length===0 ? <tr><td colSpan="6" className="empty-cell">No properties yet. Click Add Property above.</td></tr>
                    : hostels.map(h => {
                      const ss = statusStyle(h.status);
                      return (
                        <tr key={h.id}>
                          <td style={{fontWeight:600,color:'#0f172a'}}>{h.name}</td>
                          <td>{h.city}</td>
                          <td>{h.universities?.name||'—'}</td>
                          <td>{h.rooms?.length||0} types</td>
                          <td><span className="badge" style={{background:ss.bg,color:ss.color}}>{h.status}</span></td>
                          <td><button className="btn-add" onClick={() => { setSelectedHostel(h); setShowRoomModal(true); }}>+ Add Room</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* BOOKINGS */}
            {activeTab==='bookings' && (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Student</th><th>Property</th><th>Room</th><th>Semester</th><th>Deposit</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {bookings.length===0 ? <tr><td colSpan="7" className="empty-cell">No booking requests yet</td></tr>
                    : bookings.map(b => {
                      const ss = statusStyle(b.status);
                      return (
                        <tr key={b.id}>
                          <td style={{fontWeight:600,color:'#0f172a'}}>{b.users?.first_name} {b.users?.last_name}</td>
                          <td>{b.hostels?.name}</td>
                          <td>{b.rooms?.room_type}</td>
                          <td>{b.semester}</td>
                          <td style={{fontWeight:700,color:'#2563eb'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</td>
                          <td><span className="badge" style={{background:ss.bg,color:ss.color}}>{b.status}</span></td>
                          <td>
                            {b.status==='pending' ? (
                              <div className="action-btns">
                                <button className="btn-sm btn-confirm" onClick={() => handleBooking(b.id,'confirmed')}>✓ Confirm</button>
                                <button className="btn-sm btn-cancel" onClick={() => handleBooking(b.id,'cancelled')}>✗ Cancel</button>
                              </div>
                            ) : <span style={{color:'#94a3b8',fontSize:'12px'}}>—</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAYMENTS */}
            {activeTab==='payments' && (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Student</th><th>Property</th><th>Room</th><th>Semester</th><th>Deposit</th><th>Method</th><th>Transaction ID</th><th>Action</th></tr></thead>
                  <tbody>
                    {pendingPayments.length===0 ? <tr><td colSpan="8" className="empty-cell">No pending payments — all clear! ✓</td></tr>
                    : pendingPayments.map(b => (
                      <tr key={b.id} className="payment-row">
                        <td style={{fontWeight:600,color:'#0f172a'}}>{b.users?.first_name} {b.users?.last_name}</td>
                        <td>{b.hostels?.name}</td>
                        <td>{b.rooms?.room_type}</td>
                        <td>{b.semester}</td>
                        <td style={{fontWeight:700,color:'#2563eb'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</td>
                        <td style={{textTransform:'capitalize'}}>{b.payment_method}</td>
                        <td><span className="txid">{b.transaction_id}</span></td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-sm btn-confirm" onClick={() => handlePayment(b.id,'confirm')}>✓ Confirm</button>
                            <button className="btn-sm btn-cancel" onClick={() => handlePayment(b.id,'reject')}>✗ Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ADD HOSTEL MODAL */}
      {showHostelModal && (
        <div className="modal-overlay" onClick={() => setShowHostelModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowHostelModal(false)}>
              <span className="material-icons-round" style={{fontSize:'18px'}}>close</span>
            </button>
            <div className="modal-title">Add New Property</div>
            <div className="modal-sub">Admin will review before it goes live</div>
            <form onSubmit={submitHostel}>
              <div className="sec-label">Basic Information</div>
              <div className="form-group">
                <label className="form-label">Property Name *</label>
                <input className="form-input" placeholder="e.g. Sunrise Hostel" value={hostelForm.name} onChange={e => setHostelForm({...hostelForm,name:e.target.value})} required/>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input className="form-input" placeholder="Dar es Salaam" value={hostelForm.city} onChange={e => setHostelForm({...hostelForm,city:e.target.value})} required/>
                </div>
                <div className="form-group">
                  <label className="form-label">Distance (km)</label>
                  <input className="form-input" type="number" step="0.1" placeholder="0.5" value={hostelForm.distance_from_university} onChange={e => setHostelForm({...hostelForm,distance_from_university:e.target.value})}/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Full Address *</label>
                <input className="form-input" placeholder="Street, Area" value={hostelForm.address} onChange={e => setHostelForm({...hostelForm,address:e.target.value})} required/>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Describe your property..." value={hostelForm.description} onChange={e => setHostelForm({...hostelForm,description:e.target.value})}/>
              </div>

              <div className="sec-label">Nearby Universities</div>
              <div className="unis-grid">
                {universities.map(u => (
                  <div key={u.id} className={`uni-chip ${selectedUnis.includes(u.id)?'selected':''}`} onClick={() => toggleUni(u.id)}>
                    <div className="uni-check">
                      {selectedUnis.includes(u.id) && <span className="material-icons-round" style={{fontSize:'12px',color:'white'}}>check</span>}
                    </div>
                    {u.short_name || u.name}
                  </div>
                ))}
              </div>

              <div className="sec-label">Amenities</div>
              <div className="amenities-grid">
                {Object.entries(AMENITY_ICONS).map(([name, icon]) => (
                  <div key={name} className={`amenity-chip ${selectedAmenities.includes(name)?'selected':''}`} onClick={() => toggleAmenity(name)}>
                    <span className="material-icons-round" style={{fontSize:'20px',color:selectedAmenities.includes(name)?'#2563eb':'#94a3b8'}}>{icon}</span>
                    <span className="amenity-chip-label">{name}</span>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel-modal" onClick={() => setShowHostelModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit-modal" disabled={formLoading}>{formLoading?'Submitting...':'Submit Property'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ROOM MODAL */}
      {showRoomModal && selectedHostel && (
        <div className="modal-overlay" onClick={() => setShowRoomModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRoomModal(false)}>
              <span className="material-icons-round" style={{fontSize:'18px'}}>close</span>
            </button>
            <div className="modal-title">Add Room</div>
            <div className="modal-sub">Adding room to {selectedHostel.name}</div>
            <form onSubmit={submitRoom}>
              <div className="sec-label">Room Type</div>
              <div className="room-types-grid">
                {ROOM_TYPES.map(rt => (
                  <div key={rt.value} className={`room-type-card ${roomForm.room_type===rt.value?'selected':''}`}
                    onClick={() => setRoomForm({...roomForm,room_type:rt.value,capacity:rt.value.includes('2')?'2':rt.value.includes('3')?'3':rt.value.includes('4')?'4':'1'})}>
                    <span className="material-icons-round" style={{fontSize:'26px',color:roomForm.room_type===rt.value?'#2563eb':'#94a3b8'}}>{rt.icon}</span>
                    <span className="room-type-label">{rt.value}</span>
                    <span className="room-type-desc">{rt.desc}</span>
                  </div>
                ))}
              </div>
              <div className="sec-label">Room Details</div>
              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Price/Semester (TZS)</label>
                  <input className="form-input" type="number" placeholder="400000" value={roomForm.price_per_semester} onChange={e => setRoomForm({...roomForm,price_per_semester:e.target.value})} required/>
                  <div className="form-hint">Per person per semester</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Persons/Room</label>
                  <input className="form-input" type="number" min="1" placeholder="1" value={roomForm.capacity} onChange={e => setRoomForm({...roomForm,capacity:e.target.value})} required/>
                </div>
                <div className="form-group">
                  <label className="form-label">No. of Rooms</label>
                  <input className="form-input" type="number" min="1" placeholder="5" value={roomForm.available_count} onChange={e => setRoomForm({...roomForm,available_count:e.target.value})} required/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description (optional)</label>
                <textarea className="form-textarea" placeholder="Describe this room type..." value={roomForm.description} onChange={e => setRoomForm({...roomForm,description:e.target.value})}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel-modal" onClick={() => setShowRoomModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit-modal" disabled={formLoading||!roomForm.room_type}>{formLoading?'Adding...':'Add Room'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
