'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AMENITY_ICONS = {
  'WiFi': 'wifi',
  'Water': 'water_drop',
  'Security': 'security',
  'Kitchen': 'kitchen',
  'Parking': 'local_parking',
  'Laundry': 'local_laundry_service',
  'Generator': 'bolt',
  'CCTV': 'videocam',
  'Gym': 'fitness_center',
  'Study Room': 'menu_book',
  'Cleaning': 'cleaning_services',
  'Air Conditioning': 'ac_unit',
  'Hot Shower': 'shower',
  'Furnished': 'chair',
  'Garden': 'park',
  'Elevator': 'elevator',
};

const ROOM_TYPES = [
  { value: 'Single Room', label: 'Single Room', icon: 'bed', desc: '1 person only' },
  { value: '2 Person Shared', label: '2 Person Shared', icon: 'bedroom_parent', desc: '2 persons share' },
  { value: '3 Person Shared', label: '3 Person Shared', icon: 'bedroom_child', desc: '3 persons share' },
  { value: '4 Person Shared', label: '4 Person Shared', icon: 'group', desc: '4 persons share' },
  { value: 'Self Contained', label: 'Self Contained', icon: 'home', desc: 'Private bathroom' },
  { value: 'Studio', label: 'Studio', icon: 'apartment', desc: 'Full private unit' },
];

