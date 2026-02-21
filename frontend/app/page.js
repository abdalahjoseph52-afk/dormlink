'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function HomePage() {
  const { user } = useAuth();
  const [universities, setUniversities] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [univRes, hostelRes] = await Promise.all([
        api.get('/hostels/universities'),
        api.get('/hostels/approved')
      ]);
      setUniversities(univRes.data.universities);
      setHostels(hostelRes.data.hostels);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const filtered = hostels.filter(h => {
    const s = h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase());
    const u = selectedUniversity ? h.university_id === selectedUniversity : true;
    return s && u;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --blue: #1a56db;
          --blue-dark: #1e429f;
          --blue-light: #ebf2ff;
          --blue-mid: #3670e8;
          --white: #ffffff;
          --gray-50: #f8fafc;
          --gray-100: #f1f4f9;
          --gray-200: #e2e8f0;
          --gray-400: #94a3b8;
          --gray-600: #475569;
          --gray-800: #1e293b;
          --gray-900: #0f172a;
        }
        body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--gray-900); }

        /* NAV */
        .nav { background: var(--white); border-bottom: 1px solid var(--gray-200); position: sticky; top: 0; z-index: 100; }
        .nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-family: 'Merriweather', serif; font-size: 20px; font-weight: 700; color: var(--blue-dark); text-decoration: none; display: flex; align-items: center; gap: 10px; }
        .logo-mark { width: 32px; height: 32px; background: var(--blue); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nav-right { display: flex; align-items: center; gap: 6px; }
        .btn-ghost { background: none; border: 1px solid transparent; padding: 8px 18px; border-radius: 6px; font-size: 14px; font-weight: 500; color: var(--gray-600); cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: 'Inter', sans-serif; }
        .btn-ghost:hover { background: var(--gray-100); color: var(--gray-900); }
        .btn-primary { background: var(--blue); color: var(--white); border: none; padding: 9px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: 'Inter', sans-serif; }
        .btn-primary:hover { background: var(--blue-dark); }

        /* HERO */
        .hero { background: linear-gradient(160deg, var(--gray-900) 0%, #1e2a4a 100%); padding: 80px 32px 90px; }
        .hero-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .hero-left {}
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(26,86,219,0.2); border: 1px solid rgba(26,86,219,0.4); color: #93b4f8; padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 24px; }
        .hero-badge-dot { width: 6px; height: 6px; background: #93b4f8; border-radius: 50%; animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero h1 { font-family: 'Merriweather', serif; font-size: 46px; font-weight: 700; color: var(--white); line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 18px; }
        .hero h1 span { color: #93b4f8; }
        .hero-sub { font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 36px; }
        .hero-actions { display: flex; gap: 12px; }
        .btn-hero-primary { background: var(--blue); color: var(--white); border: none; padding: 13px 28px; border-radius: 7px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: 'Inter', sans-serif; }
        .btn-hero-primary:hover { background: var(--blue-mid); transform: translateY(-1px); }
        .btn-hero-ghost { background: rgba(255,255,255,0.08); color: var(--white); border: 1px solid rgba(255,255,255,0.15); padding: 13px 28px; border-radius: 7px; font-size: 15px; font-weight: 500; cursor: pointer; text-decoration: none; transition: all 0.15s; font-family: 'Inter', sans-serif; }
        .btn-hero-ghost:hover { background: rgba(255,255,255,0.12); }

        /* HERO RIGHT — Feature Cards */
        .hero-right { display: flex; flex-direction: column; gap: 12px; }
        .feature-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px 20px; display: flex; align-items: flex-start; gap: 14px; transition: all 0.2s; }
        .feature-card:hover { background: rgba(255,255,255,0.09); }
        .feature-icon { width: 40px; height: 40px; background: rgba(26,86,219,0.25); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .feature-title { font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 3px; }
        .feature-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.5; }

        /* SEARCH SECTION */
        .search-section { background: var(--gray-50); border-bottom: 1px solid var(--gray-200); padding: 28px 32px; }
        .search-inner { max-width: 1160px; margin: 0 auto; }
        .search-label { font-size: 13px; font-weight: 600; color: var(--gray-600); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .search-row { display: flex; gap: 10px; }
        .search-input-wrap { flex: 1; position: relative; }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--gray-400); }
        .search-input { width: 100%; border: 1px solid var(--gray-200); border-radius: 7px; padding: 11px 14px 11px 42px; font-size: 14px; font-family: 'Inter', sans-serif; color: var(--gray-900); background: var(--white); outline: none; transition: border 0.15s; }
        .search-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        .search-select { border: 1px solid var(--gray-200); border-radius: 7px; padding: 11px 16px; font-size: 14px; font-family: 'Inter', sans-serif; color: var(--gray-900); background: var(--white); outline: none; min-width: 220px; cursor: pointer; transition: border 0.15s; }
        .search-select:focus { border-color: var(--blue); }
        .search-btn { background: var(--blue); color: var(--white); border: none; padding: 11px 28px; border-radius: 7px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; white-space: nowrap; display: flex; align-items: center; gap: 8px; }
        .search-btn:hover { background: var(--blue-dark); }

        /* STATS */
        .stats { background: var(--white); border-bottom: 1px solid var(--gray-200); }
        .stats-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; display: flex; }
        .stat { flex: 1; padding: 28px 0; display: flex; align-items: center; gap: 16px; border-right: 1px solid var(--gray-200); padding-right: 32px; padding-left: 32px; }
        .stat:first-child { padding-left: 0; }
        .stat:last-child { border-right: none; }
        .stat-icon-wrap { width: 46px; height: 46px; background: var(--blue-light); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .stat-num { font-size: 24px; font-weight: 700; color: var(--gray-900); line-height: 1; }
        .stat-label { font-size: 13px; color: var(--gray-400); margin-top: 3px; }

        /* MAIN */
        .main { max-width: 1160px; margin: 0 auto; padding: 56px 32px; }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; }
        .section-title { font-family: 'Merriweather', serif; font-size: 28px; font-weight: 700; color: var(--gray-900); }
        .section-sub { font-size: 14px; color: var(--gray-400); margin-top: 4px; }
        .result-count { font-size: 13px; color: var(--gray-400); }

        /* CARDS */
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
        .card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden; text-decoration: none; color: inherit; display: block; transition: all 0.2s; }
        .card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-2px); border-color: #b3c9f8; }
        .card-img { height: 188px; background: linear-gradient(135deg, #1a2d5a 0%, #1e3a7a 100%); display: flex; align-items: center; justify-content: center; position: relative; }
        .card-verified { position: absolute; top: 12px; left: 12px; background: var(--blue); color: var(--white); font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 5px; }
        .card-body { padding: 18px 20px; }
        .card-name { font-family: 'Merriweather', serif; font-size: 17px; font-weight: 700; color: var(--gray-900); margin-bottom: 8px; }
        .card-meta { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
        .card-meta-row { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--gray-600); }
        .card-meta-row.uni { color: var(--blue); font-weight: 500; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .tag { font-size: 11px; font-weight: 500; padding: 3px 10px; background: var(--blue-light); color: var(--blue-dark); border-radius: 4px; }
        .card-sep { height: 1px; background: var(--gray-100); margin-bottom: 14px; }
        .card-bottom { display: flex; justify-content: space-between; align-items: center; }
        .card-price-label { font-size: 11px; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.5px; }
        .card-price-amt { font-size: 18px; font-weight: 700; color: var(--gray-900); }
        .card-price-per { font-size: 12px; color: var(--gray-400); }
        .btn-view { background: var(--blue-light); color: var(--blue-dark); border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; display: flex; align-items: center; gap: 6px; text-decoration: none; }
        .btn-view:hover { background: var(--blue); color: var(--white); }

        /* EMPTY */
        .empty { grid-column: 1/-1; text-align: center; padding: 80px; }
        .empty-box { width: 64px; height: 64px; background: var(--gray-100); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .empty h3 { font-size: 18px; font-weight: 600; color: var(--gray-800); margin-bottom: 6px; }
        .empty p { font-size: 14px; color: var(--gray-400); }

        /* HOW IT WORKS */
        .how { background: var(--gray-50); border-top: 1px solid var(--gray-200); padding: 72px 32px; }
        .how-inner { max-width: 1160px; margin: 0 auto; }
        .how-title { font-family: 'Merriweather', serif; font-size: 30px; font-weight: 700; color: var(--gray-900); text-align: center; margin-bottom: 8px; }
        .how-sub { text-align: center; font-size: 15px; color: var(--gray-400); margin-bottom: 48px; }
        .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .how-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; padding: 32px 28px; text-align: center; }
        .how-step { width: 36px; height: 36px; background: var(--blue); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; margin: 0 auto 16px; }
        .how-card h3 { font-size: 16px; font-weight: 600; color: var(--gray-900); margin-bottom: 8px; }
        .how-card p { font-size: 14px; color: var(--gray-400); line-height: 1.6; }
        .how-icon { width: 52px; height: 52px; background: var(--blue-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }

        /* FOOTER */
        .footer { background: var(--gray-900); color: var(--white); padding: 60px 32px 28px; }
        .footer-inner { max-width: 1160px; margin: 0 auto; }
        .footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 28px; }
        .footer-logo { font-family: 'Merriweather', serif; font-size: 18px; font-weight: 700; color: var(--white); display: flex; align-items: center; gap: 10px; margin-bottom: 12px; text-decoration: none; }
        .footer-logo-mark { width: 28px; height: 28px; background: var(--blue); border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .footer-desc { font-size: 13px; color: rgba(255,255,255,0.35); line-height: 1.7; }
        .footer-col h4 { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: rgba(255,255,255,0.3); margin-bottom: 14px; }
        .footer-col a { display: block; font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; margin-bottom: 9px; transition: color 0.15s; }
        .footer-col a:hover { color: var(--white); }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; }
        .footer-copy { font-size: 12px; color: rgba(255,255,255,0.2); }
      `}</style>

      {/* NAV */}
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
          <div className="nav-right">
            {user ? (
              <Link href={`/${user.role}/dashboard`} className="btn-primary">My Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">Sign In</Link>
                <Link href="/register" className="btn-primary">Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Trusted by students across Tanzania
            </div>
            <h1>Student Housing,<br /><span>Made Simple</span></h1>
            <p className="hero-sub">
              Browse verified accommodation near your university. Book securely online and move in with confidence.
            </p>
            <div className="hero-actions">
              <Link href="/register" className="btn-hero-primary">Find Accommodation</Link>
              <Link href="/register?role=host" className="btn-hero-ghost">List Your Property</Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#93b4f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="feature-title">Verified Properties Only</div>
                <div className="feature-desc">Every hostel is reviewed and approved by our team before going live.</div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#93b4f8" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="#93b4f8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="feature-title">Secure Booking & Payments</div>
                <div className="feature-desc">Your payments are protected. Book with confidence using mobile money or card.</div>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="#93b4f8" strokeWidth="2"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="#93b4f8" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="feature-title">Near Your University</div>
                <div className="feature-desc">Filter by university and find accommodation within walking distance.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <div className="search-section">
        <div className="search-inner">
          <div className="search-label">Search Properties</div>
          <div className="search-row">
            <div className="search-input-wrap">
              <span className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#94a3b8" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                className="search-input"
                type="text"
                placeholder="Search by hostel name or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="search-select"
              value={selectedUniversity}
              onChange={e => setSelectedUniversity(e.target.value)}
            >
              <option value="">All Universities</option>
              {universities.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <button className="search-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stats-inner">
          <div className="stat">
            <div className="stat-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="stat-num">{hostels.length}+</div>
              <div className="stat-label">Listed Properties</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="stat-num">{universities.length}</div>
              <div className="stat-label">Universities Covered</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Verified Listings</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#1a56db" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="stat-num">Secure</div>
              <div className="stat-label">Payments Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* LISTINGS */}
      <main className="main">
        <div className="section-header">
          <div>
            <h2 className="section-title">Available Properties</h2>
            <p className="section-sub">{loading ? 'Loading...' : `${filtered.length} properties available`}</p>
          </div>
        </div>

        <div className="grid">
          {loading ? (
            [1,2,3].map(i => (
              <div key={i} style={{background:'#f1f4f9',borderRadius:'12px',height:'360px',border:'1px solid #e2e8f0'}}></div>
            ))
          ) : filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>No properties found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          ) : (
            filtered.map(hostel => (
              <Link key={hostel.id} href={`/hostels/${hostel.id}`} className="card">
                <div className="card-img">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="card-verified">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-name">{hostel.name}</div>
                  <div className="card-meta">
                    <div className="card-meta-row">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="#94a3b8" strokeWidth="2"/>
                        <circle cx="12" cy="11" r="3" stroke="#94a3b8" strokeWidth="2"/>
                      </svg>
                      {hostel.address}, {hostel.city}
                    </div>
                    {hostel.universities && (
                      <div className="card-meta-row uni">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {hostel.universities.name}
                      </div>
                    )}
                  </div>
                  {hostel.amenities?.length > 0 && (
                    <div className="card-tags">
                      {hostel.amenities.slice(0,3).map((a,i) => (
                        <span key={i} className="tag">{a}</span>
                      ))}
                    </div>
                  )}
                  <div className="card-sep"></div>
                  <div className="card-bottom">
                    <div>
                      <div className="card-price-label">Starting from</div>
                      <div className="card-price-amt">
                        {hostel.rooms?.length > 0
                          ? `TZS ${Math.min(...hostel.rooms.map(r => r.price_per_month)).toLocaleString()}`
                          : 'Contact for price'}
                      </div>
                      <div className="card-price-per">per month</div>
                    </div>
                    <span className="btn-view">
                      View Details
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-inner">
          <h2 className="how-title">How DormLink Works</h2>
          <p className="how-sub">Book your student accommodation in three simple steps</p>
          <div className="how-grid">
            <div className="how-card">
              <div className="how-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#1a56db" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="how-step">1</div>
              <h3>Search Properties</h3>
              <p>Browse verified hostels near your university. Filter by price, amenities, and distance.</p>
            </div>
            <div className="how-card">
              <div className="how-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#1a56db" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#1a56db" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#1a56db" strokeWidth="2"/>
                </svg>
              </div>
              <div className="how-step">2</div>
              <h3>Book Online</h3>
              <p>Select your room and dates. Submit a booking request directly to the host.</p>
            </div>
            <div className="how-card">
              <div className="how-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="how-step">3</div>
              <h3>Move In</h3>
              <p>Pay securely online and receive your confirmation. Move in on your chosen date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <Link href="/" className="footer-logo">
                <div className="footer-logo-mark">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                DormLink
              </Link>
              <p className="footer-desc">Tanzania&apos;s trusted platform for verified student accommodation near top universities.</p>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <Link href="/register">Create Account</Link>
              <Link href="/login">Sign In</Link>
              <Link href="/">Browse Hostels</Link>
            </div>
            <div className="footer-col">
              <h4>For Hosts</h4>
              <Link href="/register">List Property</Link>
              <Link href="/login">Host Dashboard</Link>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="mailto:support@dormlink.co.tz">support@dormlink.co.tz</a>
              <a href="#">Help Center</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2024 DormLink. All rights reserved.</p>
            <p className="footer-copy">Built for Tanzanian students.</p>
          </div>
        </div>
      </footer>
    </>
  );
}