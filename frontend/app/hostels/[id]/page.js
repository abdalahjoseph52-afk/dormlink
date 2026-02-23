'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function HostelDetail({ params }) {
  const { id } = React.use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [booking, setBooking] = useState({ room_id: '', semester: '', special_requests: '' });

  useEffect(() => { fetchHostel(); }, []);

  const fetchHostel = async () => {
    try {
      const res = await api.get(`/hostels/${id}`);
      setHostel(res.data.hostel);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'student') { toast.error('Only students can book rooms'); return; }
    if (!selectedRoom) { toast.error('Please select a room type'); return; }
    if (!booking.semester) { toast.error('Please select a semester'); return; }
    setBookingLoading(true);
    try {
      await api.post('/bookings', {
        room_id: selectedRoom.id,
        semester: booking.semester,
        special_requests: booking.special_requests,
      });
      toast.success('Booking submitted! Awaiting host confirmation.');
      setBooking({ room_id: '', semester: '', special_requests: '' });
      setSelectedRoom(null);
    } catch (e) {
      toast.error(e.response?.data?.error || 'Booking failed. Try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const formatPrice = (p) => p ? `TZS ${parseFloat(p).toLocaleString()}` : '—';

  const STATUS = {
    available:   { label:'Available',   bg:'#f0fdf4', color:'#15803d', dot:'#22c55e' },
    occupied:    { label:'Occupied',    bg:'#fef2f2', color:'#dc2626', dot:'#ef4444' },
    maintenance: { label:'Maintenance', bg:'#fffbeb', color:'#d97706', dot:'#f59e0b' },
  };

  if (loading) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'\'Outfit\',sans-serif',color:'#7A8FB5',gap:12}}>
        <div style={{width:20,height:20,border:'2px solid #D5DFEE',borderTop:'2px solid #10367D',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/>
        Loading property details...
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    </>
  );

  if (!hostel) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'\'Outfit\',sans-serif',gap:16,color:'#7A8FB5'}}>
        <span className="material-icons-round" style={{fontSize:52,color:'#D5DFEE'}}>search_off</span>
        <div style={{fontSize:18,fontWeight:700,color:'#060E1C'}}>Property not found</div>
        <Link href="/" style={{color:'#10367D',fontWeight:600,textDecoration:'none',display:'flex',alignItems:'center',gap:6}}>
          <span className="material-icons-round" style={{fontSize:16}}>arrow_back</span>Back to home
        </Link>
      </div>
    </>
  );

  const rooms = hostel.rooms || [];
  const availableRooms = rooms.filter(r => r.status === 'available');

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Outfit',sans-serif;background:#F4F7FC;color:#060E1C;-webkit-font-smoothing:antialiased;}
        @keyframes spin{to{transform:rotate(360deg);}}

        /* NAV */
        .nav{background:white;border-bottom:1px solid #D5DFEE;position:sticky;top:0;z-index:100;}
        .nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
        .logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
        .logo-icon{width:30px;height:30px;}
        .logo-wm{font-family:'Outfit',sans-serif;font-size:18px;color:#060E1C;}
        .logo-wm strong{font-weight:700;}
        .nav-right{display:flex;align-items:center;gap:8px;}
        .btn-back{display:inline-flex;align-items:center;gap:6px;color:#7A8FB5;font-size:13px;font-weight:500;padding:8px 14px;border-radius:8px;text-decoration:none;transition:all 0.15s;border:1px solid #D5DFEE;background:white;}
        .btn-back:hover{background:#F4F7FC;color:#060E1C;}
        .btn-login{background:#10367D;color:white;padding:8px 18px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;}
        .btn-login:hover{background:#0B2960;}
        .btn-dash{border:1px solid #D5DFEE;background:white;color:#060E1C;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;}
        .btn-dash:hover{background:#F4F7FC;}

        /* HERO IMAGE */
        .hero-img{height:360px;background:linear-gradient(135deg,#060E1C 0%,#10367D 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
        .hero-img img{width:100%;height:100%;object-fit:cover;}
        .hero-img-ph{display:flex;flex-direction:column;align-items:center;gap:12px;}

        /* MAIN GRID */
        .main{max-width:1200px;margin:0 auto;padding:36px 24px 80px;display:grid;grid-template-columns:1fr 360px;gap:36px;align-items:start;}

        /* LEFT COLUMN */
        .hostel-name{font-size:clamp(22px,3vw,32px);font-weight:700;color:#060E1C;margin-bottom:12px;letter-spacing:-0.3px;line-height:1.2;}
        .meta-row{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:20px;}
        .meta-item{display:flex;align-items:center;gap:6px;font-size:13px;color:#7A8FB5;}
        .meta-item strong{color:#060E1C;font-weight:600;}
        .badge-status{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;}
        .badge-dot{width:6px;height:6px;border-radius:50%;}

        /* SECTION */
        .section{background:white;border:1px solid #D5DFEE;border-radius:12px;padding:24px;margin-bottom:20px;}
        .section-title{font-size:14px;font-weight:700;color:#060E1C;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
        .section-title span{color:#10367D;}
        .desc-text{font-size:14px;color:#7A8FB5;line-height:1.75;}

        /* AMENITIES */
        .amenities{display:flex;flex-wrap:wrap;gap:8px;}
        .amenity{display:inline-flex;align-items:center;gap:6px;background:#F4F7FC;border:1px solid #D5DFEE;color:#374151;padding:6px 12px;border-radius:8px;font-size:12px;font-weight:500;}

        /* ROOMS GRID */
        .rooms-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;}
        .room-card{border:1.5px solid #D5DFEE;border-radius:10px;padding:16px;cursor:pointer;transition:all 0.18s;background:white;}
        .room-card:hover{border-color:#10367D;box-shadow:0 2px 12px rgba(16,54,125,0.1);}
        .room-card.selected{border-color:#10367D;background:#F4F7FC;}
        .room-card.unavailable{opacity:0.55;cursor:not-allowed;}
        .room-type{font-size:14px;font-weight:700;color:#060E1C;margin-bottom:6px;}
        .room-price{font-size:16px;font-weight:700;color:#10367D;margin-bottom:8px;}
        .room-price span{font-size:12px;font-weight:400;color:#7A8FB5;}
        .room-detail{font-size:12px;color:#7A8FB5;display:flex;align-items:center;gap:4px;margin-bottom:4px;}

        /* BOOKING CARD */
        .book-card{background:white;border:1px solid #D5DFEE;border-radius:14px;padding:24px;position:sticky;top:80px;}
        .book-title{font-size:16px;font-weight:700;color:#060E1C;margin-bottom:4px;}
        .book-sub{font-size:13px;color:#7A8FB5;margin-bottom:20px;line-height:1.5;}
        .book-field{margin-bottom:14px;}
        .book-field label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px;}
        .book-field select,.book-field textarea{width:100%;padding:10px 13px;border:1.5px solid #D5DFEE;border-radius:8px;font-size:14px;font-family:'Outfit',sans-serif;color:#060E1C;background:white;outline:none;transition:border-color 0.18s;}
        .book-field select:focus,.book-field textarea:focus{border-color:#10367D;box-shadow:0 0 0 3px rgba(16,54,125,0.08);}
        .book-field textarea{resize:vertical;min-height:72px;}
        .selected-room-info{background:#F4F7FC;border:1px solid #D5DFEE;border-radius:8px;padding:12px 14px;margin-bottom:14px;}
        .selected-room-name{font-size:13px;font-weight:700;color:#060E1C;margin-bottom:2px;}
        .selected-room-price{font-size:14px;font-weight:700;color:#10367D;}
        .btn-book{width:100%;padding:13px;background:#10367D;color:white;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.18s;}
        .btn-book:hover:not(:disabled){background:#0B2960;}
        .btn-book:disabled{opacity:0.65;cursor:not-allowed;}
        .book-note{font-size:11px;color:#B8CAEB;text-align:center;margin-top:10px;line-height:1.6;}
        .login-prompt{background:#F4F7FC;border:1px solid #D5DFEE;border-radius:10px;padding:20px;text-align:center;}
        .login-prompt p{font-size:13px;color:#7A8FB5;margin-bottom:12px;line-height:1.6;}
        .login-prompt a{display:block;background:#10367D;color:white;padding:11px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;transition:background 0.15s;}
        .login-prompt a:hover{background:#0B2960;}

        /* HOST INFO */
        .host-row{display:flex;align-items:center;gap:14px;}
        .host-av{width:44px;height:44px;background:linear-gradient(135deg,#F4F7FC,#D5DFEE);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .host-name{font-size:14px;font-weight:700;color:#060E1C;}
        .host-since{font-size:12px;color:#7A8FB5;}

        /* DIVIDER */
        .divider{height:1px;background:#D5DFEE;margin:16px 0;}

        @media(max-width:900px){
          .main{grid-template-columns:1fr;gap:24px;}
          .book-card{position:static;}
          .hero-img{height:240px;}
        }
        @media(max-width:560px){
          .main{padding:20px 16px 60px;}
          .rooms-grid{grid-template-columns:1fr 1fr;}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <svg className="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" fill="white" stroke="#10367D" strokeWidth="7"/>
              <path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="#10367D" strokeWidth="6.5" strokeLinecap="round" fill="none"/>
              <rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/>
              <circle cx="70" cy="22" r="5.5" fill="#B5CE00"/>
              <circle cx="73" cy="68" r="7.5" stroke="#10367D" strokeWidth="4" fill="none"/>
              <line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="#10367D" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div className="logo-wm"><span style={{fontWeight:300}}>Saka</span><strong>Boma</strong></div>
          </Link>
          <div className="nav-right">
            <Link href="/" className="btn-back">
              <span className="material-icons-round" style={{fontSize:15}}>arrow_back</span>
              All Properties
            </Link>
            {user
              ? <Link href={`/${user.role}/dashboard`} className="btn-dash">Dashboard</Link>
              : <Link href="/login" className="btn-login">Sign In</Link>
            }
          </div>
        </div>
      </nav>

      {/* ── HERO IMAGE ── */}
      <div className="hero-img">
        {hostel.image_url
          ? <img src={hostel.image_url} alt={hostel.name}/>
          : <div className="hero-img-ph">
              <span className="material-icons-round" style={{fontSize:72,color:'rgba(255,255,255,0.25)'}}>apartment</span>
              <div style={{fontSize:14,color:'rgba(255,255,255,0.4)',fontWeight:500}}>No photos uploaded yet</div>
            </div>
        }
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="main">

        {/* LEFT — Property Info */}
        <div>
          {/* Name + Status */}
          <div className="hostel-name">{hostel.name}</div>
          <div className="meta-row">
            <div className="meta-item">
              <span className="material-icons-round" style={{fontSize:15,color:'#10367D'}}>place</span>
              <strong>{hostel.address || hostel.city}</strong>
            </div>
            {hostel.city && (
              <div className="meta-item">
                <span className="material-icons-round" style={{fontSize:15,color:'#10367D'}}>location_city</span>
                {hostel.city}
              </div>
            )}
            {hostel.distance_from_university && (
              <div className="meta-item">
                <span className="material-icons-round" style={{fontSize:15,color:'#10367D'}}>directions_walk</span>
                {hostel.distance_from_university} km from campus
              </div>
            )}
            {hostel.universities?.name && (
              <div className="meta-item">
                <span className="material-icons-round" style={{fontSize:15,color:'#10367D'}}>school</span>
                Near <strong>{hostel.universities.name}</strong>
              </div>
            )}
            {hostel.gender_restriction && hostel.gender_restriction !== 'any' && (
              <div className="meta-item">
                <span className="material-icons-round" style={{fontSize:15,color:'#10367D'}}>wc</span>
                {hostel.gender_restriction === 'male' ? 'Male Only' : 'Female Only'}
              </div>
            )}
          </div>

          {/* Description */}
          {hostel.description && (
            <div className="section">
              <div className="section-title">
                <span className="material-icons-round" style={{fontSize:16}}>info</span>
                About this property
              </div>
              <p className="desc-text">{hostel.description}</p>
            </div>
          )}

          {/* Amenities */}
          {hostel.amenities?.length > 0 && (
            <div className="section">
              <div className="section-title">
                <span className="material-icons-round" style={{fontSize:16}}>check_circle</span>
                Amenities & Features
              </div>
              <div className="amenities">
                {hostel.amenities.map(a => (
                  <div key={a} className="amenity">
                    <span className="material-icons-round" style={{fontSize:14,color:'#10367D'}}>done</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rooms */}
          <div className="section">
            <div className="section-title">
              <span className="material-icons-round" style={{fontSize:16}}>bed</span>
              Available Room Types
              <span style={{marginLeft:'auto',fontSize:12,fontWeight:400,color:'#7A8FB5'}}>{availableRooms.length} available</span>
            </div>
            {rooms.length === 0 ? (
              <div style={{textAlign:'center',padding:'32px 0',color:'#B8CAEB'}}>
                <span className="material-icons-round" style={{fontSize:40,display:'block',marginBottom:8}}>bed</span>
                No rooms listed yet
              </div>
            ) : (
              <div className="rooms-grid">
                {rooms.map(room => {
                  const s = STATUS[room.status] || STATUS.available;
                  const isAvail = room.status === 'available';
                  return (
                    <div
                      key={room.id}
                      className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''} ${!isAvail ? 'unavailable' : ''}`}
                      onClick={() => isAvail && setSelectedRoom(room)}
                    >
                      <div className="room-type">{room.room_type}</div>
                      <div className="room-price">
                        {formatPrice(room.price_per_semester)}
                        <span> / semester</span>
                      </div>
                      {room.price_per_month && (
                        <div className="room-detail">
                          <span className="material-icons-round" style={{fontSize:12}}>calendar_month</span>
                          {formatPrice(room.price_per_month)} / month
                        </div>
                      )}
                      {room.capacity && (
                        <div className="room-detail">
                          <span className="material-icons-round" style={{fontSize:12}}>people</span>
                          Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                        </div>
                      )}
                      <div style={{marginTop:8}}>
                        <span className="badge-status" style={{background:s.bg,color:s.color}}>
                          <span className="badge-dot" style={{background:s.dot}}/>
                          {s.label}
                        </span>
                      </div>
                      {selectedRoom?.id === room.id && (
                        <div style={{marginTop:8,fontSize:11,color:'#10367D',fontWeight:600,display:'flex',alignItems:'center',gap:4}}>
                          <span className="material-icons-round" style={{fontSize:13}}>check_circle</span>
                          Selected
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Host Info */}
          {hostel.users && (
            <div className="section">
              <div className="section-title">
                <span className="material-icons-round" style={{fontSize:16}}>person</span>
                Property Owner
              </div>
              <div className="host-row">
                <div className="host-av">
                  <span className="material-icons-round" style={{fontSize:22,color:'#7A8FB5'}}>person</span>
                </div>
                <div>
                  <div className="host-name">{hostel.users.first_name} {hostel.users.last_name}</div>
                  {hostel.users.phone && (
                    <div className="host-since" style={{display:'flex',alignItems:'center',gap:4,marginTop:4}}>
                      <span className="material-icons-round" style={{fontSize:12}}>phone</span>
                      {hostel.users.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Booking Card */}
        <div>
          <div className="book-card">
            {availableRooms.length === 0 ? (
              <>
                <div className="book-title">No Rooms Available</div>
                <div className="book-sub">All rooms are currently occupied or under maintenance. Check back soon or explore other properties.</div>
                <Link href="/" style={{display:'block',background:'#F4F7FC',border:'1px solid #D5DFEE',color:'#10367D',padding:'11px',borderRadius:'8px',fontWeight:600,fontSize:13,textDecoration:'none',textAlign:'center'}}>
                  Browse other properties
                </Link>
              </>
            ) : !user ? (
              <>
                <div className="book-title">Book this Property</div>
                <div className="book-sub">Sign in to your student account to book a room.</div>
                <div className="login-prompt">
                  <p>You need a student account to make a booking on SakaBoma.</p>
                  <Link href="/login">Sign in to book</Link>
                  <div style={{marginTop:10,fontSize:12,color:'#B8CAEB'}}>
                    No account? <Link href="/register" style={{color:'#10367D',fontWeight:600}}>Register free</Link>
                  </div>
                </div>
              </>
            ) : user.role !== 'student' ? (
              <>
                <div className="book-title">Viewing as {user.role === 'host' ? 'Property Owner' : 'Admin'}</div>
                <div className="book-sub">Only student accounts can submit booking requests.</div>
              </>
            ) : (
              <form onSubmit={handleBook} noValidate>
                <div className="book-title">Request a Booking</div>
                <div className="book-sub">Select a room type and semester to submit your booking request.</div>

                {selectedRoom ? (
                  <div className="selected-room-info">
                    <div className="selected-room-name">{selectedRoom.room_type}</div>
                    <div className="selected-room-price">{formatPrice(selectedRoom.price_per_semester)} <span style={{fontSize:11,fontWeight:400,color:'#7A8FB5'}}>/ semester</span></div>
                    <button type="button" onClick={() => setSelectedRoom(null)} style={{marginTop:6,background:'none',border:'none',cursor:'pointer',fontSize:11,color:'#7A8FB5',padding:0,fontFamily:'Outfit,sans-serif',display:'flex',alignItems:'center',gap:3}}>
                      <span className="material-icons-round" style={{fontSize:11}}>close</span>Change room
                    </button>
                  </div>
                ) : (
                  <div className="book-field">
                    <label>Select Room Type</label>
                    <select value="" onChange={e => {
                      const r = rooms.find(rm => rm.id === e.target.value);
                      if (r) setSelectedRoom(r);
                    }}>
                      <option value="">Choose a room type...</option>
                      {availableRooms.map(r => (
                        <option key={r.id} value={r.id}>{r.room_type} — {formatPrice(r.price_per_semester)}/sem</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="book-field">
                  <label>Semester</label>
                  <select value={booking.semester} onChange={e=>setBooking(b=>({...b,semester:e.target.value}))}>
                    <option value="">Select semester...</option>
                    <option value="Semester 1 2025/2026">Semester 1 — 2025/2026</option>
                    <option value="Semester 2 2025/2026">Semester 2 — 2025/2026</option>
                    <option value="Semester 1 2026/2027">Semester 1 — 2026/2027</option>
                    <option value="Semester 2 2026/2027">Semester 2 — 2026/2027</option>
                  </select>
                </div>

                <div className="book-field">
                  <label>Special Requests <span style={{color:'#B8CAEB',fontWeight:400}}>(optional)</span></label>
                  <textarea
                    placeholder="e.g. Ground floor preference, early move-in..."
                    value={booking.special_requests}
                    onChange={e=>setBooking(b=>({...b,special_requests:e.target.value}))}
                    rows={3}
                  />
                </div>

                <button type="submit" className="btn-book" disabled={bookingLoading || !selectedRoom || !booking.semester}>
                  {bookingLoading
                    ? <><div style={{width:16,height:16,border:'2px solid rgba(255,255,255,0.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/> Submitting...</>
                    : <><span className="material-icons-round" style={{fontSize:18}}>send</span> Submit Booking Request</>
                  }
                </button>
                <div className="book-note">
                  <span className="material-icons-round" style={{fontSize:12,verticalAlign:'middle',marginRight:3}}>info</span>
                  Booking requires host confirmation. Payment is made after approval.
                </div>
              </form>
            )}

            <div className="divider"/>
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#B8CAEB',justifyContent:'center'}}>
              <span className="material-icons-round" style={{fontSize:14,color:'#B5CE00'}}>verified</span>
              Verified SakaBoma property
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
