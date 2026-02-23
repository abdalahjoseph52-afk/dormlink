'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

const TANZANIA_UNIVERSITIES = [
  { name: 'University of Dar es Salaam', short: 'UDSM', location: 'Dar es Salaam' },
  { name: 'UDSM College of Engineering', short: 'CoET', location: 'Dar es Salaam' },
  { name: 'Muhimbili University of Health Sciences', short: 'MUHAS', location: 'Dar es Salaam' },
  { name: 'Dar es Salaam Institute of Technology', short: 'DIT', location: 'Dar es Salaam' },
  { name: 'Institute of Finance Management', short: 'IFM', location: 'Dar es Salaam' },
  { name: 'Institute of Social Work', short: 'ISW', location: 'Dar es Salaam' },
  { name: 'College of Business Education', short: 'CBE Dar', location: 'Dar es Salaam' },
  { name: 'CBE Dodoma Campus', short: 'CBE Dodoma', location: 'Dodoma' },
  { name: 'Ardhi University', short: 'ARU', location: 'Dar es Salaam' },
  { name: 'Open University of Tanzania', short: 'OUT', location: 'Dar es Salaam' },
  { name: 'University of Dodoma', short: 'UDOM', location: 'Dodoma' },
  { name: 'Sokoine University of Agriculture', short: 'SUA', location: 'Morogoro' },
  { name: 'Mzumbe University', short: 'MU', location: 'Morogoro' },
  { name: 'Mzumbe University Dar Campus', short: 'MU Dar', location: 'Dar es Salaam' },
  { name: 'Mzumbe University Mbeya Campus', short: 'MU Mbeya', location: 'Mbeya' },
  { name: 'Nelson Mandela African Institution', short: 'NM-AIST', location: 'Arusha' },
  { name: 'Moshi Co-operative University', short: 'MoCU', location: 'Moshi' },
  { name: 'Kilimanjaro Christian Medical University', short: 'KCMUCo', location: 'Moshi' },
  { name: 'St. Augustine University', short: 'SAUT', location: 'Mwanza' },
  { name: 'SAUT Dar es Salaam Campus', short: 'SAUT Dar', location: 'Dar es Salaam' },
  { name: 'University of Mwanza', short: 'UNIMA', location: 'Mwanza' },
  { name: 'Bugando Medical Centre University', short: 'BUGANDO', location: 'Mwanza' },
  { name: 'Kampala International University Tanzania', short: 'KIU-T', location: 'Dar es Salaam' },
  { name: 'Tumaini University Makumira', short: 'TUMA', location: 'Arusha' },
  { name: 'Tumaini University Dar Campus', short: 'TUMA Dar', location: 'Dar es Salaam' },
  { name: 'Iringa University', short: 'UniIringa', location: 'Iringa' },
  { name: 'Ruaha Catholic University', short: 'RUCU', location: 'Iringa' },
  { name: 'Sebastian Kolowa Memorial University', short: 'SEKOMU', location: 'Lushoto' },
  { name: 'Stefano Moshi Memorial University', short: 'SMMUCo', location: 'Moshi' },
  { name: 'Mount Meru University', short: 'MMU', location: 'Arusha' },
  { name: 'Arusha Technical College', short: 'ATC', location: 'Arusha' },
  { name: 'Tanzania Institute of Accountancy', short: 'TIA', location: 'Dar es Salaam' },
  { name: 'TIA Mwanza Campus', short: 'TIA Mwanza', location: 'Mwanza' },
  { name: 'TIA Arusha Campus', short: 'TIA Arusha', location: 'Arusha' },
  { name: 'Tanzania Commission for Universities', short: 'TCU', location: 'Dar es Salaam' },
  { name: 'Zanzibar University', short: 'ZU', location: 'Zanzibar' },
  { name: 'State University of Zanzibar', short: 'SUZA', location: 'Zanzibar' },
  { name: 'Aga Khan University Tanzania', short: 'AKU', location: 'Dar es Salaam' },
  { name: 'International Medical & Technological University', short: 'IMTU', location: 'Dar es Salaam' },
  { name: 'Muslim University of Morogoro', short: 'MUM', location: 'Morogoro' },
  { name: 'Mkwawa University College of Education', short: 'MUCE', location: 'Iringa' },
  { name: 'University of Bagamoyo', short: 'UB', location: 'Bagamoyo' },
  { name: 'Geita Gold Mining Institute', short: 'GGMI', location: 'Geita' },
  { name: 'Mbeya University of Science & Technology', short: 'MUST', location: 'Mbeya' },
];

