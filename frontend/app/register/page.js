'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

// SakaBoma SVG icon (reversed — white strokes on blue)
const SakaBomaIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#10367D" stroke="white" strokeWidth="7"/>
    <path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"/>
    <rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/>
    <circle cx="70" cy="22" r="5.5" fill="#B5CE00"/>
    <circle cx="73" cy="68" r="7.5" stroke="white" strokeWidth="4" fill="none"/>
    <line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="white" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState(null); // null = choose, 'student', 'host'
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Shared fields
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', password: '', phone: '',
    // Host-only fields
    business_name: '', national_id: '', address: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name.trim()) { toast.error('Enter your first name'); return; }
    if (!form.last_name.trim()) { toast.error('Enter your last name'); return; }
    if (!form.email.trim()) { toast.error('Enter your email'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (!form.phone.trim()) { toast.error('Enter your phone number'); return; }

    if (role === 'host') {
      if (!form.business_name.trim()) { toast.error('Enter your business/property name'); return; }
      if (!form.national_id.trim()) { toast.error('Enter your National ID number'); return; }
    }

    setLoading(true);
    try {
      const payload = {
        first_name: form.first_name.trim(),
        last_name:  form.last_name.trim(),
        email:      form.email.trim().toLowerCase(),
        password:   form.password,
        phone:      form.phone.trim(),
        role,
        ...(role === 'host' && {
          business_name: form.business_name.trim(),
          national_id:   form.national_id.trim(),
          address:       form.address.trim(),
        }),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      // Auto-login
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success(`Welcome to SakaBoma, ${data.user.first_name}!`);
      setTimeout(() => {
        if (data.user.role === 'host') router.push('/host/dashboard');
        else router.push('/student/dashboard');
      }, 700);
    } catch (e) {
      toast.error(e.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Outfit',sans-serif;background:#F4F7FC;min-height:100vh;}

        /* ── PAGE LAYOUT ── */
        .page{min-height:100vh;display:flex;}
        .left{width:420px;flex-shrink:0;background:linear-gradient(160deg,#060E1C 0%,#10367D 60%,#1a4a9e 100%);display:flex;flex-direction:column;justify-content:space-between;padding:48px 44px;position:relative;overflow:hidden;}
        .left::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 10% 90%,rgba(181,206,0,0.08),transparent 60%);}
        .left-inner{position:relative;z-index:1;}
        .brand{display:flex;align-items:center;gap:12px;margin-bottom:56px;}
        .brand-wm{font-size:22px;color:white;line-height:1;}
        .brand-wm strong{font-weight:700;}
        .left-headline{font-size:clamp(24px,3vw,32px);font-weight:700;color:white;line-height:1.2;margin-bottom:12px;letter-spacing:-0.3px;}
        .left-sub{font-size:14px;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:40px;}
        .feature{display:flex;align-items:flex-start;gap:12px;margin-bottom:18px;}
        .feature-ic{width:34px;height:34px;background:rgba(255,255,255,0.1);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
        .feature-text strong{display:block;font-size:13px;font-weight:600;color:white;margin-bottom:2px;}
        .feature-text span{font-size:12px;color:rgba(255,255,255,0.55);line-height:1.5;}
        .left-footer{position:relative;z-index:1;font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:0.05em;}

        /* ── RIGHT PANEL ── */
        .right{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 32px;overflow-y:auto;}
        .box{width:100%;max-width:520px;}

        /* ── ROLE CHOOSER ── */
        .chooser-title{font-size:26px;font-weight:700;color:#060E1C;margin-bottom:6px;letter-spacing:-0.3px;}
        .chooser-sub{font-size:14px;color:#7A8FB5;margin-bottom:32px;line-height:1.6;}
        .role-cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px;}
        .role-card{border:1.5px solid #D5DFEE;border-radius:14px;padding:24px 20px;cursor:pointer;background:white;transition:all 0.18s;text-align:left;}
        .role-card:hover{border-color:#10367D;box-shadow:0 4px 20px rgba(16,54,125,0.1);}
        .role-card.active{border-color:#10367D;background:#F4F7FC;box-shadow:0 4px 20px rgba(16,54,125,0.12);}
        .role-icon{width:44px;height:44px;background:#F4F7FC;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
        .role-card.active .role-icon{background:#10367D;}
        .role-card.active .role-icon span{color:white!important;}
        .role-name{font-size:15px;font-weight:700;color:#060E1C;margin-bottom:4px;}
        .role-desc{font-size:12px;color:#7A8FB5;line-height:1.5;}
        .role-tag{display:inline-flex;align-items:center;gap:4px;background:#F4F7FC;color:#10367D;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;margin-top:8px;letter-spacing:0.04em;}
        .role-card.active .role-tag{background:#10367D;color:white;}

        /* ── FORM ── */
        .form-header{margin-bottom:28px;}
        .back-btn{display:inline-flex;align-items:center;gap:6px;color:#7A8FB5;font-size:13px;font-weight:500;cursor:pointer;border:none;background:none;padding:0;margin-bottom:20px;font-family:'Outfit',sans-serif;}
        .back-btn:hover{color:#10367D;}
        .form-title{font-size:24px;font-weight:700;color:#060E1C;margin-bottom:4px;letter-spacing:-0.3px;}
        .form-sub{font-size:14px;color:#7A8FB5;line-height:1.6;}
        .role-badge{display:inline-flex;align-items:center;gap:6px;background:#F4F7FC;border:1px solid #D5DFEE;color:#10367D;font-size:12px;font-weight:600;padding:5px 12px;border-radius:20px;margin-bottom:24px;}

        .section-label{font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8CAEB;display:flex;align-items:center;gap:10px;margin:20px 0 14px;}
        .section-label::after{content:'';flex:1;height:1px;background:#D5DFEE;}

        .fields-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .field{margin-bottom:14px;}
        .field label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px;}
        .field label .req{color:#10367D;}
        .input-wrap{position:relative;}
        .field input,.field select,.field textarea{width:100%;padding:11px 14px;border:1.5px solid #D5DFEE;border-radius:9px;font-size:14px;font-family:'Outfit',sans-serif;color:#060E1C;background:white;outline:none;transition:border-color 0.18s,box-shadow 0.18s;}
        .field input:focus,.field select:focus,.field textarea:focus{border-color:#10367D;box-shadow:0 0 0 3px rgba(16,54,125,0.08);}
        .field input.has-eye{padding-right:42px;}
        .eye-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#B8CAEB;padding:2px;display:flex;align-items:center;}
        .eye-btn:hover{color:#7A8FB5;}
        .field textarea{resize:vertical;min-height:72px;}
        .field-hint{font-size:11px;color:#B8CAEB;margin-top:4px;}

        .host-notice{background:#F4F7FC;border:1px solid #D5DFEE;border-left:3px solid #10367D;border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:12px;color:#7A8FB5;line-height:1.6;}
        .host-notice strong{color:#10367D;display:block;margin-bottom:3px;font-size:13px;}

        .btn-submit{width:100%;padding:14px;background:#10367D;color:white;border:none;border-radius:10px;font-size:15px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;transition:background 0.18s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-submit:hover:not(:disabled){background:#0B2960;}
        .btn-submit:disabled{opacity:0.65;cursor:not-allowed;}

        .login-link{text-align:center;font-size:13px;color:#7A8FB5;margin-top:18px;}
        .login-link a{color:#10367D;font-weight:600;text-decoration:none;}
        .login-link a:hover{text-decoration:underline;}

        .terms{font-size:11px;color:#B8CAEB;text-align:center;margin-top:12px;line-height:1.6;}
        .terms a{color:#10367D;text-decoration:none;}

        /* ── RESPONSIVE ── */
        @media(max-width:900px){.left{display:none;}}
        @media(max-width:560px){
          .right{padding:24px 16px;}
          .role-cards{grid-template-columns:1fr;}
          .fields-row{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="page">
        {/* ── LEFT PANEL ── */}
        <div className="left">
          <div className="left-inner">
            <div className="brand">
              <SakaBomaIcon size={38}/>
              <div className="brand-wm"><span style={{fontWeight:300}}>Saka</span><strong>Boma</strong></div>
            </div>
            <div className="left-headline">Your university home starts here</div>
            <div className="left-sub">Tanzania's trusted student accommodation platform. Find verified hostels near your campus and book securely in minutes.</div>
            {[
              { icon:'verified_user', title:'Verified Properties', desc:'Every listed hostel is reviewed and approved by our team before going live.' },
              { icon:'school', title:'Near Every University', desc:'44+ universities across Tanzania covered — from UDSM to MUST, SUA to ZU.' },
              { icon:'payments', title:'Secure Payments', desc:'Pay via M-Pesa, Tigo Pesa, Airtel Money or Bank Transfer. All transactions recorded.' },
              { icon:'support_agent', title:'Dedicated Support', desc:'Host and student support available to resolve any issue fast.' },
            ].map(f => (
              <div key={f.icon} className="feature">
                <div className="feature-ic">
                  <span className="material-icons-round" style={{fontSize:'18px',color:'#B5CE00'}}>{f.icon}</span>
                </div>
                <div className="feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="left-footer">© {new Date().getFullYear()} SakaBoma Tanzania · All rights reserved</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right">
          <div className="box">

            {/* ── STEP 1: CHOOSE ROLE ── */}
            {!role && (
              <>
                <div style={{textAlign:'center',marginBottom:32}}>
                  <div className="chooser-title">Create your account</div>
                  <div className="chooser-sub">Are you looking for a place to stay, or listing accommodation?</div>
                </div>

                <div className="role-cards">
                  {/* STUDENT */}
                  <div className="role-card" onClick={() => setRole('student')}>
                    <div className="role-icon">
                      <span className="material-icons-round" style={{fontSize:'22px',color:'#10367D'}}>school</span>
                    </div>
                    <div className="role-name">I'm a Student</div>
                    <div className="role-desc">Looking for accommodation near my university campus.</div>
                    <div className="role-tag">
                      <span className="material-icons-round" style={{fontSize:'10px'}}>arrow_forward</span>
                      Find a hostel
                    </div>
                  </div>

                  {/* HOST */}
                  <div className="role-card" onClick={() => setRole('host')}>
                    <div className="role-icon">
                      <span className="material-icons-round" style={{fontSize:'22px',color:'#10367D'}}>apartment</span>
                    </div>
                    <div className="role-name">I'm a Property Owner</div>
                    <div className="role-desc">I own or manage student accommodation and want to list it.</div>
                    <div className="role-tag">
                      <span className="material-icons-round" style={{fontSize:'10px'}}>arrow_forward</span>
                      List property
                    </div>
                  </div>
                </div>

                <div className="login-link">
                  Already have an account? <Link href="/login">Sign in</Link>
                </div>
              </>
            )}

            {/* ── STEP 2A: STUDENT FORM ── */}
            {role === 'student' && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-header">
                  <button type="button" className="back-btn" onClick={() => setRole(null)}>
                    <span className="material-icons-round" style={{fontSize:'16px'}}>arrow_back</span>
                    Back
                  </button>
                  <div className="form-title">Student Registration</div>
                  <div className="form-sub">Create your student account to search and book hostels.</div>
                </div>

                <div className="role-badge">
                  <span className="material-icons-round" style={{fontSize:'14px'}}>school</span>
                  Student Account
                </div>

                <div className="section-label">Personal Information</div>
                <div className="fields-row">
                  <div className="field">
                    <label>First Name <span className="req">*</span></label>
                    <input type="text" placeholder="e.g. Amina" value={form.first_name} onChange={e=>set('first_name',e.target.value)} autoComplete="given-name"/>
                  </div>
                  <div className="field">
                    <label>Last Name <span className="req">*</span></label>
                    <input type="text" placeholder="e.g. Njoroge" value={form.last_name} onChange={e=>set('last_name',e.target.value)} autoComplete="family-name"/>
                  </div>
                </div>

                <div className="field">
                  <label>Email Address <span className="req">*</span></label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e=>set('email',e.target.value)} autoComplete="email"/>
                </div>

                <div className="field">
                  <label>Phone Number <span className="req">*</span></label>
                  <input type="tel" placeholder="e.g. 0712 345 678" value={form.phone} onChange={e=>set('phone',e.target.value)} autoComplete="tel"/>
                  <div className="field-hint">Used for booking confirmations and host communication</div>
                </div>

                <div className="section-label">Account Security</div>
                <div className="field">
                  <label>Password <span className="req">*</span></label>
                  <div className="input-wrap">
                    <input type={showPass?'text':'password'} className="has-eye" placeholder="Minimum 6 characters" value={form.password} onChange={e=>set('password',e.target.value)} autoComplete="new-password"/>
                    <button type="button" className="eye-btn" onClick={()=>setShowPass(v=>!v)}>
                      <span className="material-icons-round" style={{fontSize:'18px'}}>{showPass?'visibility_off':'visibility'}</span>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? <><span className="material-icons-round" style={{fontSize:'18px',animation:'spin 0.7s linear infinite'}}>refresh</span> Creating account...</>
                    : <><span className="material-icons-round" style={{fontSize:'18px'}}>person_add</span> Create Student Account</>
                  }
                </button>
                <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>

                <div className="login-link" style={{marginTop:16}}>Already have an account? <Link href="/login">Sign in</Link></div>
                <div className="terms">By registering you agree to SakaBoma's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></div>
              </form>
            )}

            {/* ── STEP 2B: HOST FORM ── */}
            {role === 'host' && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-header">
                  <button type="button" className="back-btn" onClick={() => setRole(null)}>
                    <span className="material-icons-round" style={{fontSize:'16px'}}>arrow_back</span>
                    Back
                  </button>
                  <div className="form-title">Property Owner Registration</div>
                  <div className="form-sub">List your accommodation and reach thousands of students across Tanzania.</div>
                </div>

                <div className="role-badge">
                  <span className="material-icons-round" style={{fontSize:'14px'}}>apartment</span>
                  Host / Property Owner Account
                </div>

                <div className="host-notice">
                  <strong>Verification Required</strong>
                  Your account will be reviewed before your listings go live. We verify all property owners to maintain trust and safety on the platform.
                </div>

                <div className="section-label">Personal Information</div>
                <div className="fields-row">
                  <div className="field">
                    <label>First Name <span className="req">*</span></label>
                    <input type="text" placeholder="e.g. Joseph" value={form.first_name} onChange={e=>set('first_name',e.target.value)} autoComplete="given-name"/>
                  </div>
                  <div className="field">
                    <label>Last Name <span className="req">*</span></label>
                    <input type="text" placeholder="e.g. Mwangi" value={form.last_name} onChange={e=>set('last_name',e.target.value)} autoComplete="family-name"/>
                  </div>
                </div>

                <div className="field">
                  <label>Email Address <span className="req">*</span></label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e=>set('email',e.target.value)} autoComplete="email"/>
                </div>

                <div className="field">
                  <label>Phone Number <span className="req">*</span></label>
                  <input type="tel" placeholder="e.g. 0712 345 678" value={form.phone} onChange={e=>set('phone',e.target.value)} autoComplete="tel"/>
                </div>

                <div className="section-label">Business & Property Details</div>

                <div className="field">
                  <label>Business / Property Name <span className="req">*</span></label>
                  <input type="text" placeholder="e.g. Amani Student Hostel" value={form.business_name} onChange={e=>set('business_name',e.target.value)}/>
                  <div className="field-hint">The name your hostel is known by or your business trading name</div>
                </div>

                <div className="field">
                  <label>National ID Number <span className="req">*</span></label>
                  <input type="text" placeholder="e.g. 19830412-12345-00001-7" value={form.national_id} onChange={e=>set('national_id',e.target.value)}/>
                  <div className="field-hint">Required for identity verification — kept strictly confidential</div>
                </div>

                <div className="field">
                  <label>Property / Business Address</label>
                  <textarea placeholder="Street, Area, City (e.g. Mlimani Road, Ubungo, Dar es Salaam)" value={form.address} onChange={e=>set('address',e.target.value)} rows={2}/>
                </div>

                <div className="section-label">Account Security</div>
                <div className="field">
                  <label>Password <span className="req">*</span></label>
                  <div className="input-wrap">
                    <input type={showPass?'text':'password'} className="has-eye" placeholder="Minimum 6 characters" value={form.password} onChange={e=>set('password',e.target.value)} autoComplete="new-password"/>
                    <button type="button" className="eye-btn" onClick={()=>setShowPass(v=>!v)}>
                      <span className="material-icons-round" style={{fontSize:'18px'}}>{showPass?'visibility_off':'visibility'}</span>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? <><span className="material-icons-round" style={{fontSize:'18px',animation:'spin 0.7s linear infinite'}}>refresh</span> Creating account...</>
                    : <><span className="material-icons-round" style={{fontSize:'18px'}}>add_home_work</span> Create Host Account</>
                  }
                </button>

                <div className="login-link" style={{marginTop:16}}>Already have an account? <Link href="/login">Sign in</Link></div>
                <div className="terms">By registering you agree to SakaBoma's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></div>
              </form>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
