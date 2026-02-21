'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AMENITY_ICONS = {
  'WiFi': 'wifi', 'Water': 'water_drop', 'Security': 'security',
  'Kitchen': 'kitchen', 'Parking': 'local_parking', 'Laundry': 'local_laundry_service',
  'Generator': 'bolt', 'CCTV': 'videocam', 'Gym': 'fitness_center',
  'Study Room': 'menu_book', 'Cleaning': 'cleaning_services',
  'Air Conditioning': 'ac_unit', 'Hot Shower': 'shower',
  'Furnished': 'chair', 'Garden': 'park', 'Elevator': 'elevator',
};

export default function HostelDetailPage({ params }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => { fetchHostel(); }, []);

  const fetchHostel = async () => {
    try {
      const res = await api.get(`/hostels/${id}`);
      setHostel(res.data.hostel);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleBook = async () => {
    if (!user) { router.push('/login'); return; }
    if (!selectedRoom) { toast.error('Please select a room type'); return; }
    if (!selectedSemester) { toast.error('Please select a semester'); return; }
    setBooking(true);
    try {
      await api.post('/bookings', {
        room_id: selectedRoom.id,
        semester: selectedSemester,
        special_requests: specialRequests,
      });
      setBooked(true);
      toast.success('Booking submitted! Host will confirm soon.');
    } catch (e) {
      toast.error(e.response?.data?.error || 'Booking failed. Please try again.');
    } finally { setBooking(false); }
  };

  const getPriceDisplay = (room) => {
    const price = parseFloat(room.price_per_semester || (room.price_per_month * 4) || 0);
    return price > 0 ? `TZS ${price.toLocaleString()}` : 'Price on request';
  };

  if (loading) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'DM Sans,sans-serif',flexDirection:'column',gap:'16px'}}>
        <div style={{width:'40px',height:'40px',border:'3px solid #bfdbfe',borderTop:'3px solid #2563eb',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
        <div style={{color:'#64748b',fontSize:'15px'}}>Loading property...</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    </>
  );

  if (!hostel) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',flexDirection:'column',gap:'16px',fontFamily:'DM Sans,sans-serif'}}>
      <div style={{fontSize:'48px'}}>🏚️</div>
      <div style={{fontSize:'18px',fontWeight:'600',color:'#0f172a'}}>Property not found</div>
      <Link href="/" style={{color:'#2563eb',fontWeight:'600',textDecoration:'none'}}>← Back to listings</Link>
    </div>
  );

  const deposit = selectedRoom ? parseFloat((parseFloat(selectedRoom.price_per_semester || selectedRoom.price_per_month * 4 || 0) * (selectedSemester === 'Full Year' ? 2 : 1) * 0.5).toFixed(0)) : 0;
  const total = selectedRoom ? parseFloat((parseFloat(selectedRoom.price_per_semester || selectedRoom.price_per_month * 4 || 0) * (selectedSemester === 'Full Year' ? 2 : 1)).toFixed(0)) : 0;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{--blue:#2563eb;--navy:#0f172a;--muted:#64748b;--border:#e2e8f0;--bg:#f8fafc;}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--navy);}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}

        /* NAV */
        .nav{background:white;border-bottom:1px solid var(--border);height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:100;box-shadow:0 1px 8px rgba(0,0,0,0.04);}
        .nav-logo{font-family:'Sora',sans-serif;font-size:20px;font-weight:800;color:var(--blue);text-decoration:none;display:flex;align-items:center;gap:8px;}
        .logo-icon{width:30px;height:30px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:8px;display:flex;align-items:center;justify-content:center;}
        .nav-back{display:inline-flex;align-items:center;gap:6px;color:var(--muted);font-size:14px;font-weight:500;text-decoration:none;padding:8px 14px;border:1.5px solid var(--border);border-radius:50px;transition:all 0.2s;}
        .nav-back:hover{border-color:var(--blue);color:var(--blue);background:#eff6ff;}

        /* HERO IMAGE */
        .hero-img{width:100%;height:clamp(220px,40vw,480px);background:linear-gradient(135deg,#1e3a8a,#2563eb);position:relative;overflow:hidden;}
        .hero-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;}
        .hero-img:hover img{transform:scale(1.03);}
        .hero-placeholder{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#3b82f6 100%);}
        .verified-chip{position:absolute;top:20px;left:20px;background:white;border-radius:50px;padding:6px 14px;font-size:13px;font-weight:700;color:#16a34a;display:flex;align-items:center;gap:5px;box-shadow:0 2px 12px rgba(0,0,0,0.15);}
        .share-btn{position:absolute;top:20px;right:20px;background:white;border:none;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.15);transition:all 0.2s;}
        .share-btn:hover{transform:scale(1.1);}

        /* LAYOUT */
        .page-layout{max-width:1200px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:1fr 380px;gap:40px;animation:fadeUp 0.4s ease;}
        .left-col{}
        .right-col{position:sticky;top:80px;align-self:start;}

        /* HOSTEL INFO */
        .hostel-name{font-family:'Sora',sans-serif;font-size:clamp(24px,4vw,36px);font-weight:800;color:var(--navy);line-height:1.2;margin-bottom:12px;}
        .hostel-meta{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:24px;}
        .meta-item{display:flex;align-items:center;gap:6px;font-size:14px;color:var(--muted);}
        .meta-item a{color:var(--blue);font-weight:600;text-decoration:none;}
        .meta-item a:hover{text-decoration:underline;}
        .divider{border:none;border-top:1px solid var(--border);margin:24px 0;}

        /* SECTIONS */
        .sec-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:var(--navy);margin-bottom:16px;display:flex;align-items:center;gap:8px;}
        .sec-title span{color:var(--blue);}

        /* AMENITIES */
        .amenities-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;}
        .amenity-item{display:flex;align-items:center;gap:8px;padding:12px 14px;background:white;border:1.5px solid var(--border);border-radius:12px;font-size:13px;font-weight:500;color:var(--navy);transition:all 0.2s;}
        .amenity-item:hover{border-color:var(--blue);background:#eff6ff;transform:translateY(-2px);box-shadow:0 4px 12px rgba(37,99,235,0.1);}

        /* ROOM CARDS */
        .rooms-list{display:flex;flex-direction:column;gap:14px;}
        .room-card{background:white;border:2px solid var(--border);border-radius:16px;padding:20px;cursor:pointer;transition:all 0.25s;position:relative;overflow:hidden;}
        .room-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#eff6ff,#dbeafe);opacity:0;transition:opacity 0.25s;}
        .room-card:hover{border-color:#93c5fd;transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,99,235,0.12);}
        .room-card:hover::before{opacity:1;}
        .room-card.selected{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,0.15);}
        .room-card.selected::before{opacity:1;}
        .room-card-inner{position:relative;}
        .room-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;}
        .room-type{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;color:var(--navy);}
        .room-price{font-family:'Sora',sans-serif;font-size:18px;font-weight:800;color:var(--blue);}
        .room-price-label{font-size:11px;color:var(--muted);font-weight:400;}
        .room-details{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;}
        .room-detail-chip{display:flex;align-items:center;gap:5px;background:#f1f5f9;border-radius:50px;padding:4px 12px;font-size:12px;font-weight:500;color:var(--muted);}
        .room-desc{font-size:13px;color:var(--muted);line-height:1.6;}
        .room-select-indicator{position:absolute;top:16px;right:16px;width:24px;height:24px;border:2px solid var(--border);border-radius:50%;transition:all 0.2s;display:flex;align-items:center;justify-content:center;}
        .room-card.selected .room-select-indicator{background:var(--blue);border-color:var(--blue);}

        /* BOOKING CARD */
        .booking-card{background:white;border:1.5px solid var(--border);border-radius:20px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,0.07);}
        .booking-title{font-family:'Sora',sans-serif;font-size:20px;font-weight:800;color:var(--navy);margin-bottom:4px;}
        .booking-sub{font-size:13px;color:var(--muted);margin-bottom:20px;}
        .semester-btns{display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
        .semester-btn{border:2px solid var(--border);background:#f9fafb;border-radius:12px;padding:12px 16px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;text-align:left;transition:all 0.2s;display:flex;align-items:center;justify-content:space-between;color:var(--navy);}
        .semester-btn:hover{border-color:#93c5fd;background:#eff6ff;}
        .semester-btn.active{border-color:var(--blue);background:#eff6ff;color:var(--blue);}
        .semester-price{font-size:13px;color:var(--muted);font-weight:400;}
        .semester-btn.active .semester-price{color:#2563eb;}
        .price-breakdown{background:#f8fafc;border-radius:12px;padding:14px;margin-bottom:16px;}
        .price-row{display:flex;justify-content:space-between;align-items:center;font-size:14px;color:var(--muted);margin-bottom:8px;}
        .price-row:last-child{margin-bottom:0;border-top:1px solid var(--border);padding-top:10px;margin-top:4px;font-weight:700;color:var(--navy);font-size:15px;}
        .price-row:last-child span:last-child{color:var(--blue);}
        .special-input{width:100%;border:1.5px solid var(--border);border-radius:10px;padding:10px 14px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;resize:vertical;min-height:72px;margin-bottom:14px;transition:border 0.2s;background:#f9fafb;}
        .special-input:focus{border-color:var(--blue);background:white;box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
        .btn-book{width:100%;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:15px;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-book:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(37,99,235,0.3);}
        .btn-book:disabled{opacity:0.6;cursor:not-allowed;transform:none;box-shadow:none;}
        .btn-login{width:100%;background:white;color:var(--blue);border:2px solid var(--blue);padding:14px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;text-decoration:none;display:block;text-align:center;}
        .btn-login:hover{background:#eff6ff;}
        .booking-note{font-size:12px;color:var(--muted);text-align:center;margin-top:10px;line-height:1.6;}
        .booked-box{background:#dcfce7;border:1px solid #bbf7d0;border-radius:14px;padding:24px;text-align:center;}
        .booked-icon{width:56px;height:56px;background:#16a34a;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
        .booked-title{font-family:'Sora',sans-serif;font-size:17px;font-weight:700;color:#166534;margin-bottom:6px;}
        .booked-desc{font-size:13px;color:#166534;line-height:1.7;}

        /* HOST CARD */
        .host-card{background:white;border:1.5px solid var(--border);border-radius:16px;padding:20px;margin-top:16px;display:flex;align-items:center;gap:14px;}
        .host-avatar{width:50px;height:50px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:white;flex-shrink:0;}
        .host-name{font-family:'Sora',sans-serif;font-size:15px;font-weight:700;color:var(--navy);}
        .host-sub{font-size:12px;color:var(--muted);margin-top:2px;}
        .host-badge{display:inline-flex;align-items:center;gap:4px;background:#dcfce7;color:#166534;padding:3px 10px;border-radius:50px;font-size:11px;font-weight:700;margin-top:4px;}

        /* MOBILE BOOKING BAR */
        .mobile-book-bar{display:none;position:fixed;bottom:0;left:0;right:0;background:white;border-top:1px solid var(--border);padding:14px 20px;z-index:200;box-shadow:0 -4px 20px rgba(0,0,0,0.08);}
        .mobile-book-inner{display:flex;align-items:center;justify-content:space-between;gap:12px;}
        .mobile-price{font-family:'Sora',sans-serif;font-size:18px;font-weight:800;color:var(--navy);}
        .mobile-price-label{font-size:12px;color:var(--muted);}
        .btn-book-mobile{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:12px 28px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;white-space:nowrap;}
        .btn-book-mobile:hover{box-shadow:0 4px 16px rgba(37,99,235,0.3);}

        /* DESCRIPTION */
        .description{font-size:15px;color:var(--muted);line-height:1.8;}

        /* RESPONSIVE */
        @media(max-width:900px){
          .page-layout{grid-template-columns:1fr;padding:20px 16px;gap:24px;}
          .right-col{position:static;}
          .mobile-book-bar{display:block;}
          body{padding-bottom:80px;}
          .booking-card{display:none;}
        }
        @media(max-width:600px){
          .hostel-name{font-size:24px;}
          .amenities-grid{grid-template-columns:repeat(2,1fr);}
          .rooms-list .room-card{padding:16px;}
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-logo">
          <div className="logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          DormLink
        </Link>
        <Link href="/" className="nav-back">
          <span className="material-icons-round" style={{fontSize:'16px'}}>arrow_back</span>
          Back to listings
        </Link>
      </nav>

      {/* HERO IMAGE */}
      <div className="hero-img">
        {hostel.image_url && !imgError ? (
          <img src={hostel.image_url} alt={hostel.name} onError={() => setImgError(true)}/>
        ) : (
          <div className="hero-placeholder">
            <span className="material-icons-round" style={{fontSize:'64px',color:'rgba(255,255,255,0.4)'}}>apartment</span>
            <div style={{color:'rgba(255,255,255,0.5)',fontSize:'15px',fontWeight:'500'}}>{hostel.name}</div>
          </div>
        )}
        <div className="verified-chip">
          <span className="material-icons-round" style={{fontSize:'14px'}}>verified</span>
          Verified Property
        </div>
        <button className="share-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}>
          <span className="material-icons-round" style={{fontSize:'18px',color:'#64748b'}}>share</span>
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="page-layout">
        {/* LEFT COL */}
        <div className="left-col">
          <h1 className="hostel-name">{hostel.name}</h1>

          <div className="hostel-meta">
            <div className="meta-item">
              <span className="material-icons-round" style={{fontSize:'16px',color:'#2563eb'}}>place</span>
              {hostel.address}, {hostel.city}
            </div>
            {hostel.universities?.name && (
              <div className="meta-item">
                <span className="material-icons-round" style={{fontSize:'16px',color:'#2563eb'}}>school</span>
                <a href="#">{hostel.universities.name}</a>
              </div>
            )}
            {hostel.distance_from_university && (
              <div className="meta-item">
                <span className="material-icons-round" style={{fontSize:'16px'}}>directions_walk</span>
                {hostel.distance_from_university} km from university
              </div>
            )}
          </div>

          <hr className="divider"/>

          {/* DESCRIPTION */}
          {hostel.description && (
            <>
              <div className="sec-title">
                <span className="material-icons-round" style={{color:'#2563eb',fontSize:'22px'}}>info</span>
                About This Property
              </div>
              <p className="description">{hostel.description}</p>
              <hr className="divider"/>
            </>
          )}

          {/* ROOM TYPES */}
          {hostel.rooms?.length > 0 && (
            <>
              <div className="sec-title">
                <span className="material-icons-round" style={{color:'#2563eb',fontSize:'22px'}}>bed</span>
                Available Room Types
              </div>
              <div className="rooms-list">
                {hostel.rooms.map(room => {
                  const price = parseFloat(room.price_per_semester || room.price_per_month * 4 || 0);
                  return (
                    <div key={room.id} className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                      onClick={() => setSelectedRoom(selectedRoom?.id === room.id ? null : room)}>
                      <div className="room-card-inner">
                        <div className="room-select-indicator">
                          {selectedRoom?.id === room.id && (
                            <span className="material-icons-round" style={{fontSize:'14px',color:'white'}}>check</span>
                          )}
                        </div>
                        <div className="room-header">
                          <div>
                            <div className="room-type">{room.room_type}</div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div className="room-price">
                              {price > 0 ? `TZS ${price.toLocaleString()}` : 'Price on request'}
                              <span className="room-price-label"> /sem</span>
                            </div>
                            <div style={{fontSize:'11px',color:'#94a3b8'}}>per person</div>
                          </div>
                        </div>
                        <div className="room-details">
                          {room.capacity && (
                            <span className="room-detail-chip">
                              <span className="material-icons-round" style={{fontSize:'14px'}}>people</span>
                              {room.capacity} person{room.capacity > 1 ? 's' : ''} per room
                            </span>
                          )}
                          {room.available_count > 0 && (
                            <span className="room-detail-chip">
                              <span className="material-icons-round" style={{fontSize:'14px'}}>door_front</span>
                              {room.available_count} rooms available
                            </span>
                          )}
                          {price > 0 && (
                            <span className="room-detail-chip" style={{background:'#dcfce7',color:'#166534'}}>
                              <span className="material-icons-round" style={{fontSize:'14px'}}>payments</span>
                              50% deposit = TZS {(price * 0.5).toLocaleString()}
                            </span>
                          )}
                        </div>
                        {room.description && <p className="room-desc">{room.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr className="divider"/>
            </>
          )}

          {/* AMENITIES */}
          {hostel.amenities?.length > 0 && (
            <>
              <div className="sec-title">
                <span className="material-icons-round" style={{color:'#2563eb',fontSize:'22px'}}>star</span>
                Amenities
              </div>
              <div className="amenities-grid">
                {hostel.amenities.map((a, i) => (
                  <div key={i} className="amenity-item">
                    <span className="material-icons-round" style={{fontSize:'18px',color:'#2563eb'}}>{AMENITY_ICONS[a] || 'check_circle'}</span>
                    {a}
                  </div>
                ))}
              </div>
              <hr className="divider"/>
            </>
          )}

          {/* LOCATION NOTE */}
          <div className="sec-title">
            <span className="material-icons-round" style={{color:'#2563eb',fontSize:'22px'}}>location_on</span>
            Location
          </div>
          <div style={{background:'#eff6ff',borderRadius:'16px',padding:'20px',display:'flex',alignItems:'center',gap:'16px'}}>
            <span className="material-icons-round" style={{fontSize:'40px',color:'#2563eb'}}>map</span>
            <div>
              <div style={{fontWeight:'600',color:'#0f172a',marginBottom:'4px'}}>{hostel.address}</div>
              <div style={{fontSize:'14px',color:'#64748b'}}>{hostel.city}, Tanzania</div>
              {hostel.distance_from_university && (
                <div style={{fontSize:'13px',color:'#2563eb',fontWeight:'600',marginTop:'4px'}}>
                  📍 {hostel.distance_from_university} km from {hostel.universities?.name || 'university'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COL — BOOKING CARD (desktop) */}
        <div className="right-col">
          {booked ? (
            <div className="booked-box">
              <div className="booked-icon">
                <span className="material-icons-round" style={{color:'white',fontSize:'28px'}}>check</span>
              </div>
              <div className="booked-title">Booking Submitted!</div>
              <div className="booked-desc">Your request has been sent to the host. You will be notified once confirmed. Then you can proceed to pay your deposit.</div>
              <Link href="/student/dashboard" style={{display:'inline-block',marginTop:'16px',background:'#166534',color:'white',padding:'10px 24px',borderRadius:'10px',fontWeight:'700',textDecoration:'none',fontSize:'14px'}}>
                View My Bookings →
              </Link>
            </div>
          ) : (
            <div className="booking-card">
              <div className="booking-title">Book This Hostel</div>
              <div className="booking-sub">Select a room and semester to reserve your space</div>

              {!user ? (
                <>
                  <div style={{textAlign:'center',padding:'24px',background:'#f8fafc',borderRadius:'12px',marginBottom:'14px'}}>
                    <span className="material-icons-round" style={{fontSize:'36px',color:'#bfdbfe',display:'block',marginBottom:'8px'}}>lock</span>
                    <div style={{fontSize:'14px',color:'#64748b',marginBottom:'16px'}}>Sign in to book this property</div>
                    <Link href="/login" className="btn-login">Sign In to Book</Link>
                  </div>
                  <div style={{textAlign:'center',fontSize:'13px',color:'#94a3b8'}}>
                    Don't have an account? <Link href="/register" style={{color:'#2563eb',fontWeight:'600',textDecoration:'none'}}>Sign up free</Link>
                  </div>
                </>
              ) : (
                <>
                  {/* ROOM SELECTION */}
                  {hostel.rooms?.length > 0 && (
                    <div style={{marginBottom:'16px'}}>
                      <div style={{fontSize:'13px',fontWeight:'700',color:'#374151',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>1. Select Room Type</div>
                      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                        {hostel.rooms.map(room => {
                          const price = parseFloat(room.price_per_semester || room.price_per_month * 4 || 0);
                          return (
                            <div key={room.id}
                              onClick={() => setSelectedRoom(selectedRoom?.id === room.id ? null : room)}
                              style={{border:`2px solid ${selectedRoom?.id===room.id?'#2563eb':'#e2e8f0'}`,borderRadius:'10px',padding:'12px 14px',cursor:'pointer',background:selectedRoom?.id===room.id?'#eff6ff':'#f9fafb',transition:'all 0.2s',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                              <div>
                                <div style={{fontWeight:'600',fontSize:'14px',color:'#0f172a'}}>{room.room_type}</div>
                                <div style={{fontSize:'12px',color:'#94a3b8'}}>{room.capacity} person{room.capacity>1?'s':''}/room</div>
                              </div>
                              <div style={{textAlign:'right'}}>
                                <div style={{fontFamily:'Sora,sans-serif',fontWeight:'700',fontSize:'15px',color:'#2563eb'}}>TZS {price.toLocaleString()}</div>
                                <div style={{fontSize:'11px',color:'#94a3b8'}}>/semester</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SEMESTER */}
                  <div style={{fontSize:'13px',fontWeight:'700',color:'#374151',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>2. Select Semester</div>
                  <div className="semester-btns">
                    {['Semester 1','Semester 2','Full Year'].map(s => {
                      const basePrice = selectedRoom ? parseFloat(selectedRoom.price_per_semester || selectedRoom.price_per_month * 4 || 0) : 0;
                      const sPrice = s === 'Full Year' ? basePrice * 2 : basePrice;
                      return (
                        <button key={s} className={`semester-btn ${selectedSemester===s?'active':''}`} onClick={() => setSelectedSemester(s)}>
                          <span>{s}</span>
                          {basePrice > 0 && <span className="semester-price">TZS {sPrice.toLocaleString()}</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* PRICE BREAKDOWN */}
                  {selectedRoom && selectedSemester && (
                    <div className="price-breakdown">
                      <div className="price-row">
                        <span>Semester fee</span>
                        <span>TZS {total.toLocaleString()}</span>
                      </div>
                      <div className="price-row">
                        <span>50% deposit due now</span>
                        <span style={{color:'#2563eb',fontWeight:'600'}}>TZS {deposit.toLocaleString()}</span>
                      </div>
                      <div className="price-row">
                        <span>Remaining (at arrival)</span>
                        <span>TZS {deposit.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {/* SPECIAL REQUESTS */}
                  <div style={{fontSize:'13px',fontWeight:'700',color:'#374151',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>3. Special Requests (optional)</div>
                  <textarea className="special-input" placeholder="Any special requirements? e.g. ground floor, specific wing..."
                    value={specialRequests} onChange={e => setSpecialRequests(e.target.value)}/>

                  <button className="btn-book" onClick={handleBook} disabled={booking || !selectedRoom || !selectedSemester}>
                    {booking ? (
                      <>
                        <div style={{width:'18px',height:'18px',border:'2px solid rgba(255,255,255,0.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="material-icons-round" style={{fontSize:'18px'}}>send</span>
                        {!selectedRoom ? 'Select a Room First' : !selectedSemester ? 'Select Semester' : 'Submit Booking Request'}
                      </>
                    )}
                  </button>
                  <div className="booking-note">
                    You won't be charged yet. Pay 50% deposit only after host confirms.
                  </div>
                </>
              )}
            </div>
          )}

          {/* HOST INFO */}
          {hostel.users && (
            <div className="host-card">
              <div className="host-avatar">{hostel.users.first_name?.[0]}{hostel.users.last_name?.[0]}</div>
              <div>
                <div className="host-name">{hostel.users.first_name} {hostel.users.last_name}</div>
                <div className="host-sub">Property Host</div>
                <div className="host-badge">
                  <span className="material-icons-round" style={{fontSize:'11px'}}>verified</span>
                  Verified Host
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE BOOKING BAR */}
      {!booked && (
        <div className="mobile-book-bar">
          <div className="mobile-book-inner">
            <div>
              {selectedRoom ? (
                <>
                  <div className="mobile-price">
                    TZS {parseFloat(selectedRoom.price_per_semester || selectedRoom.price_per_month * 4 || 0).toLocaleString()}
                  </div>
                  <div className="mobile-price-label">per person / semester</div>
                </>
              ) : (
                <>
                  <div className="mobile-price">
                    {hostel.rooms?.[0] ? `TZS ${parseFloat(hostel.rooms[0].price_per_semester || hostel.rooms[0].price_per_month * 4 || 0).toLocaleString()}` : 'Select room'}
                  </div>
                  <div className="mobile-price-label">starting price / semester</div>
                </>
              )}
            </div>
            {!user ? (
              <Link href="/login" className="btn-book-mobile">Sign In to Book</Link>
            ) : (
              <button className="btn-book-mobile" onClick={handleBook}
                disabled={booking || !selectedRoom || !selectedSemester}>
                {booking ? 'Booking...' : !selectedRoom ? 'Select Room ↑' : !selectedSemester ? 'Select Semester ↑' : 'Book Now'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