const CITY_ICON = {
  'Dar es Salaam':'location_city',
  'Dodoma':'account_balance',
  'Arusha':'landscape',
  'Mwanza':'water',
  'Morogoro':'park',
  'Moshi':'terrain',
  'Mbeya':'terrain',
  'Iringa':'landscape',
  'Zanzibar':'beach_access',
  'Bagamoyo':'anchor',
  'Lushoto':'forest',
  'Geita':'diamond',
};

export default function HomePage() {
  const { user, logout } = useAuth();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    api.get('/hostels/approved').then(r => {
      const data = r.data.hostels || [];
      setHostels(data); setFiltered(data);
    }).catch(console.error).finally(() => setLoading(false));

    const close = e => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowDrop(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const onType = (q) => {
    setQuery(q);
    if (!q.trim()) { setSuggestions([]); setShowDrop(false); return; }
    const q2 = q.toLowerCase();
    const unis = TANZANIA_UNIVERSITIES
      .filter(u => u.name.toLowerCase().includes(q2) || u.short.toLowerCase().includes(q2) || u.location.toLowerCase().includes(q2))
      .map(u => ({ type:'uni', label:u.name, sub:u.location, short:u.short, loc:u.location }));
    setSuggestions(unis.slice(0, 9));
    setShowDrop(unis.length > 0);
  };

  const pick = (s) => {
    setQuery(s.label); setShowDrop(false); setActiveFilter(s);
    if (s.type === 'city') {
      setFiltered(hostels.filter(h => h.city?.toLowerCase() === s.label.toLowerCase()));
    } else {
      const byCity = hostels.filter(h => h.city?.toLowerCase().includes(s.loc.toLowerCase()));
      const byUni = hostels.filter(h => h.universities?.name?.toLowerCase().includes(s.label.toLowerCase()));
      const merged = [...new Map([...byCity,...byUni].map(h=>[h.id,h])).values()];
      setFiltered(merged.length > 0 ? merged : byCity);
    }
  };

  const clear = () => { setQuery(''); setActiveFilter(null); setFiltered(hostels); setShowDrop(false); };

  const grouped = filtered.reduce((acc, h) => {
    const c = h.city || 'Other';
    if (!acc[c]) acc[c] = [];
    acc[c].push(h); return acc;
  }, {});

  const price = (h) => {
    const p = h.rooms?.[0]?.price_per_semester || (h.rooms?.[0]?.price_per_month && h.rooms[0].price_per_month * 4);
    return p ? `TZS ${parseFloat(p).toLocaleString()}` : null;
  };

  const timeAgo = (d) => {
    if (!d) return '';
    const days = Math.floor((Date.now()-new Date(d))/86400000);
    if (days===0) return 'New today'; if (days<7) return `${days}d ago`;
    if (days<30) return `${Math.floor(days/7)}w ago`; return '';
  };

  const SearchDropdown = ({ style={} }) => showDrop && suggestions.length > 0 ? (
    <div style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,background:'white',borderRadius:'16px',boxShadow:'0 8px 40px rgba(0,0,0,0.16)',zIndex:500,overflow:'hidden',...style}}>
      <div style={{padding:'12px 16px 4px',fontSize:'11px',fontWeight:700,color:'#717171',textTransform:'uppercase',letterSpacing:'0.5px'}}>Universities — 44+ in Tanzania</div>
      {suggestions.map((s,i) => (
        <div key={i} onClick={()=>pick(s)} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.background='#f7f7f7'} onMouseLeave={e=>e.currentTarget.style.background='white'}>
          <div style={{width:36,height:36,background:'#F4F7FC',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span className="material-icons-round" style={{fontSize:18,color:'#10367D'}}>school</span>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:600,color:'#222'}}>{s.label}</div>
            <div style={{fontSize:12,color:'#717171'}}>{s.sub}</div>
          </div>
          <span style={{background:'#F4F7FC',color:'#10367D',fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:20,flexShrink:0}}>{s.short}</span>
        </div>
      ))}
    </div>
  ) : null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Outfit',sans-serif;font-weight:400;background:#fff;color:#0D1830;min-height:100vh;}

        .nav{position:sticky;top:0;z-index:200;background:white;border-bottom:1px solid #ebebeb;}
        .nav-inner{max-width:1280px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
        .logo{font-size:21px;font-family:'Outfit',sans-serif;color:#10367D;text-decoration:none;display:flex;align-items:center;gap:9px;flex-shrink:0;}
        .logo-box{width:32px;height:32px;display:flex;align-items:center;justify-content:center;}

        .pill{display:flex;align-items:center;border:1px solid #ddd;border-radius:40px;padding:8px 8px 8px 18px;gap:0;box-shadow:0 1px 4px rgba(0,0,0,0.08);transition:box-shadow 0.2s;flex:1;max-width:460px;}
        .pill:hover{box-shadow:0 2px 10px rgba(0,0,0,0.13);}
        .pill input{border:none;outline:none;font-size:14px;font-family:'Outfit',sans-serif;color:#222;background:none;flex:1;min-width:0;}
        .pill input::placeholder{color:#aaa;}
        .pill-btn{background:#10367D;color:white;border:none;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background 0.15s;}
        .pill-btn:hover{background:#0B2960;}

        .nav-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}
        .btn-g{border:1px solid #ddd;background:white;padding:9px 16px;border-radius:22px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Outfit',sans-serif;color:#222;text-decoration:none;transition:background 0.15s;white-space:nowrap;}
        .btn-g:hover{background:#f7f7f7;}
        .btn-b{background:#10367D;color:white;border:none;padding:9px 18px;border-radius:22px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;text-decoration:none;transition:background 0.15s;white-space:nowrap;}
        .btn-b:hover{background:#0B2960;}
        .hbtn{display:none;background:none;border:1px solid #ddd;border-radius:22px;padding:7px 10px;cursor:pointer;align-items:center;gap:6px;}

        .hero{background:linear-gradient(140deg,#10367D 0%,#10367D 55%,#3b82f6 100%);padding:80px 24px 96px;text-align:center;position:relative;overflow:hidden;}
        .hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 50%,rgba(255,255,255,0.07) 0%,transparent 60%);}
        .hero-inner{max-width:680px;margin:0 auto;position:relative;z-index:1;}
        .hero-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:white;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:22px;backdrop-filter:blur(10px);}
        .hero h1{font-size:clamp(26px,5vw,50px);font-weight:800;color:white;line-height:1.1;margin-bottom:12px;letter-spacing:-0.5px;}
        .hero p{font-size:clamp(14px,2vw,17px);color:rgba(255,255,255,0.82);margin-bottom:36px;line-height:1.7;}

        

        .fbar{background:#F4F7FC;border-bottom:1px solid #B8CAEB;padding:10px 24px;}
        .fbar-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;}
        .fbar-text{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#0B2960;}
        .fbar-clear{background:white;border:1px solid #B8CAEB;color:#0B2960;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;}
        .fbar-clear:hover{background:#D5DFEE;}

        .main{max-width:1280px;margin:0 auto;padding:44px 24px 80px;}
        .city-sec{margin-bottom:56px;}
        .city-hd{display:flex;align-items:baseline;gap:10px;margin-bottom:22px;}
        .city-name{font-size:22px;font-weight:700;color:#222;}
        .city-sub{font-size:14px;color:#717171;}

        /* AIRBNB CARD GRID */
        .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}

        /* CARD */
        .card{text-decoration:none;color:inherit;display:block;}
        .card:hover .card-img img{transform:scale(1.05);}
        .card-img{border-radius:14px;overflow:hidden;aspect-ratio:4/3;background:#f0f0f0;position:relative;margin-bottom:12px;}
        .card-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;}
        .card-img-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F4F7FC,#D5DFEE);}
        .badge-v{position:absolute;top:12px;left:12px;background:white;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;color:#222;box-shadow:0 1px 4px rgba(0,0,0,0.14);}
        .badge-t{position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.5);backdrop-filter:blur(6px);color:white;padding:3px 9px;border-radius:20px;font-size:11px;}

        .card-info{}
        .card-row1{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:2px;}
        .card-name{font-size:14px;font-weight:700;color:#222;flex:1;line-height:1.3;}
        .card-star{display:flex;align-items:center;gap:2px;font-size:13px;font-weight:600;color:#222;flex-shrink:0;}
        .card-loc{font-size:13px;color:#717171;margin-bottom:3px;}
        .card-uni{font-size:12px;color:#10367D;font-weight:600;display:flex;align-items:center;gap:3px;margin-bottom:6px;}
        .card-price{font-size:14px;color:#222;margin-top:2px;}
        .card-rooms-tag{display:inline-flex;align-items:center;gap:3px;background:#f3f4f6;color:#374151;padding:3px 8px;border-radius:20px;font-size:11px;font-weight:600;margin-top:5px;}

        .empty{text-align:center;padding:80px 24px;}
        .empty h3{font-size:20px;font-weight:700;margin-bottom:8px;}
        .empty p{color:#717171;font-size:14px;line-height:1.7;}

        .cta{background:#060E1C;border-radius:20px;padding:52px 40px;text-align:center;margin-top:8px;}
        .cta h2{font-size:26px;font-weight:800;color:white;margin-bottom:10px;}
        .cta p{color:rgba(255,255,255,0.65);font-size:15px;margin-bottom:28px;line-height:1.7;}
        .cta a{background:white;color:#060E1C;padding:13px 34px;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;display:inline-block;}
        .cta a:hover{background:#F4F7FC;color:#10367D;}

        footer{background:#f7f7f7;border-top:1px solid #ebebeb;padding:28px 24px;}
        .foot-in{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:#717171;}
        .foot-links{display:flex;gap:20px;}
        .foot-links a{color:#717171;text-decoration:none;}
        .foot-links a:hover{color:#222;}

        .spin{width:32px;height:32px;border:3px solid #D5DFEE;border-top-color:#10367D;border-radius:50%;animation:spin 0.8s linear infinite;margin:100px auto;}
        @keyframes spin{to{transform:rotate(360deg);}}

        .drawer{position:fixed;inset:0;background:white;z-index:600;padding:24px;display:flex;flex-direction:column;gap:12px;transform:translateX(100%);transition:transform 0.28s ease;overflow-y:auto;}
        .drawer.open{transform:translateX(0);}
        .drawer-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
        .drawer-close{background:none;border:1px solid #ddd;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
        .drawer-input{border:1.5px solid #ddd;border-radius:12px;padding:12px 16px;font-size:14px;font-family:'Outfit',sans-serif;outline:none;width:100%;}
        .drawer-input:focus{border-color:#10367D;}
        .drawer-btn{display:block;padding:13px 16px;border:1px solid #ddd;border-radius:12px;text-align:center;font-size:14px;font-weight:600;text-decoration:none;color:#222;transition:background 0.15s;}
        .drawer-btn:hover{background:#f7f7f7;}
        .drawer-btn.primary{background:#10367D;color:white;border-color:#10367D;}
        .drawer-btn.primary:hover{background:#0B2960;}

        @media(max-width:1100px){.grid{grid-template-columns:repeat(3,1fr);}}
        @media(max-width:768px){
          .pill{display:none;} .hbtn{display:flex;}
          .nav-actions .btn-g,.nav-actions .btn-b{display:none;}
          .hero{padding:52px 20px 72px;}

          .main{padding:28px 16px 60px;}
          .grid{grid-template-columns:repeat(2,1fr);gap:16px;}
          .card-name{font-size:13px;}
          .city-name{font-size:18px;}
          .cta{padding:36px 24px;}
          .cta h2{font-size:22px;}
        }
        @media(max-width:480px){
          .grid{grid-template-columns:1fr 1fr;gap:12px;}
          .hero h1{font-size:24px;}
          .card-img{border-radius:10px;}
        }
        @media(max-width:360px){.grid{grid-template-columns:1fr;}}
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-box">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#10367D" strokeWidth="7"/><path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="#10367D" strokeWidth="6.5" strokeLinecap="round" fill="none"/><rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/><circle cx="70" cy="22" r="5.5" fill="#B5CE00"/><circle cx="73" cy="68" r="7.5" stroke="#10367D" strokeWidth="4" fill="none"/><line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="#10367D" strokeWidth="4" strokeLinecap="round"/></svg>
            </div>
            <span style={{fontWeight:300,letterSpacing:'-0.02em'}}>Saka</span><span style={{fontWeight:700,letterSpacing:'-0.02em'}}>Boma</span>
          </Link>

          {/* Pill search — desktop */}
          <div className="pill" ref={searchRef} style={{position:'relative'}}>
            <input
              placeholder="Search university or city..."
              value={query}
              onChange={e => onType(e.target.value)}
              onFocus={() => query && setShowDrop(true)}
            />
            {query && (
              <button onClick={clear} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',color:'#aaa',padding:'0 6px'}}>
                <span className="material-icons-round" style={{fontSize:16}}>close</span>
              </button>
            )}
            <button className="pill-btn"><span className="material-icons-round" style={{fontSize:18}}>search</span></button>
            <SearchDropdown />
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <Link href={`/${user.role}/dashboard`} className="btn-g">My Dashboard</Link>
                <button className="btn-b" onClick={logout}>Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-g">Log In</Link>
                <Link href="/register" className="btn-b">Sign Up</Link>
              </>
            )}
            <button className="hbtn" onClick={() => setMenuOpen(true)}>
              <span className="material-icons-round" style={{fontSize:18}}>menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`drawer ${menuOpen?'open':''}`}>
        <div className="drawer-hd">
          <span style={{fontWeight:800,fontSize:20,color:'#10367D'}}>SakaBoma</span>
          <button className="drawer-close" onClick={() => setMenuOpen(false)}>
            <span className="material-icons-round" style={{fontSize:18}}>close</span>
          </button>
        </div>
        <input className="drawer-input" placeholder="Search university or city..."
          value={query} onChange={e => onType(e.target.value)}/>
        {suggestions.length > 0 && query && (
          <div style={{border:'1px solid #ebebeb',borderRadius:12,overflow:'hidden'}}>
            {suggestions.map((s,i) => (
              <div key={i} onClick={() => { pick(s); setMenuOpen(false); }}
                style={{padding:'11px 16px',cursor:'pointer',borderBottom:'1px solid #f5f5f5'}}>
                <div style={{fontWeight:600,fontSize:14}}>{s.label}</div>
                <div style={{fontSize:12,color:'#717171'}}>{s.sub}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:8}}>
          {user ? (
            <>
              <Link href={`/${user.role}/dashboard`} className="drawer-btn" onClick={()=>setMenuOpen(false)}>My Dashboard</Link>
              <button className="drawer-btn primary" onClick={()=>{logout();setMenuOpen(false);}}>Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="drawer-btn" onClick={()=>setMenuOpen(false)}>Log In</Link>
              <Link href="/register" className="drawer-btn primary" onClick={()=>setMenuOpen(false)}>Sign Up Free</Link>
            </>
          )}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-pill">
            <span className="material-icons-round" style={{fontSize:13}}>verified</span>
            Tanzania's #1 Student Accommodation Platform — 44+ Universities
          </div>
          <h1>Find Your Perfect Student Home</h1>
          <p>Search hostels near any university across Tanzania. Book securely, pay safely, move in confidently.</p>

          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'20px',flexWrap:'wrap',marginTop:'4px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:500}}>
              <span className="material-icons-round" style={{fontSize:'14px',color:'#B5CE00'}}>verified</span>
              Verified Properties
            </div>
            <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.2)'}}/>
            <div style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:500}}>
              <span className="material-icons-round" style={{fontSize:'14px',color:'#B5CE00'}}>school</span>
              44+ Universities Covered
            </div>
            <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.2)'}}/>
            <div style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:500}}>
              <span className="material-icons-round" style={{fontSize:'14px',color:'#B5CE00'}}>payments</span>
              Secure Payments
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVE FILTER BAR ── */}
      {activeFilter && (
        <div className="fbar">
          <div className="fbar-inner">
            <div className="fbar-text">
              <span className="material-icons-round" style={{fontSize:15}}>school</span>
              Hostels near {activeFilter.label} · {filtered.length} found
            </div>
            <button className="fbar-clear" onClick={clear}><span className="material-icons-round" style={{fontSize:'13px',verticalAlign:'middle',marginRight:'3px'}}>close</span>Clear</button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="main">
        {loading ? (
          <div className="spin"/>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <span className="material-icons-round" style={{fontSize:52,color:'#ddd',display:'block',marginBottom:16}}>search_off</span>
            <h3>No hostels found</h3>
            <p>No hostels listed yet for this area.<br/>
              Try a different search or{' '}
              <Link href="/register" style={{color:'#10367D',fontWeight:700}}>list your property</Link>.
            </p>
          </div>
        ) : (
          Object.entries(grouped).map(([city, list]) => (
            <section key={city} className="city-sec">
              <div className="city-hd">
                <div className="city-name"><span className="material-icons-round" style={{fontSize:'18px',color:'#10367D',verticalAlign:'middle',marginRight:'6px'}}>{CITY_ICON[city]||'home'}</span>{city}</div>
                <div className="city-sub">{list.length} {list.length===1?'place':'places'} to stay</div>
              </div>
              <div className="grid">
                {list.map(h => (
                  <Link key={h.id} href={`/hostels/${h.id}`} className="card">
                    <div className="card-img">
                      {h.image_url
                        ? <img src={h.image_url} alt={h.name} loading="lazy"/>
                        : <div className="card-img-ph"><span className="material-icons-round" style={{fontSize:52,color:'#B8CAEB'}}>apartment</span></div>
                      }
                      <div className="badge-v">
                        <span className="material-icons-round" style={{fontSize:10,verticalAlign:'middle',marginRight:2}}>verified</span>
                        Verified
                      </div>
                      {timeAgo(h.created_at) && <div className="badge-t">{timeAgo(h.created_at)}</div>}
                    </div>
                    <div className="card-info">
                      <div className="card-row1">
                        <div className="card-name">{h.name}</div>
                        <div className="card-star">
                          <span className="material-icons-round" style={{fontSize:13,color:'#f59e0b'}}>star</span>
                          {h.rating ? h.rating.toFixed(1) : 'New'}
                        </div>
                      </div>
                      <div className="card-loc">
                        {h.address || h.city}
                        {h.distance_from_university && ` · ${h.distance_from_university}km from campus`}
                      </div>
                      {h.universities?.name && (
                        <div className="card-uni">
                          <span className="material-icons-round" style={{fontSize:12}}>school</span>
                          Near {h.universities.name}
                        </div>
                      )}
                      {price(h)
                        ? <div className="card-price"><strong>{price(h)}</strong> <span style={{color:'#717171',fontWeight:400}}>/ semester</span></div>
                        : <div style={{fontSize:13,color:'#aaa',marginTop:4}}>Contact for price</div>
                      }
                      <div className="card-rooms-tag">
                        <span className="material-icons-round" style={{fontSize:12}}>bed</span>
                        {h.rooms?.length||0} room type{h.rooms?.length!==1?'s':''}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}

        {(!user || user.role!=='host') && (
          <div className="cta">
            <h2>Own a Hostel? List it Free</h2>
            <p>Reach thousands of students across Tanzania looking for accommodation near their university. Get bookings and manage everything in one place.</p>
            <Link href="/register">List Your Property →</Link>
          </div>
        )}
      </main>

      <footer>
        <div className="foot-in">
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:16,color:'#0D1830'}}><span style={{fontWeight:300}}>Saka</span><span style={{fontWeight:700}}>Boma</span></div>
          <div className="foot-links">
            <a href="/login">Log In</a>
            <a href="/register">Register</a>
            <span>© {new Date().getFullYear()} SakaBoma Tanzania</span>
          </div>
        </div>
      </footer>
    </>
  );
}
