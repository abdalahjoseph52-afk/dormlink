'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const SEMESTER_OPTIONS = [
  { value: 'Semester 1', label: 'Semester 1', desc: 'First academic semester' },
  { value: 'Semester 2', label: 'Semester 2', desc: 'Second academic semester' },
  { value: 'Full Year', label: 'Full Year', desc: 'Both semesters (discount may apply)' },
];

export default function HostelDetail({ params }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [hostel, setHostel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => { fetchHostel(); }, []);

  const fetchHostel = async () => {
    try {
      const res = await api.get(`/hostels/${id}`);
      setHostel(res.data.hostel);
      setReviews(res.data.reviews || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const getDepositAmount = () => {
    if (!selectedRoom || !selectedSemester) return 0;
    const fee = selectedSemester === 'Full Year'
      ? parseFloat(selectedRoom.price_per_semester) * 2
      : parseFloat(selectedRoom.price_per_semester);
    return fee * 0.5;
  };

  const getTotalFee = () => {
    if (!selectedRoom || !selectedSemester) return 0;
    return selectedSemester === 'Full Year'
      ? parseFloat(selectedRoom.price_per_semester) * 2
      : parseFloat(selectedRoom.price_per_semester);
  };

  const handleBook = async () => {
    if (!user) { router.push('/login'); return; }
    if (!selectedRoom) { toast.error('Please select a room'); return; }
    if (!selectedSemester) { toast.error('Please select a semester'); return; }
    setBookingLoading(true);
    try {
      await api.post('/bookings', {
        room_id: selectedRoom.id,
        semester: selectedSemester,
        special_requests: specialRequests
      });
      toast.success('Booking submitted! You will be notified when confirmed.');
    } catch (e) {
      toast.error(e.response?.data?.error || 'Booking failed');
    } finally { setBookingLoading(false); }
  };

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'Inter,sans-serif',color:'#94a3b8'}}>
      Loading property...
    </div>
  );

  if (!hostel) return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'Inter,sans-serif',gap:'16px'}}>
      <p style={{color:'#94a3b8'}}>Property not found</p>
      <Link href="/" style={{color:'#1a56db',fontWeight:600}}>Back to listings</Link>
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Inter',sans-serif;background:#f8fafc;color:#0f172a;}
        .nav{background:white;border-bottom:1px solid #e2e8f0;position:sticky;top:0;z-index:100;}
        .nav-inner{max-width:1160px;margin:0 auto;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;}
        .logo{font-family:'Merriweather',serif;font-size:20px;font-weight:700;color:#1e429f;text-decoration:none;display:flex;align-items:center;gap:10px;}
        .logo-mark{width:32px;height:32px;background:#1a56db;border-radius:8px;display:flex;align-items:center;justify-content:center;}
        .btn-back{display:flex;align-items:center;gap:8px;color:#475569;text-decoration:none;font-size:14px;font-weight:500;padding:8px 16px;border-radius:6px;transition:all 0.15s;}
        .btn-back:hover{background:#f1f4f9;}
        .hero{height:360px;background:linear-gradient(135deg,#0f172a 0%,#1e3a7a 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
        .hero-img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
        .hero-overlay{position:absolute;inset:0;background:rgba(15,23,42,0.5);}
        .content{max-width:1160px;margin:0 auto;padding:40px 32px;display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:start;}
        .hostel-name{font-family:'Merriweather',serif;font-size:30px;font-weight:700;color:#0f172a;margin-bottom:12px;}
        .verified-badge{display:inline-flex;align-items:center;gap:6px;background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:16px;}
        .meta-row{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:24px;}
        .meta-item{display:flex;align-items:center;gap:6px;font-size:14px;color:#475569;}
        .meta-uni{color:#1a56db;font-weight:500;}
        .sec-title{font-size:17px;font-weight:700;color:#0f172a;margin:28px 0 14px;padding-top:28px;border-top:1px solid #e2e8f0;display:flex;align-items:center;gap:8px;}
        .sec-title-first{border-top:none;padding-top:0;margin-top:0;}
        .desc{font-size:15px;color:#475569;line-height:1.8;}
        .amenities{display:flex;flex-wrap:wrap;gap:10px;}
        .amenity{display:flex;align-items:center;gap:7px;background:#ebf2ff;color:#1e429f;padding:7px 14px;border-radius:6px;font-size:13px;font-weight:500;}
        .amenity .material-icons{font-size:16px;}
        .rooms{display:flex;flex-direction:column;gap:12px;}
        .room-card{background:white;border:2px solid #e2e8f0;border-radius:10px;padding:20px;cursor:pointer;transition:all 0.15s;}
        .room-card:hover{border-color:#1a56db;}
        .room-card.selected{border-color:#1a56db;background:#f0f5ff;}
        .room-header{display:flex;justify-content:space-between;align-items:flex-start;}
        .room-left{}
        .room-name{font-size:16px;font-weight:700;color:#0f172a;display:flex;align-items:center;gap:8px;}
        .room-name .material-icons{color:#1a56db;font-size:20px;}
        .room-capacity{font-size:13px;color:#94a3b8;margin-top:3px;display:flex;align-items:center;gap:4px;}
        .room-capacity .material-icons{font-size:14px;}
        .room-avail{font-size:12px;color:#166534;font-weight:500;margin-top:4px;}
        .room-price{text-align:right;}
        .room-price-amount{font-size:20px;font-weight:700;color:#0f172a;}
        .room-price-label{font-size:11px;color:#94a3b8;margin-top:2px;}
        .room-desc{font-size:13px;color:#94a3b8;margin-top:10px;padding-top:10px;border-top:1px solid #f1f4f9;}
        .booking-card{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:24px;position:sticky;top:80px;}
        .booking-title{font-family:'Merriweather',serif;font-size:20px;font-weight:700;color:#0f172a;margin-bottom:4px;}
        .booking-sub{font-size:13px;color:#94a3b8;margin-bottom:24px;}
        .selected-info{background:#f0f5ff;border:1px solid #c7d9f8;border-radius:8px;padding:14px;margin-bottom:16px;}
        .selected-info-title{font-size:12px;font-weight:700;color:#1e429f;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;}
        .selected-info-row{display:flex;justify-content:space-between;font-size:13px;color:#475569;margin-bottom:4px;}
        .selected-info-row.total{font-weight:700;color:#0f172a;font-size:14px;border-top:1px solid #c7d9f8;padding-top:8px;margin-top:4px;}
        .selected-info-row.deposit{color:#1a56db;font-weight:600;}
        .selected-info-row.commission{color:#94a3b8;font-size:12px;}
        .semester-options{display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
        .semester-option{display:flex;align-items:center;gap:12px;padding:12px 14px;border:2px solid #e2e8f0;border-radius:8px;cursor:pointer;transition:all 0.15s;}
        .semester-option:hover{border-color:#1a56db;}
        .semester-option.selected{border-color:#1a56db;background:#f0f5ff;}
        .semester-radio{width:18px;height:18px;border:2px solid #e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s;}
        .semester-option.selected .semester-radio{border-color:#1a56db;background:#1a56db;}
        .semester-radio-dot{width:8px;height:8px;border-radius:50%;background:white;}
        .semester-label{font-size:14px;font-weight:600;color:#0f172a;}
        .semester-desc{font-size:12px;color:#94a3b8;}
        .form-group{margin-bottom:14px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:5px;}
        .form-textarea{width:100%;border:1px solid #e2e8f0;border-radius:7px;padding:10px 14px;font-size:14px;font-family:'Inter',sans-serif;color:#0f172a;outline:none;resize:vertical;min-height:72px;}
        .form-textarea:focus{border-color:#1a56db;box-shadow:0 0 0 3px rgba(26,86,219,0.1);}
        .btn-book{width:100%;background:#1a56db;color:white;border:none;padding:14px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-book:hover{background:#1e429f;}
        .btn-book:disabled{opacity:0.6;cursor:not-allowed;}
        .login-prompt{text-align:center;padding:20px;background:#f8fafc;border-radius:8px;}
        .login-prompt p{font-size:14px;color:#475569;margin-bottom:12px;}
        .btn-login{background:#1a56db;color:white;padding:10px 24px;border-radius:7px;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;}
        .hint{font-size:12px;color:#94a3b8;text-align:center;margin-top:12px;line-height:1.6;}
        .step-label{display:inline-flex;align-items:center;gap:6px;background:#0f172a;color:white;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:10px;}
        .no-room-selected{background:#f8fafc;border:1px dashed #e2e8f0;border-radius:8px;padding:16px;text-align:center;color:#94a3b8;font-size:13px;margin-bottom:16px;}
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            DormLink
          </Link>
          <Link href="/" className="btn-back">
            ← Back to listings
          </Link>
        </div>
      </nav>

      <div className="hero">
        {hostel.image_url && <img src={hostel.image_url} alt={hostel.name} className="hero-img"/>}
        <div className="hero-overlay"/>
      </div>

      <div className="content">
        <div>
          <div className="verified-badge">
            <span className="material-icons" style={{fontSize:'14px'}}>verified</span>
            Verified Property
          </div>
          <h1 className="hostel-name">{hostel.name}</h1>
          <div className="meta-row">
            <div className="meta-item">
              <span className="material-icons" style={{fontSize:'16px',color:'#94a3b8'}}>location_on</span>
              {hostel.address}, {hostel.city}
            </div>
            {hostel.universities && (
              <div className="meta-item meta-uni">
                <span className="material-icons" style={{fontSize:'16px'}}>school</span>
                {hostel.universities.name}
              </div>
            )}
            {hostel.distance_from_university && (
              <div className="meta-item">
                <span className="material-icons" style={{fontSize:'16px',color:'#94a3b8'}}>directions_walk</span>
                {hostel.distance_from_university} km from university
              </div>
            )}
          </div>

          {hostel.description && (
            <>
              <div className="sec-title sec-title-first">
                <span className="material-icons" style={{color:'#1a56db'}}>info</span>
                About This Property
              </div>
              <p className="desc">{hostel.description}</p>
            </>
          )}

          {hostel.amenities?.length > 0 && (
            <>
              <div className="sec-title">
                <span className="material-icons" style={{color:'#1a56db'}}>star</span>
                Amenities
              </div>
              <div className="amenities">
                {hostel.amenities.map((a, i) => (
                  <div key={i} className="amenity">
                    <span className="material-icons">
                      {a === 'WiFi' ? 'wifi' : a === 'Water' ? 'water_drop' : a === 'Security' ? 'security' : a === 'Kitchen' ? 'kitchen' : a === 'Parking' ? 'local_parking' : a === 'Laundry' ? 'local_laundry_service' : a === 'Generator' ? 'bolt' : a === 'CCTV' ? 'videocam' : a === 'Gym' ? 'fitness_center' : a === 'Study Room' ? 'menu_book' : a === 'Cleaning' ? 'cleaning_services' : a === 'Air Conditioning' ? 'ac_unit' : a === 'Hot Shower' ? 'shower' : a === 'Furnished' ? 'chair' : a === 'Garden' ? 'park' : 'check_circle'}
                    </span>
                    {a}
                  </div>
                ))}
              </div>
            </>
          )}

          {hostel.rooms?.length > 0 && (
            <>
              <div className="sec-title">
                <span className="material-icons" style={{color:'#1a56db'}}>bed</span>
                Available Rooms — Click to Select
              </div>
              <div className="rooms">
                {hostel.rooms.map(room => (
                  <div
                    key={room.id}
                    className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="room-header">
                      <div className="room-left">
                        <div className="room-name">
                          <span className="material-icons">bed</span>
                          {room.room_type}
                        </div>
                        <div className="room-capacity">
                          <span className="material-icons">group</span>
                          {room.capacity} person{room.capacity > 1 ? 's' : ''} per room — each pays separately
                        </div>
                        {room.available_count > 0 && (
                          <div className="room-avail">✓ {room.available_count} rooms available</div>
                        )}
                      </div>
                      <div className="room-price">
                        <div className="room-price-amount">TZS {parseFloat(room.price_per_semester || room.price_per_month || 0).toLocaleString()}</div>
                        <div className="room-price-label">per person / semester</div>
                      </div>
                    </div>
                    {room.description && <div className="room-desc">{room.description}</div>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* BOOKING CARD */}
        <div>
          <div className="booking-card">
            <div className="booking-title">Book This Hostel</div>
            <div className="booking-sub">Select a room and semester to reserve your space</div>

            {!user ? (
              <div className="login-prompt">
                <p>Sign in to book this property</p>
                <Link href="/login" className="btn-login">Sign In to Book</Link>
              </div>
            ) : user.role !== 'student' ? (
              <div className="login-prompt">
                <p>Only students can book accommodation</p>
              </div>
            ) : (
              <>
                {/* Step 1 */}
                <div className="step-label">Step 1 — Room</div>
                {selectedRoom ? (
                  <div className="selected-info" style={{marginBottom:'16px'}}>
                    <div className="selected-info-title">Selected Room</div>
                    <div className="selected-info-row">
                      <span>{selectedRoom.room_type}</span>
                      <span>{selectedRoom.capacity} person{selectedRoom.capacity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="selected-info-row">
                      <span>Your fee per semester</span>
                      <span style={{fontWeight:600}}>TZS {parseFloat(selectedRoom.price_per_semester || selectedRoom.price_per_month || 0).toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="no-room-selected">
                    <span className="material-icons" style={{fontSize:'24px',display:'block',marginBottom:'6px'}}>bed</span>
                    Select a room from the list on the left
                  </div>
                )}

                {/* Step 2 */}
                <div className="step-label">Step 2 — Semester</div>
                <div className="semester-options">
                  {SEMESTER_OPTIONS.map(opt => (
                    <div
                      key={opt.value}
                      className={`semester-option ${selectedSemester === opt.value ? 'selected' : ''}`}
                      onClick={() => setSelectedSemester(opt.value)}
                    >
                      <div className="semester-radio">
                        {selectedSemester === opt.value && <div className="semester-radio-dot"/>}
                      </div>
                      <div>
                        <div className="semester-label">{opt.label}</div>
                        <div className="semester-desc">{opt.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                {selectedRoom && selectedSemester && (
                  <div className="selected-info">
                    <div className="selected-info-title">Payment Summary</div>
                    <div className="selected-info-row">
                      <span>Total semester fee</span>
                      <span>TZS {getTotalFee().toLocaleString()}</span>
                    </div>
                    <div className="selected-info-row deposit">
                      <span>50% deposit (pay now)</span>
                      <span>TZS {getDepositAmount().toLocaleString()}</span>
                    </div>
                    <div className="selected-info-row commission">
                      <span>Platform fee (3%)</span>
                      <span>TZS {(getDepositAmount() * 0.03).toLocaleString()}</span>
                    </div>
                    <div className="selected-info-row total">
                      <span>You pay today</span>
                      <span>TZS {getDepositAmount().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Special Requests */}
                <div className="form-group" style={{marginTop:'14px'}}>
                  <label className="form-label">Special Requests (optional)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Any special requirements..."
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                  />
                </div>

                <button
                  className="btn-book"
                  disabled={bookingLoading || !selectedRoom || !selectedSemester}
                  onClick={handleBook}
                >
                  <span className="material-icons">send</span>
                  {bookingLoading ? 'Submitting...' : 'Submit Booking Request'}
                </button>

                <p className="hint">
                  After the host confirms your booking, you will receive a notification to complete your 50% deposit payment via M-Pesa, Tigo Pesa, Airtel Money or Bank Transfer.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