export default function HostDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [hostels, setHostels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showHostelForm, setShowHostelForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');

  const [hostelForm, setHostelForm] = useState({
    name: '', description: '', address: '', city: '',
    university_id: '', distance_from_university: '',
  });

  const [roomForm, setRoomForm] = useState({
    room_type: '', price_per_month: '', capacity: '',
    available_count: '', description: '',
  });

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
        api.get('/hostels/universities')
      ]);
      setHostels(h.data.hostels);
      setBookings(b.data.bookings);
      setUniversities(u.data.universities);
    } catch (e) { console.error(e); }
    finally { setDataLoading(false); }
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const toggleUniversity = (uid) => {
    setSelectedUniversities(prev =>
      prev.includes(uid) ? prev.filter(u => u !== uid) : [...prev, uid]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmitHostel = async (e) => {
    e.preventDefault();
    if (selectedAmenities.length === 0) {
      toast.error('Please select at least one amenity');
      return;
    }
    setFormLoading(true);
    try {
      await api.post('/hostels', {
        ...hostelForm,
        university_id: hostelForm.university_id,
        amenities: selectedAmenities,
      });
      toast.success('Property submitted for approval!');
      setShowHostelForm(false);
      setHostelForm({ name:'', description:'', address:'', city:'', university_id:'', distance_from_university:'' });
      setSelectedAmenities([]);
      setImageFile(null);
      setImagePreview(null);
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to submit property');
    } finally { setFormLoading(false); }
  };

  const handleSubmitRoom = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await api.post(`/hostels/${selectedHostel.id}/rooms`, {
        ...roomForm,
        price_per_month: parseFloat(roomForm.price_per_month),
        capacity: parseInt(roomForm.capacity),
        available_count: parseInt(roomForm.available_count),
      });
      toast.success('Room added successfully!');
      setShowRoomForm(false);
      setRoomForm({ room_type:'', price_per_month:'', capacity:'', available_count:'', description:'' });
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.error || 'Failed to add room');
    } finally { setFormLoading(false); }
  };

  const handleBookingAction = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}/review`, { status });
      toast.success(`Booking ${status}`);
      fetchData();
    } catch (e) { toast.error('Action failed'); }
  };

  const statusColor = (s) => ({
    pending: { background: '#fef9c3', color: '#854d0e' },
    confirmed: { background: '#dcfce7', color: '#166534' },
    cancelled: { background: '#fee2e2', color: '#991b1b' },
    approved: { background: '#dcfce7', color: '#166534' },
    rejected: { background: '#fee2e2', color: '#991b1b' },
  }[s] || { background: '#f1f4f9', color: '#475569' });

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'Inter,sans-serif',color:'#94a3b8'}}>
      Loading...
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
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
        .btn-primary{background:#1a56db;color:white;border:none;padding:10px 20px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.15s;}
        .btn-primary:hover{background:#1e429f;}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px;}
        .stat-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:20px;}
        .stat-label{font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;}
        .stat-num{font-size:28px;font-weight:700;color:#0f172a;}
        .stat-sub{font-size:12px;color:#94a3b8;margin-top:4px;}
        .tabs{display:flex;gap:4px;background:#f1f4f9;border-radius:8px;padding:4px;margin-bottom:24px;width:fit-content;}
        .tab{padding:8px 18px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'Inter',sans-serif;background:none;color:#94a3b8;transition:all 0.15s;}
        .tab.active{background:white;color:#1a56db;box-shadow:0 1px 4px rgba(0,0,0,0.1);}
        .table-wrap{background:white;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:28px;}
        .table{width:100%;border-collapse:collapse;}
        .table th{text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;padding:14px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;}
        .table td{padding:16px 20px;font-size:14px;color:#475569;border-bottom:1px solid #f1f4f9;}
        .table tr:last-child td{border-bottom:none;}
        .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
        .action-btns{display:flex;gap:8px;}
        .btn-sm{border:none;padding:5px 12px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;}
        .btn-confirm{background:#dcfce7;color:#166534;}
        .btn-reject{background:#fee2e2;color:#991b1b;}
        .btn-add-room{background:#ebf2ff;color:#1e429f;}
        .empty-cell{text-align:center;padding:48px;color:#94a3b8;font-size:14px;}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;overflow-y:auto;}
        .modal{background:white;border-radius:14px;padding:32px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;position:relative;}
        .modal-title{font-family:'Merriweather',serif;font-size:20px;font-weight:700;color:#0f172a;margin-bottom:4px;}
        .modal-sub{font-size:14px;color:#94a3b8;margin-bottom:24px;}
        .form-group{margin-bottom:16px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;}
        .form-input,.form-select,.form-textarea{width:100%;border:1px solid #e2e8f0;border-radius:7px;padding:10px 14px;font-size:14px;font-family:'Inter',sans-serif;color:#0f172a;outline:none;transition:border 0.15s;background:white;}
        .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:#1a56db;box-shadow:0 0 0 3px rgba(26,86,219,0.1);}
        .form-textarea{min-height:80px;resize:vertical;}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
        .modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;}
        .btn-cancel{background:#f1f4f9;color:#475569;border:none;padding:10px 20px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;}
        .btn-submit{background:#1a56db;color:white;border:none;padding:10px 24px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .amenities-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px;}
        .amenity-chip{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 8px;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.15s;background:white;font-family:'Inter',sans-serif;}
        .amenity-chip:hover{border-color:#1a56db;background:#ebf2ff;}
        .amenity-chip.selected{border-color:#1a56db;background:#ebf2ff;}
        .amenity-chip-icon{font-size:22px;color:#1a56db;}
        .amenity-chip-label{font-size:11px;font-weight:500;color:#475569;text-align:center;}
        .amenity-chip.selected .amenity-chip-label{color:#1e429f;}
        .room-types-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px;}
        .room-type-card{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.15s;background:white;font-family:'Inter',sans-serif;}
        .room-type-card:hover{border-color:#1a56db;background:#ebf2ff;}
        .room-type-card.selected{border-color:#1a56db;background:#ebf2ff;}
        .room-type-icon{font-size:24px;}
        .room-type-label{font-size:12px;font-weight:600;color:#0f172a;text-align:center;}
        .room-type-desc{font-size:11px;color:#94a3b8;}
        .image-upload{border:2px dashed #e2e8f0;border-radius:10px;padding:28px;text-align:center;cursor:pointer;transition:all 0.15s;position:relative;}
        .image-upload:hover{border-color:#1a56db;background:#f8faff;}
        .image-upload input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;}
        .image-preview{width:100%;height:160px;object-fit:cover;border-radius:8px;margin-top:12px;}
        .upload-icon{font-size:32px;margin-bottom:8px;}
        .upload-text{font-size:14px;color:#94a3b8;}
        .upload-hint{font-size:12px;color:#c4cdd8;margin-top:4px;}
        .section-divider{font-size:13px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin:20px 0 12px;padding-bottom:8px;border-bottom:1px solid #e2e8f0;}
        .unis-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;}
        .uni-chip{display:flex;align-items:center;gap:8px;padding:10px 12px;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.15s;background:white;font-size:13px;font-family:'Inter',sans-serif;font-weight:500;color:#475569;}
        .uni-chip:hover{border-color:#1a56db;}
        .uni-chip.selected{border-color:#1a56db;background:#ebf2ff;color:#1e429f;}
        .uni-check{width:16px;height:16px;border:2px solid #e2e8f0;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .uni-chip.selected .uni-check{background:#1a56db;border-color:#1a56db;}
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
          <Link href="/host/dashboard" className="nav-item active">
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
            Browse Listings
          </Link>
          <div className="sidebar-bottom">
            <div className="user-box">
              <div className="user-avatar">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
              <div>
                <div className="user-name">{user?.first_name} {user?.last_name}</div>
                <div className="user-role">Host</div>
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
              <h1 className="page-title">Host Dashboard</h1>
              <p className="page-sub">Manage your properties and bookings</p>
            </div>
            <button className="btn-primary" onClick={() => setShowHostelForm(true)}>
              + Add New Property
            </button>
          </div>

          <div className="stats-row">
            {[
              { label: 'Total Properties', value: hostels.length, sub: 'Listed' },
              { label: 'Approved', value: hostels.filter(h => h.status === 'approved').length, sub: 'Live on platform' },
              { label: 'Total Bookings', value: bookings.length, sub: 'All time' },
              { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, sub: 'Need action' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-label">{s.label}</div>
                <div className="stat-num">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="tabs">
  {['properties', 'bookings', 'payments'].map(t => (
    <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
      {t.charAt(0).toUpperCase() + t.slice(1)}
      {t === 'payments' && bookings.filter(b => b.payment_status === 'pending_confirmation').length > 0 && (
        <span style={{background:'#ef4444',color:'white',borderRadius:'10px',padding:'1px 7px',fontSize:'11px',marginLeft:'6px',fontWeight:700}}>
          {bookings.filter(b => b.payment_status === 'pending_confirmation').length}
        </span>
      )}
    </button>
  ))}
</div>

          {activeTab === 'properties' && (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Property</th><th>City</th><th>University</th><th>Rooms</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {dataLoading ? (
                    <tr><td colSpan="6" className="empty-cell">Loading...</td></tr>
                  ) : hostels.length === 0 ? (
                    <tr><td colSpan="6" className="empty-cell">No properties yet. Click Add New Property above.</td></tr>
                  ) : hostels.map(h => (
                    <tr key={h.id}>
                      <td style={{fontWeight:600,color:'#0f172a'}}>{h.name}</td>
                      <td>{h.city}</td>
                      <td>{h.universities?.name || '—'}</td>
                      <td>{h.rooms?.length || 0} rooms</td>
                      <td><span className="badge" style={statusColor(h.status)}>{h.status}</span></td>
                      <td>
                        <button className="btn-sm btn-add-room" onClick={() => { setSelectedHostel(h); setShowRoomForm(true); }}>
                          + Add Room
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Student</th><th>Property</th><th>Room</th><th>Check In</th><th>Amount</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr><td colSpan="7" className="empty-cell">No booking requests yet</td></tr>
                  ) : bookings.map(b => (
                    <tr key={b.id}>
                      <td style={{fontWeight:600,color:'#0f172a'}}>{b.users?.first_name} {b.users?.last_name}</td>
                      <td>{b.hostels?.name}</td>
                      <td>{b.rooms?.room_type}</td>
                      <td>{b.check_in_date}</td>
                      <td style={{fontWeight:600}}>TZS {parseFloat(b.total_amount).toLocaleString()}</td>
                      <td><span className="badge" style={statusColor(b.status)}>{b.status}</span></td>
                      <td>
                        {b.status === 'pending' && (
                          <div className="action-btns">
                            <button className="btn-sm btn-confirm" onClick={() => handleBookingAction(b.id, 'confirmed')}>Confirm</button>
                            <button className="btn-sm btn-reject" onClick={() => handleBookingAction(b.id, 'cancelled')}>Reject</button>
                          </div>
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

      {activeTab === 'payments' && (
  <div className="table-wrap">
    <table className="table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Property</th>
          <th>Room</th>
          <th>Semester</th>
          <th>Deposit Amount</th>
          <th>Method</th>
          <th>Transaction ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.filter(b => b.payment_status === 'pending_confirmation').length === 0 ? (
          <tr><td colSpan="8" className="empty-cell">No pending payment confirmations</td></tr>
        ) : bookings.filter(b => b.payment_status === 'pending_confirmation').map(b => (
          <tr key={b.id}>
            <td style={{fontWeight:600,color:'#0f172a'}}>{b.users?.first_name} {b.users?.last_name}</td>
            <td>{b.hostels?.name}</td>
            <td>{b.rooms?.room_type}</td>
            <td>{b.semester}</td>
            <td style={{fontWeight:600,color:'#1a56db'}}>TZS {parseFloat(b.deposit_amount || 0).toLocaleString()}</td>
            <td style={{textTransform:'capitalize'}}>{b.payment_method}</td>
            <td style={{fontFamily:'monospace',fontSize:'13px'}}>{b.transaction_id}</td>
            <td>
              <div className="action-btns">
                <button
                  className="btn-sm btn-confirm"
                  onClick={async () => {
                    try {
                      await api.patch(`/payments/confirm/${b.id}`);
                      toast.success('Payment confirmed!');
                      fetchData();
                    } catch (e) { toast.error('Failed'); }
                  }}
                >
                  ✓ Confirm
                </button>
                <button
                  className="btn-sm btn-reject"
                  onClick={async () => {
                    try {
                      await api.patch(`/payments/reject/${b.id}`, { reason: 'Transaction not found' });
                      toast.success('Payment rejected');
                      fetchData();
                    } catch (e) { toast.error('Failed'); }
                  }}
                >
                  ✗ Reject
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      {/* ADD HOSTEL MODAL */}
      {showHostelForm && (
        <div className="modal-overlay" onClick={() => setShowHostelForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Add New Property</div>
            <div className="modal-sub">Fill in your property details. It will be reviewed by admin before going live.</div>

            <form onSubmit={handleSubmitHostel}>
              <div className="section-divider">Basic Information</div>
              <div className="form-group">
                <label className="form-label">Property Name</label>
                <input className="form-input" placeholder="e.g. Sunrise Hostel" value={hostelForm.name} onChange={e => setHostelForm({...hostelForm, name: e.target.value})} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input className="form-input" placeholder="Dar es Salaam" value={hostelForm.city} onChange={e => setHostelForm({...hostelForm, city: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Distance from University (km)</label>
                  <input className="form-input" type="number" step="0.1" placeholder="0.5" value={hostelForm.distance_from_university} onChange={e => setHostelForm({...hostelForm, distance_from_university: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Full Address</label>
                <input className="form-input" placeholder="Street, Area" value={hostelForm.address} onChange={e => setHostelForm({...hostelForm, address: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Describe your property..." value={hostelForm.description} onChange={e => setHostelForm({...hostelForm, description: e.target.value})} />
              </div>

              <div className="section-divider">Nearby Universities</div>
              <p style={{fontSize:'13px',color:'#94a3b8',marginBottom:'10px'}}>Select all universities that are near your hostel</p>
              <div className="unis-grid">
                {universities.map(u => (
                  <div
                    key={u.id}
                    className={`uni-chip ${selectedUniversities.includes(u.id) ? 'selected' : ''}`}
                    onClick={() => {
                      toggleUniversity(u.id);
                      if (!hostelForm.university_id) setHostelForm({...hostelForm, university_id: u.id});
                    }}
                  >
                    <div className="uni-check">
                      {selectedUniversities.includes(u.id) && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {u.short_name || u.name}
                  </div>
                ))}
              </div>

              <div className="section-divider" style={{marginTop:'20px'}}>Amenities</div>
              <p style={{fontSize:'13px',color:'#94a3b8',marginBottom:'10px'}}>Select all amenities available in your property</p>
              <div className="amenities-grid">
                {Object.entries(AMENITY_ICONS).map(([name, icon]) => (
                  <div
                    key={name}
                    className={`amenity-chip ${selectedAmenities.includes(name) ? 'selected' : ''}`}
                    onClick={() => toggleAmenity(name)}
                  >
                    <span className="material-icons amenity-chip-icon">{icon}</span>
                    <span className="amenity-chip-label">{name}</span>
                  </div>
                ))}
              </div>

              <div className="section-divider" style={{marginTop:'20px'}}>Property Photo</div>
              <div className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <>
                    <div className="upload-icon">📸</div>
                    <div className="upload-text">Click to upload a photo of your property</div>
                    <div className="upload-hint">JPG, PNG up to 5MB</div>
                  </>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowHostelForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={formLoading}>
                  {formLoading ? 'Submitting...' : 'Submit Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ROOM MODAL */}
      {showRoomForm && selectedHostel && (
        <div className="modal-overlay" onClick={() => setShowRoomForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Add Room to {selectedHostel.name}</div>
            <div className="modal-sub">Define the room type, capacity and pricing.</div>

            <form onSubmit={handleSubmitRoom}>
              <div className="section-divider">Room Type</div>
              <div className="room-types-grid">
                {ROOM_TYPES.map(rt => (
                  <div
                    key={rt.value}
                    className={`room-type-card ${roomForm.room_type === rt.value ? 'selected' : ''}`}
                    onClick={() => setRoomForm({...roomForm, room_type: rt.value, capacity: rt.value.includes('2') ? '2' : rt.value.includes('3') ? '3' : rt.value.includes('4') ? '4' : '1'})}
                  >
                    <span className="material-icons room-type-icon" style={{fontSize:'28px',color:'#1a56db'}}>{rt.icon}</span>
                    <span className="room-type-label">{rt.label}</span>
                    <span className="room-type-desc">{rt.desc}</span>
                  </div>
                ))}
              </div>

              <div className="section-divider" style={{marginTop:'20px'}}>Room Details</div>
              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Price Per Semester (TZS) — per person</label>
                  <input className="form-input" type="number" placeholder="400000" value={roomForm.price_per_month} onChange={e => setRoomForm({...roomForm, price_per_month: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Capacity (persons)</label>
                  <input className="form-input" type="number" min="1" max="10" placeholder="1" value={roomForm.capacity} onChange={e => setRoomForm({...roomForm, capacity: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Available Rooms</label>
                  <input className="form-input" type="number" min="1" placeholder="5" value={roomForm.available_count} onChange={e => setRoomForm({...roomForm, available_count: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Room Description (optional)</label>
                <textarea className="form-textarea" placeholder="Describe the room, what is included..." value={roomForm.description} onChange={e => setRoomForm({...roomForm, description: e.target.value})} />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowRoomForm(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={formLoading || !roomForm.room_type}>
                  {formLoading ? 'Adding...' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}