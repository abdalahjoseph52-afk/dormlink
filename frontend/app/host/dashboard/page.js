
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AMENITIES = ['WiFi','Water','Security','Kitchen','Parking','Laundry','Generator','CCTV','Gym','Study Room','Hot Shower','Furnished'];
const ROOM_TYPES = ['Single Room','Double Room','Triple Room','Quad Room','Self Contained','Studio'];
const ROOM_CAPACITIES = { 'Single Room': 1, 'Double Room': 2, 'Triple Room': 3, 'Quad Room': 4, 'Self Contained': 2, 'Studio': 1 };

const SB = {
  pending:              { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b', label: 'Pending' },
  confirmed:            { bg: '#d1fae5', color: '#065f46', dot: '#10b981', label: 'Confirmed' },
  cancelled:            { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444', label: 'Cancelled' },
  unpaid:               { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444', label: 'Unpaid' },
  pending_confirmation: { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b', label: 'Verifying' },
  paid:                 { bg: '#d1fae5', color: '#065f46', dot: '#10b981', label: 'Paid' },
  approved:             { bg: '#d1fae5', color: '#065f46', dot: '#10b981', label: 'Live' },
  rejected:             { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444', label: 'Rejected' },
};

export default function HostDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [hostels, setHostels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState('hostels');
  const [subTab, setSubTab] = useState(null); // hostel id for room view
  const [sideOpen, setSideOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');

  // Forms
  const [hostelForm, setHostelForm] = useState({ name:'', city:'', address:'', description:'', university_id:'', distance_from_university:'', amenities:[], transport_notes:'', latitude:'', longitude:'' });
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [roomForm, setRoomForm]  = useState({ room_label:'', room_type:'Single Room', floor:'', capacity:1, price_per_semester:'', available_count:1, description:'', features:[] });

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

  // ── Google Maps Places Autocomplete ─────────────────────────────
  const loadGoogleMaps = () => {
    if (window.google?.maps?.places) { setMapsLoaded(true); return; }
    if (document.getElementById('gmaps-script')) return;
    const script = document.createElement('script');
    script.id = 'gmaps-script';
    // Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to your .env.local file
    // Get key at: console.cloud.google.com → Enable Places API + Maps JavaScript API
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&libraries=places&callback=dormLinkMapsInit`;
    script.async = true; script.defer = true;
    window.dormLinkMapsInit = () => setMapsLoaded(true);
    document.head.appendChild(script);
  };

  const initAutocomplete = () => {
    if (!mapsLoaded || !addressInputRef.current || !window.google?.maps?.places) return;
    if (autocompleteRef.current) return;
    const ac = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'tz' },
      fields: ['formatted_address', 'geometry', 'address_components'],
    });
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      if (!place.geometry) return;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      let city = '';
      for (const comp of place.address_components || []) {
        if (comp.types.includes('locality') || comp.types.includes('administrative_area_level_2')) {
          city = comp.long_name; break;
        }
      }
      autocompleteRef._lastLatLng = { lat, lng };
      setHostelForm(f => ({ ...f, address: place.formatted_address, latitude: lat.toFixed(6), longitude: lng.toFixed(6), city: city || f.city }));
    });
    autocompleteRef.current = ac;
  };

  // Haversine distance in km between two lat/lng points
  const haversine = (lat1, lng1, lat2, lng2) => {
    const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLng = (lng2-lng1)*Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(2);
  };

  // Known coordinates for Tanzania universities
  const UNI_COORDS = {
    'UDSM':     [-6.7702, 39.2135], 'CoET':     [-6.7702, 39.2135],
    'MUHAS':    [-6.8022, 39.2092], 'DIT':      [-6.8196, 39.2803],
    'IFM':      [-6.8009, 39.2796], 'ISW':      [-6.7867, 39.2574],
    'ARU':      [-6.7737, 39.2215], 'OUT':      [-6.7851, 39.2183],
    'UDOM':     [-6.1765, 35.7394], 'SUA':      [-6.8484, 37.6503],
    'MU':       [-6.9048, 37.6710], 'NM-AIST':  [-3.3991, 36.9972],
    'MoCU':     [-3.3464, 37.3445], 'SAUT':     [-2.4936, 32.9002],
    'MUST':     [-8.9153, 33.4563], 'BUGANDO':  [-2.5180, 32.8964],
    'TIA':      [-6.8012, 39.2728], 'RUCU':     [-7.7714, 35.7157],
    'MUCE':     [-7.7714, 35.7157], 'ZU':       [-6.1638, 39.1915],
    'SUZA':     [-6.1590, 39.1968], 'AKU':      [-6.7924, 39.2083],
    'IMTU':     [-6.7712, 39.2498], 'MUM':      [-6.8290, 37.6534],
  };

  const autoCalcDistance = (uniShort) => {
    const llng = autocompleteRef._lastLatLng;
    if (!llng) return;
    const coords = UNI_COORDS[uniShort];
    if (!coords) return;
    const dist = haversine(llng.lat, llng.lng, coords[0], coords[1]);
    setHostelForm(f => ({ ...f, distance_from_university: dist }));
    toast.success(`Distance calculated: ${dist} km from ${uniShort}`);
  };

  useEffect(() => { loadGoogleMaps(); }, []);
  useEffect(() => {
    if (mapsLoaded && (modal?.type === 'add_hostel' || modal?.type === 'edit_hostel')) {
      setTimeout(initAutocomplete, 150);
    }
    if (!modal) { autocompleteRef.current = null; }
  }, [mapsLoaded, modal]);

    const submitHostel = async () => {
    if (!hostelForm.name || !hostelForm.city || !hostelForm.address) { toast.error('Name, city and address required'); return; }
    setActionLoading(true);
    try {
      if (modal?.type === 'edit_hostel') {
        await api.patch(`/host/hostels/${modal.item.id}`, hostelForm);
        toast.success('Hostel updated');
      } else {
        await api.post('/host/hostels', hostelForm);
        toast.success('Hostel submitted for admin review!');
      }
      fetchAll(); setModal(null);
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const submitRoom = async () => {
    if (!roomForm.room_label || !roomForm.price_per_semester) { toast.error('Room label and price required'); return; }
    setActionLoading(true);
    try {
      const hostelId = modal?.hostelId;
      if (modal?.type === 'edit_room') {
        await api.patch(`/host/rooms/${modal.item.id}`, roomForm);
        toast.success('Room updated');
      } else {
        await api.post(`/host/hostels/${hostelId}/rooms`, roomForm);
        toast.success('Room added!');
      }
      fetchAll(); setModal(null);
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const deleteRoom = async (roomId) => {
    setActionLoading(true);
    try {
      await api.delete(`/host/rooms/${roomId}`);
      toast.success('Room deleted'); fetchAll();
    } catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const confirmBooking = async (id) => {
    setActionLoading(true);
    try { await api.patch(`/host/bookings/${id}/confirm`); toast.success('Booking confirmed! Student notified.'); fetchAll(); }
    catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const rejectBooking = async (id) => {
    setActionLoading(true);
    try { await api.patch(`/host/bookings/${id}/reject`); toast.success('Booking rejected'); fetchAll(); }
    catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const deleteAccount = async () => {
    if (!deletePassword) { toast.error('Enter password'); return; }
    setActionLoading(true);
    try { await api.delete('/host/account', { data: { password: deletePassword } }); logout(); router.push('/'); }
    catch (e) { toast.error(e.response?.data?.error || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const openAddRoom = (hostelId) => {
    setRoomForm({ room_label:'', room_type:'Single Room', floor:'', capacity:1, price_per_semester:'', available_count:1, description:'', features:[] });
    setModal({ type: 'add_room', hostelId });
  };
  const openEditRoom = (room) => {
    setRoomForm({ ...room });
    setModal({ type: 'edit_room', item: room });
  };
  const openAddHostel = () => {
    setHostelForm({ name:'', city:'', address:'', description:'', university_id:'', distance_from_university:'', amenities:[], transport_notes:'', latitude:'', longitude:'' });
    autocompleteRef._lastLatLng = null;
    setModal({ type: 'add_hostel' });
  };
  const openEditHostel = (h) => {
    setHostelForm({ name:h.name, city:h.city, address:h.address, description:h.description||'', university_id:h.university_id||'', distance_from_university:h.distance_from_university||'', amenities:h.amenities||[], transport_notes:h.transport_notes||'', latitude:h.latitude||'', longitude:h.longitude||'' });
    if (h.latitude && h.longitude) {
      autocompleteRef._lastLatLng = { lat: parseFloat(h.latitude), lng: parseFloat(h.longitude) };
    }
    setModal({ type: 'edit_hostel', item: h });
  };

  const toggleAmenity = (a) => setHostelForm(f => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter(x=>x!==a) : [...f.amenities, a] }));
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const selectedHostel = hostels.find(h => h.id === subTab);

  if (loading) return <Loader/>;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{CSS}</style>

      <div className="layout">
        {sideOpen && <div className="overlay" onClick={() => setSideOpen(false)}/>}

        <aside className={`sidebar ${sideOpen ? 'open' : ''}`}>
          <div className="sb-brand">
            <div className="sb-logo"><svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#10367D" stroke="white" strokeWidth="7"/><path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"/><rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/><circle cx="70" cy="22" r="5.5" fill="#B5CE00"/><circle cx="73" cy="68" r="7.5" stroke="white" strokeWidth="4" fill="none"/><line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="white" strokeWidth="4" strokeLinecap="round"/></svg></div>
            <span className="sb-name"><span style={{fontWeight:300}}>Saka</span><span style={{fontWeight:700}}>Boma</span></span>
          </div>

          <div className="sb-user">
            <div className="sb-av">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
            <div>
              <div className="sb-fullname">{user?.first_name} {user?.last_name}</div>
              <div className="sb-tag">Host</div>
            </div>
          </div>

          <nav className="sb-nav">
            {[
              { id: 'hostels',  icon: 'apartment',   label: 'My Properties' },
              { id: 'bookings', icon: 'receipt_long', label: 'Bookings', count: pendingBookings.length },
              { id: 'account',  icon: 'manage_accounts', label: 'Account' },
            ].map(n => (
              <button key={n.id} className={`sb-btn ${tab===n.id&&!subTab?'active':''}`}
                onClick={() => { setTab(n.id); setSubTab(null); setSideOpen(false); }}>
                <span className="material-icons-round sb-icon">{n.icon}</span>
                <span>{n.label}</span>
                {n.count > 0 && <span className="sb-count">{n.count}</span>}
              </button>
            ))}
          </nav>

          <div className="sb-foot">
            <button className="sb-signout" onClick={logout}>
              <span className="material-icons-round" style={{fontSize:'15px'}}>logout</span>
              Sign out
            </button>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div className="tb-left">
              <button className="hamburger" onClick={() => setSideOpen(true)}>
                <span className="material-icons-round">menu</span>
              </button>
              {subTab ? (
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <button className="back-btn" onClick={() => setSubTab(null)}>
                    <span className="material-icons-round" style={{fontSize:'16px'}}>arrow_back</span>
                  </button>
                  <span className="tb-title">{selectedHostel?.name} \u2014 Rooms</span>
                </div>
              ) : (
                <span className="tb-title">
                  {tab==='hostels'  && 'My Properties'}
                  {tab==='bookings' && 'Bookings'}
                  {tab==='account'  && 'Account'}
                </span>
              )}
            </div>
            {tab === 'hostels' && !subTab && (
              <button className="tb-cta" onClick={openAddHostel}>
                <span className="material-icons-round" style={{fontSize:'15px'}}>add</span>
                Add Property
              </button>
            )}
            {subTab && (
              <button className="tb-cta" onClick={() => openAddRoom(subTab)}>
                <span className="material-icons-round" style={{fontSize:'15px'}}>add</span>
                Add Room
              </button>
            )}
          </header>

          <div className="content">
            {/* STATS */}
            {!subTab && (
              <div className="stats">
                {[
                  { n: hostels.length, l: 'Properties', icon: 'apartment' },
                  { n: hostels.filter(h=>h.status==='approved').length, l: 'Live', icon: 'check_circle', good: true },
                  { n: bookings.length, l: 'Bookings', icon: 'receipt_long' },
                  { n: pendingBookings.length, l: 'Need Review', icon: 'schedule', warn: pendingBookings.length > 0 },
                ].map((s, i) => (
                  <div key={i} className={`stat ${s.good&&s.n>0?'good':s.warn&&s.n>0?'warn':''}`}>
                    <span className="material-icons-round stat-icon">{s.icon}</span>
                    <div className="stat-n">{s.n}</div>
                    <div className="stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            )}

            {/* HOSTELS LIST */}
            {tab === 'hostels' && !subTab && (
              <div className="panel">
                <div className="panel-hd">
                  <div className="panel-title">Properties</div>
                  <div className="panel-sub">{hostels.length} total</div>
                </div>
                {dataLoading ? <div className="empty"><Spinner/></div>
                : hostels.length === 0 ? (
                  <div className="empty">
                    <span className="material-icons-round" style={{fontSize:'40px',color:'#cbd5e1',display:'block',marginBottom:'12px'}}>apartment</span>
                    <div style={{fontWeight:'500',color:'#475569',marginBottom:'4px'}}>No properties yet</div>
                    <div style={{fontSize:'13px',color:'#94a3b8',marginBottom:'16px'}}>Add your first hostel to start receiving bookings</div>
                    <button className="btn-primary" onClick={openAddHostel}>Add Property</button>
                  </div>
                ) : (
                  <div className="hostel-list">
                    {hostels.map(h => {
                      const st = SB[h.status] || SB.pending;
                      const totalRooms = h.rooms?.length || 0;
                      const availRooms = h.rooms?.filter(r => !r.is_full).length || 0;
                      return (
                        <div key={h.id} className="hostel-row">
                          <div className="hostel-row-left">
                            <div className="hostel-icon">
                              <span className="material-icons-round" style={{fontSize:'20px',color:'#64748b'}}>apartment</span>
                            </div>
                            <div>
                              <div className="hostel-name">{h.name}</div>
                              <div className="hostel-meta">
                                <span><span className="material-icons-round" style={{fontSize:'12px',verticalAlign:'middle'}}>place</span> {h.city}</span>
                                {h.universities?.name && <span>\u00b7 {h.universities.name}</span>}
                                <span>\u00b7 {totalRooms} rooms</span>
                                {totalRooms > 0 && <span style={{color:availRooms===0?'#ef4444':'#10b981'}}>\u00b7 {availRooms} available</span>}
                              </div>
                            </div>
                          </div>
                          <div className="hostel-row-right">
                            <span className="badge" style={{background:st.bg,color:st.color}}>
                              <span style={{width:'5px',height:'5px',borderRadius:'50%',background:st.dot,display:'inline-block',marginRight:'5px'}}/>
                              {st.label}
                            </span>
                            <div className="act-row">
                              {h.status === 'approved' && (
                                <button className="act-btn blue" onClick={() => setSubTab(h.id)}>
                                  <span className="material-icons-round" style={{fontSize:'13px'}}>bed</span>
                                  Rooms
                                </button>
                              )}
                              <button className="act-btn gray" onClick={() => openEditHostel(h)}>
                                <span className="material-icons-round" style={{fontSize:'13px'}}>edit</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ROOMS VIEW */}
            {tab === 'hostels' && subTab && selectedHostel && (
              <div>
                <div className="hostel-summary-bar">
                  <div>
                    <div style={{fontWeight:'600',color:'#060E1C'}}>{selectedHostel.name}</div>
                    <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{selectedHostel.address} \u00b7 {selectedHostel.city}</div>
                  </div>
                  <div style={{display:'flex',gap:'16px',fontSize:'13px'}}>
                    <div><strong>{selectedHostel.rooms?.length || 0}</strong> <span style={{color:'#94a3b8'}}>rooms</span></div>
                    <div><strong style={{color:'#10b981'}}>{selectedHostel.rooms?.filter(r=>!r.is_full).length || 0}</strong> <span style={{color:'#94a3b8'}}>available</span></div>
                  </div>
                </div>

                {!selectedHostel.rooms?.length ? (
                  <div className="panel">
                    <div className="empty">
                      <span className="material-icons-round" style={{fontSize:'40px',color:'#cbd5e1',display:'block',marginBottom:'12px'}}>bed</span>
                      <div style={{fontWeight:'500',color:'#475569',marginBottom:'4px'}}>No rooms added yet</div>
                      <div style={{fontSize:'13px',color:'#94a3b8',marginBottom:'16px'}}>Add rooms one by one with labels like "A101", "B205"</div>
                      <button className="btn-primary" onClick={() => openAddRoom(subTab)}>Add First Room</button>
                    </div>
                  </div>
                ) : (
                  <div className="rooms-grid">
                    {selectedHostel.rooms.map(room => (
                      <div key={room.id} className={`room-tile ${room.is_full ? 'full' : ''}`}>
                        <div className="room-tile-head">
                          <div className="room-label-badge">{room.room_label || 'Room'}</div>
                          {room.is_full ? (
                            <span className="room-status-badge full">Full</span>
                          ) : (
                            <span className="room-status-badge avail">{room.available_count} left</span>
                          )}
                        </div>
                        <div className="room-tile-type">{room.room_type}</div>
                        {room.floor && <div className="room-tile-meta">Floor {room.floor}</div>}
                        <div className="room-tile-info">
                          <div className="room-info-item">
                            <span className="material-icons-round" style={{fontSize:'14px',color:'#94a3b8'}}>people</span>
                            {room.capacity} person{room.capacity>1?'s':''}
                          </div>
                          <div className="room-info-item" style={{color:'#0B2960',fontWeight:'600'}}>
                            TZS {parseFloat(room.price_per_semester||0).toLocaleString()}/sem
                          </div>
                        </div>
                        {room.description && <div className="room-tile-desc">{room.description}</div>}
                        {room.features?.length > 0 && (
                          <div className="room-features">
                            {room.features.slice(0,3).map((f,i) => <span key={i} className="room-feat-chip">{f}</span>)}
                          </div>
                        )}
                        <div className="room-tile-actions">
                          <button className="act-btn gray" style={{flex:1,justifyContent:'center'}} onClick={() => openEditRoom(room)}>
                            <span className="material-icons-round" style={{fontSize:'13px'}}>edit</span>
                            Edit
                          </button>
                          <button className="act-btn red" onClick={() => { if(confirm('Delete this room?')) deleteRoom(room.id); }}>
                            <span className="material-icons-round" style={{fontSize:'13px'}}>delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="room-tile add-room-tile" onClick={() => openAddRoom(subTab)}>
                      <span className="material-icons-round" style={{fontSize:'28px',color:'#cbd5e1',marginBottom:'8px'}}>add_circle_outline</span>
                      <div style={{fontSize:'13px',color:'#94a3b8',fontWeight:'500'}}>Add Room</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BOOKINGS */}
            {tab === 'bookings' && (
              <div className="panel">
                <div className="panel-hd">
                  <div className="panel-title">Bookings</div>
                  <div className="panel-sub">{pendingBookings.length} pending review</div>
                </div>
                {bookings.length === 0 ? (
                  <div className="empty">No bookings yet</div>
                ) : (
                  <>
                    <div className="tbl-wrap">
                      <table className="tbl">
                        <thead>
                          <tr><th>Student</th><th>Property</th><th>Room</th><th>Semester</th><th>Deposit</th><th>Status</th><th>Payment</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {bookings.map(b => {
                            const bs = SB[b.status] || SB.pending;
                            const ps = SB[b.payment_status] || SB.unpaid;
                            return (
                              <tr key={b.id} className={b.status==='pending'?'highlight':''}>
                                <td>
                                  <div className="cell-main">{b.users?.first_name} {b.users?.last_name}</div>
                                  <div className="cell-sub">{b.users?.phone}</div>
                                </td>
                                <td className="cell-main">{b.hostels?.name}</td>
                                <td>
                                  <div className="cell-main">{b.rooms?.room_label}</div>
                                  <div className="cell-sub">{b.rooms?.room_type}</div>
                                </td>
                                <td className="cell-sub">{b.semester}</td>
                                <td style={{color:'#0B2960',fontWeight:'600',fontSize:'13px'}}>TZS {parseFloat(b.deposit_amount||0).toLocaleString()}</td>
                                <td><Badge s={bs}/></td>
                                <td><Badge s={ps}/></td>
                                <td>
                                  <div className="act-row">
                                    {b.status==='pending' && <>
                                      <button className="act-btn green" onClick={() => confirmBooking(b.id)} disabled={actionLoading}>Confirm</button>
                                      <button className="act-btn red" onClick={() => rejectBooking(b.id)} disabled={actionLoading}>Reject</button>
                                    </>}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/* Mobile cards */}
                    <div className="mobile-cards">
                      {bookings.map(b => {
                        const bs = SB[b.status]||SB.pending;
                        return (
                          <div key={b.id} className="m-card" style={{background:b.status==='pending'?'#fffbeb':'white'}}>
                            <div className="m-card-top">
                              <div>
                                <div className="m-hostel">{b.users?.first_name} {b.users?.last_name}</div>
                                <div className="m-room">{b.hostels?.name} \u00b7 {b.rooms?.room_label} \u00b7 {b.semester}</div>
                              </div>
                              <Badge s={bs}/>
                            </div>
                            <div style={{fontSize:'14px',fontWeight:'600',color:'#0B2960',margin:'8px 0'}}>
                              Deposit: TZS {parseFloat(b.deposit_amount||0).toLocaleString()}
                            </div>
                            {b.status==='pending' && (
                              <div className="m-actions">
                                <button className="act-btn green" style={{flex:1,justifyContent:'center'}} onClick={() => confirmBooking(b.id)}>Confirm</button>
                                <button className="act-btn red" style={{flex:1,justifyContent:'center'}} onClick={() => rejectBooking(b.id)}>Reject</button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ACCOUNT */}
            {tab === 'account' && (
              <div className="panel">
                <div className="panel-hd"><div className="panel-title">Account Settings</div></div>
                <div style={{padding:'20px'}}>
                  <div className="acct-section">
                    <div className="acct-section-title">Profile</div>
                    <div className="acct-info-row">
                      <div className="sb-av" style={{width:'44px',height:'44px',fontSize:'16px'}}>{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
                      <div>
                        <div style={{fontWeight:'600',color:'#060E1C'}}>{user?.first_name} {user?.last_name}</div>
                        <div style={{fontSize:'13px',color:'#94a3b8'}}>{user?.email}</div>
                        <div style={{fontSize:'12px',color:'#94a3b8'}}>{user?.phone||'No phone'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="acct-section danger-zone">
                    <div className="acct-section-title" style={{color:'#ef4444'}}>Danger Zone</div>
                    <p style={{fontSize:'13px',color:'#64748b',marginBottom:'14px',lineHeight:'1.6'}}>
                      Permanently delete your host account and all properties.
                    </p>
                    <button className="btn-danger-outline" onClick={() => setModal({ type: 'delete_account' })}>
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

      {/* ADD / EDIT HOSTEL MODAL */}
      {(modal?.type === 'add_hostel' || modal?.type === 'edit_hostel') && (
        <BigModal title={modal.type==='edit_hostel' ? 'Edit Property' : 'Add New Property'} onClose={() => setModal(null)}>
          <div className="form-grid2">
            <FormField label="Property Name *">
              <input className="finput" placeholder="e.g. Sunrise Hostel" value={hostelForm.name} onChange={e => setHostelForm(f=>({...f,name:e.target.value}))}/>
            </FormField>
            <FormField label="City *">
              <input className="finput" placeholder="e.g. Dar es Salaam" value={hostelForm.city} onChange={e => setHostelForm(f=>({...f,city:e.target.value}))}/>
            </FormField>
          </div>
          <FormField label="Full Address *" hint={mapsLoaded ? "GPS autocomplete active — select from dropdown" : "Type address manually or add Maps API key for autocomplete"}>
            <div style={{position:'relative'}}>
              <input
                ref={addressInputRef}
                className="finput"
                placeholder="Type your hostel address in Tanzania..."
                defaultValue={hostelForm.address}
                onChange={e => setHostelForm(f=>({...f,address:e.target.value}))}
                style={{paddingRight:'36px'}}
              />
              <span className="material-icons-round" style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',fontSize:'16px',color:mapsLoaded?'#10b981':'#94a3b8'}}>
                {mapsLoaded ? 'my_location' : 'location_on'}
              </span>
            </div>
          </FormField>

          {hostelForm.latitude && hostelForm.longitude && (
            <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:'8px',padding:'8px 12px',marginBottom:'14px',fontSize:'12px',color:'#065f46',display:'flex',alignItems:'center',gap:'6px'}}>
              <span className="material-icons-round" style={{fontSize:'14px'}}>check_circle</span>
              GPS coordinates auto-detected: {hostelForm.latitude}, {hostelForm.longitude}
            </div>
          )}

          <div className="form-grid2">
            <FormField label="Distance from University (km)" hint="Auto-calculated when you pick address + university">
              <div style={{display:'flex',gap:'6px'}}>
                <input className="finput" type="number" step="0.1" placeholder="e.g. 0.5"
                  value={hostelForm.distance_from_university}
                  onChange={e => setHostelForm(f=>({...f,distance_from_university:e.target.value}))}
                  style={{flex:1}}
                />
                {autocompleteRef._lastLatLng && hostelForm.university_id && (
                  <button
                    type="button" title="Auto-calculate distance"
                    onClick={() => autoCalcDistance(hostelForm.university_id)}
                    style={{background:'#F4F7FC',border:'1.5px solid #B8CAEB',borderRadius:'8px',padding:'0 10px',cursor:'pointer',color:'#10367D',display:'flex',alignItems:'center',gap:'4px',fontSize:'12px',fontWeight:'600',whiteSpace:'nowrap'}}
                  >
                    <span className="material-icons-round" style={{fontSize:'14px'}}>straighten</span>
                    Calc
                  </button>
                )}
              </div>
            </FormField>
            <FormField label="Transport Notes">
              <input className="finput" placeholder="e.g. Bus 34 stops 200m away, TZS 300"
                value={hostelForm.transport_notes}
                onChange={e => setHostelForm(f=>({...f,transport_notes:e.target.value}))}/>
            </FormField>
          </div>
          <FormField label="Description">
            <textarea className="finput ftextarea" placeholder="Describe your hostel..." value={hostelForm.description} onChange={e => setHostelForm(f=>({...f,description:e.target.value}))}/>
          </FormField>
          <FormField label="Amenities">
            <div className="amenity-picker">
              {AMENITIES.map(a => (
                <button key={a} type="button" className={`amenity-opt ${hostelForm.amenities.includes(a)?'selected':''}`} onClick={() => toggleAmenity(a)}>
                  {hostelForm.amenities.includes(a) && <span className="material-icons-round" style={{fontSize:'12px'}}>check</span>}
                  {a}
                </button>
              ))}
            </div>
          </FormField>
          <div className="modal-acts">
            <button className="modal-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-primary" disabled={actionLoading} onClick={submitHostel}>
              {actionLoading ? 'Saving...' : modal.type==='edit_hostel' ? 'Save Changes' : 'Submit for Review'}
            </button>
          </div>
        </BigModal>
      )}

      {/* ADD / EDIT ROOM MODAL */}
      {(modal?.type === 'add_room' || modal?.type === 'edit_room') && (
        <BigModal title={modal.type==='edit_room' ? 'Edit Room' : 'Add Room'} onClose={() => setModal(null)}>
          <div className="form-grid2">
            <FormField label="Room Label *" hint="e.g. A101, B205, Ground-03">
              <input className="finput" placeholder="A101" value={roomForm.room_label} onChange={e => setRoomForm(f=>({...f,room_label:e.target.value.toUpperCase()}))}/>
            </FormField>
            <FormField label="Floor">
              <input className="finput" placeholder="Ground, 1st, 2nd..." value={roomForm.floor} onChange={e => setRoomForm(f=>({...f,floor:e.target.value}))}/>
            </FormField>
          </div>
          <FormField label="Room Type *">
            <div className="type-picker">
              {ROOM_TYPES.map(t => (
                <button key={t} type="button" className={`type-opt ${roomForm.room_type===t?'selected':''}`}
                  onClick={() => setRoomForm(f => ({ ...f, room_type: t, capacity: ROOM_CAPACITIES[t] || 1 }))}>
                  {t}
                </button>
              ))}
            </div>
          </FormField>
          <div className="form-grid3">
            <FormField label="Capacity (persons)">
              <input className="finput" type="number" min="1" max="20" value={roomForm.capacity} onChange={e => setRoomForm(f=>({...f,capacity:parseInt(e.target.value)||1}))}/>
            </FormField>
            <FormField label="Price / Semester (TZS) *">
              <input className="finput" type="number" placeholder="400000" value={roomForm.price_per_semester} onChange={e => setRoomForm(f=>({...f,price_per_semester:e.target.value}))}/>
            </FormField>
            <FormField label="Number of Rooms">
              <input className="finput" type="number" min="0" value={roomForm.available_count} onChange={e => setRoomForm(f=>({...f,available_count:parseInt(e.target.value)||0}))}/>
            </FormField>
          </div>
          {roomForm.price_per_semester > 0 && (
            <div className="price-hint">
              <span className="material-icons-round" style={{fontSize:'14px'}}>info</span>
              Deposit = <strong>TZS {(parseFloat(roomForm.price_per_semester)*0.5).toLocaleString()}</strong> (50%) \u00b7 Per person, per semester
            </div>
          )}
          <FormField label="Is Full?">
            <label style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',fontSize:'13px',color:'#475569'}}>
              <input type="checkbox" checked={roomForm.available_count === 0 || roomForm.is_full}
                onChange={e => setRoomForm(f=>({...f, is_full: e.target.checked, available_count: e.target.checked ? 0 : f.available_count || 1}))}/>
              Mark this room as full (no more bookings)
            </label>
          </FormField>
          <FormField label="Description">
            <textarea className="finput ftextarea" placeholder="Additional details about this specific room..." value={roomForm.description} onChange={e => setRoomForm(f=>({...f,description:e.target.value}))}/>
          </FormField>
          <div className="modal-acts">
            <button className="modal-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-primary" disabled={actionLoading} onClick={submitRoom}>
              {actionLoading ? 'Saving...' : modal.type==='edit_room' ? 'Save Changes' : 'Add Room'}
            </button>
          </div>
        </BigModal>
      )}

      {/* DELETE ACCOUNT */}
      {modal?.type === 'delete_account' && (
        <Modal title="Delete Account" onClose={() => setModal(null)}>
          <div style={{textAlign:'center',padding:'8px 0 16px'}}>
            <span className="material-icons-round" style={{fontSize:'40px',color:'#ef4444',display:'block',marginBottom:'12px'}}>delete_forever</span>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:'1.7',marginBottom:'16px'}}>
              This will permanently delete your account, all your properties, and cancel all pending bookings.
            </p>
          </div>
          <input className="modal-input" type="password" placeholder="Your password" value={deletePassword} onChange={e => setDeletePassword(e.target.value)}/>
          <div className="modal-acts">
            <button className="modal-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="modal-danger" disabled={actionLoading||!deletePassword} onClick={deleteAccount}>
              {actionLoading ? 'Deleting...' : 'Delete Forever'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

const Badge = ({ s }) => (
  <span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:s.bg,color:s.color,padding:'3px 9px',borderRadius:'20px',fontSize:'11px',fontWeight:'600',whiteSpace:'nowrap'}}>
    <span style={{width:'5px',height:'5px',borderRadius:'50%',background:s.dot,display:'inline-block'}}/>
    {s.label}
  </span>
);

const FormField = ({ label, hint, children }) => (
  <div className="form-field">
    <label className="form-label">{label}{hint && <span className="form-hint"> \u2014 {hint}</span>}</label>
    {children}
  </div>
);

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">{title}</span>
          <button className="modal-x" onClick={onClose}><span className="material-icons-round" style={{fontSize:'17px'}}>close</span></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function BigModal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box big" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">{title}</span>
          <button className="modal-x" onClick={onClose}><span className="material-icons-round" style={{fontSize:'17px'}}>close</span></button>
        </div>
        <div className="modal-body modal-scroll">{children}</div>
      </div>
    </div>
  );
}

const Spinner = () => <div style={{width:'24px',height:'24px',border:'2px solid #e2e8f0',borderTop:'2px solid #10367D',borderRadius:'50%',animation:'spin 0.7s linear infinite',margin:'0 auto'}}/>;
const Loader = () => <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#f8fafc'}}><Spinner/><style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style></div>;

const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;background:#f8fafc;color:#060E1C;font-size:14px;}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}

  .layout{display:flex;min-height:100vh;}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;backdrop-filter:blur(2px);}

  .sidebar{width:236px;background:white;border-right:1px solid #f1f5f9;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.25s cubic-bezier(.4,0,.2,1);}
  .sb-brand{display:flex;align-items:center;gap:8px;padding:18px 16px 14px;border-bottom:1px solid #f8fafc;}
  .sb-logo{width:28px;height:28px;background:linear-gradient(135deg,#0B2960,#10367D);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .sb-name{font-size:15px;font-family:'Outfit',sans-serif;color:#060E1C;letter-spacing:-0.02em;}
  .sb-user{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #f8fafc;}
  .sb-av{width:34px;height:34px;background:linear-gradient(135deg,#f0fdf4,#bbf7d0);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#166534;flex-shrink:0;}
  .sb-fullname{font-size:13px;font-weight:600;color:#060E1C;}
  .sb-tag{font-size:10px;color:#94a3b8;margin-top:1px;text-transform:uppercase;letter-spacing:0.5px;}
  .sb-nav{padding:10px 8px;flex:1;}
  .sb-btn{display:flex;align-items:center;gap:8px;width:100%;padding:9px 10px;border-radius:8px;border:none;background:none;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:#64748b;cursor:pointer;transition:all 0.15s;text-align:left;}
  .sb-btn:hover{background:#f8fafc;color:#060E1C;}
  .sb-btn.active{background:#F4F7FC;color:#0B2960;font-weight:600;}
  .sb-icon{font-size:17px!important;}
  .sb-count{background:#ef4444;color:white;border-radius:20px;padding:1px 6px;font-size:10px;font-weight:700;margin-left:auto;}
  .sb-foot{padding:12px;border-top:1px solid #f8fafc;}
  .sb-signout{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;background:none;border:1px solid #f1f5f9;padding:8px;border-radius:8px;font-size:12px;font-weight:500;color:#94a3b8;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .sb-signout:hover{border-color:#ef4444;color:#ef4444;}

  .main{margin-left:236px;flex:1;display:flex;flex-direction:column;}
  .topbar{background:white;border-bottom:1px solid #f1f5f9;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:50;}
  .tb-left{display:flex;align-items:center;gap:10px;}
  .tb-title{font-size:14px;font-weight:600;color:#060E1C;}
  .hamburger{display:none;background:none;border:none;cursor:pointer;color:#64748b;padding:2px;}
  .back-btn{display:flex;align-items:center;background:#f1f5f9;border:none;border-radius:7px;padding:5px;cursor:pointer;color:#475569;transition:all 0.15s;}
  .back-btn:hover{background:#e2e8f0;}
  .tb-cta{display:inline-flex;align-items:center;gap:6px;background:#060E1C;color:white;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .tb-cta:hover{background:#0D1830;}

  .content{padding:24px;flex:1;animation:fadeIn 0.3s ease;}

  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
  .stat{background:white;border:1px solid #f1f5f9;border-radius:12px;padding:16px;transition:all 0.2s;}
  .stat:hover{border-color:#e2e8f0;box-shadow:0 2px 10px rgba(0,0,0,0.04);}
  .stat.good{border-color:#d1fae5;background:#f0fdf4;}
  .stat.warn{border-color:#fde68a;background:#fffbeb;}
  .stat-icon{font-size:18px!important;color:#94a3b8;margin-bottom:10px;display:block;}
  .stat.good .stat-icon{color:#10b981;}
  .stat.warn .stat-icon{color:#f59e0b;}
  .stat-n{font-size:24px;font-weight:700;color:#060E1C;letter-spacing:-0.5px;}
  .stat-l{font-size:12px;color:#94a3b8;margin-top:2px;}

  .panel{background:white;border:1px solid #f1f5f9;border-radius:12px;overflow:hidden;}
  .panel-hd{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;}
  .panel-title{font-size:14px;font-weight:600;color:#060E1C;}
  .panel-sub{font-size:12px;color:#94a3b8;}

  .hostel-list{divide-y:1px solid #f1f5f9;}
  .hostel-row{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #f9fafb;transition:background 0.15s;}
  .hostel-row:last-child{border-bottom:none;}
  .hostel-row:hover{background:#fafafa;}
  .hostel-row-left{display:flex;align-items:center;gap:12px;flex:1;}
  .hostel-icon{width:38px;height:38px;background:#f1f5f9;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .hostel-name{font-size:13px;font-weight:600;color:#060E1C;}
  .hostel-meta{font-size:12px;color:#94a3b8;margin-top:2px;display:flex;align-items:center;gap:4px;flex-wrap:wrap;}
  .hostel-row-right{display:flex;align-items:center;gap:8px;}

  .hostel-summary-bar{background:white;border:1px solid #f1f5f9;border-radius:12px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;}

  /* ROOMS GRID */
  .rooms-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}
  .room-tile{background:white;border:1px solid #f1f5f9;border-radius:12px;padding:14px;transition:all 0.2s;position:relative;}
  .room-tile:hover{border-color:#e2e8f0;box-shadow:0 3px 12px rgba(0,0,0,0.06);}
  .room-tile.full{opacity:0.65;background:#f8fafc;}
  .room-tile.add-room-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-style:dashed;min-height:120px;}
  .room-tile.add-room-tile:hover{border-color:#7A8FB5;background:#F4F7FC;}
  .room-tile-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
  .room-label-badge{background:#060E1C;color:white;padding:3px 9px;border-radius:5px;font-size:12px;font-weight:700;letter-spacing:0.3px;font-family:monospace;}
  .room-status-badge{font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;}
  .room-status-badge.full{background:#fee2e2;color:#991b1b;}
  .room-status-badge.avail{background:#d1fae5;color:#065f46;}
  .room-tile-type{font-size:13px;font-weight:600;color:#060E1C;margin-bottom:2px;}
  .room-tile-meta{font-size:11px;color:#94a3b8;margin-bottom:8px;}
  .room-tile-info{display:flex;flex-direction:column;gap:4px;margin-bottom:8px;}
  .room-info-item{display:flex;align-items:center;gap:5px;font-size:12px;color:#475569;}
  .room-tile-desc{font-size:12px;color:#94a3b8;margin-bottom:8px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .room-features{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;}
  .room-feat-chip{background:#f1f5f9;color:#64748b;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:500;}
  .room-tile-actions{display:flex;gap:6px;}

  .badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;}
  .act-row{display:flex;gap:4px;flex-wrap:wrap;}
  .act-btn{border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:3px;white-space:nowrap;}
  .act-btn.blue{background:#D5DFEE;color:#10367D;}
  .act-btn.blue:hover{background:#B8CAEB;}
  .act-btn.green{background:#d1fae5;color:#065f46;}
  .act-btn.green:hover{background:#a7f3d0;}
  .act-btn.red{background:#fee2e2;color:#991b1b;}
  .act-btn.red:hover{background:#fecaca;}
  .act-btn.gray{background:#f1f5f9;color:#475569;}
  .act-btn.gray:hover{background:#e2e8f0;}

  .tbl-wrap{overflow-x:auto;}
  .tbl{width:100%;border-collapse:collapse;}
  .tbl th{text-align:left;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.5px;text-transform:uppercase;padding:10px 16px;background:#fafafa;border-bottom:1px solid #f1f5f9;white-space:nowrap;}
  .tbl td{padding:12px 16px;border-bottom:1px solid #f9fafb;vertical-align:middle;}
  .tbl tr:last-child td{border-bottom:none;}
  .tbl tr:hover td{background:#fafafa;}
  .tbl tr.highlight td{background:#fffbeb;}
  .cell-main{font-size:13px;font-weight:500;color:#060E1C;}
  .cell-sub{font-size:12px;color:#94a3b8;margin-top:2px;}
  td.cell-main{font-size:13px;font-weight:500;color:#060E1C;}
  td.cell-sub{font-size:12px;color:#94a3b8;}

  .mobile-cards{display:none;}
  .m-card{padding:16px;border-bottom:1px solid #f1f5f9;}
  .m-card:last-child{border-bottom:none;}
  .m-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;}
  .m-hostel{font-size:14px;font-weight:600;color:#060E1C;}
  .m-room{font-size:12px;color:#94a3b8;margin-top:2px;}
  .m-actions{display:flex;gap:6px;}

  .empty{padding:48px;text-align:center;color:#94a3b8;font-size:13px;}
  .btn-primary{display:inline-flex;align-items:center;background:#060E1C;color:white;padding:9px 20px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .btn-primary:hover{background:#0D1830;}

  .acct-section{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #f1f5f9;}
  .acct-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
  .acct-section-title{font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;}
  .acct-info-row{display:flex;align-items:center;gap:12px;}
  .danger-zone{background:#fff5f5;border:1px solid #fee2e2;border-radius:10px;padding:16px;}
  .btn-danger-outline{display:inline-flex;align-items:center;gap:6px;background:white;border:1.5px solid #ef4444;color:#ef4444;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .btn-danger-outline:hover{background:#fee2e2;}

  /* MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);}
  .modal-box{background:white;border-radius:14px;width:100%;max-width:400px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.2);}
  .modal-box.big{max-width:640px;}
  .modal-head{display:flex;align-items:center;justify-content:space-between;padding:15px 18px;border-bottom:1px solid #f1f5f9;}
  .modal-title{font-size:14px;font-weight:600;color:#060E1C;}
  .modal-x{background:#f1f5f9;border:none;width:26px;height:26px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;}
  .modal-body{padding:18px;}
  .modal-scroll{max-height:80vh;overflow-y:auto;}
  .modal-input{width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:14px;font-family:'Inter',sans-serif;outline:none;background:#f9fafb;margin-bottom:4px;transition:border 0.15s;}
  .modal-input:focus{border-color:#10367D;background:white;}
  .modal-acts{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;}
  .modal-cancel{background:#f1f5f9;color:#475569;border:none;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-cancel:hover{background:#e2e8f0;}
  .modal-primary{background:#060E1C;color:white;border:none;padding:9px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-primary:hover{background:#0D1830;}
  .modal-primary:disabled{opacity:0.5;cursor:not-allowed;}
  .modal-danger{background:#ef4444;color:white;border:none;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-danger:hover{background:#dc2626;}
  .modal-danger:disabled{opacity:0.5;cursor:not-allowed;}

  /* FORM */
  .form-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .form-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
  .form-field{margin-bottom:14px;}
  .form-label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px;}
  .form-hint{font-weight:400;color:#94a3b8;}
  .finput{width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:13px;font-family:'Inter',sans-serif;outline:none;background:#f9fafb;transition:border 0.15s;color:#060E1C;}
  .finput:focus{border-color:#10367D;background:white;}
  .ftextarea{min-height:72px;resize:vertical;}
  .amenity-picker{display:flex;flex-wrap:wrap;gap:6px;}
  .amenity-opt{border:1.5px solid #e2e8f0;background:#f9fafb;border-radius:7px;padding:5px 12px;font-size:12px;font-weight:500;color:#64748b;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;display:flex;align-items:center;gap:4px;}
  .amenity-opt:hover{border-color:#7A8FB5;color:#0B2960;}
  .amenity-opt.selected{border-color:#10367D;background:#F4F7FC;color:#0B2960;font-weight:600;}
  .type-picker{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}
  .type-opt{border:1.5px solid #e2e8f0;background:#f9fafb;border-radius:8px;padding:8px 10px;font-size:12px;font-weight:500;color:#64748b;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;text-align:center;}
  .type-opt:hover{border-color:#7A8FB5;color:#0B2960;}
  .type-opt.selected{border-color:#10367D;background:#F4F7FC;color:#0B2960;font-weight:600;}
  .price-hint{background:#F4F7FC;border:1px solid #B8CAEB;border-radius:8px;padding:8px 12px;font-size:12px;color:#0B2960;margin-bottom:12px;display:flex;align-items:center;gap:6px;}

  @media(max-width:1024px){.stats{grid-template-columns:repeat(2,1fr);}.form-grid3{grid-template-columns:1fr 1fr;}.rooms-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));}}
  @media(max-width:768px){
    .sidebar{transform:translateX(-100%);}
    .sidebar.open{transform:translateX(0);}
    .main{margin-left:0;}
    .hamburger{display:flex;}
    .content{padding:16px;}
    .topbar{padding:0 14px;}
    .stats{grid-template-columns:repeat(2,1fr);gap:10px;}
    .tbl-wrap{display:none;}
    .mobile-cards{display:block;}
    .form-grid2,.form-grid3{grid-template-columns:1fr;}
    .type-picker{grid-template-columns:1fr 1fr;}
    .rooms-grid{grid-template-columns:repeat(2,1fr);}
    .hostel-row-right{flex-direction:column;align-items:flex-end;gap:6px;}
  }
  @media(max-width:400px){.rooms-grid{grid-template-columns:1fr;}}
`;
