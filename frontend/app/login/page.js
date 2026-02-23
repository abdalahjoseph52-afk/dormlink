'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // NO auto-redirect useEffect — user must intentionally log in

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      // Use AuthContext login() — this calls the API AND sets user state in context
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.first_name}!`);
      setTimeout(() => {
        if (user.role === 'admin') router.push('/admin/dashboard');
        else if (user.role === 'host') router.push('/host/dashboard');
        else router.push('/student/dashboard');
      }, 600);
    } catch (e) {
      toast.error(e.response?.data?.error || 'Invalid email or password');
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
        body{font-family:'Outfit',sans-serif;background:#f8fafc;min-height:100vh;}
        .page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
        @media(max-width:768px){.page{grid-template-columns:1fr;}.left{display:none!important;}}
        .left{background:linear-gradient(155deg,#10367D 0%,#10367D 60%,#7A8FB5 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:48px;position:relative;overflow:hidden;}
        .left::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 70%,rgba(255,255,255,0.08) 0%,transparent 60%);}
        .orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:0.15;}
        .orb1{width:300px;height:300px;background:#7A8FB5;top:-80px;right:-80px;}
        .orb2{width:200px;height:200px;background:#7A8FB5;bottom:40px;left:20px;}
        .left-inner{position:relative;z-index:1;color:white;text-align:center;max-width:380px;}
        .brand{font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:48px;display:flex;align-items:center;gap:10px;justify-content:center;}
        .brand-icon{width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);}
        .left-title{font-size:32px;font-weight:700;line-height:1.2;margin-bottom:16px;}
        .left-sub{font-size:15px;opacity:0.75;line-height:1.6;}
        .feature-list{margin-top:40px;display:flex;flex-direction:column;gap:14px;text-align:left;}
        .feature-item{display:flex;align-items:center;gap:12px;font-size:14px;opacity:0.9;}
        .feature-dot{width:28px;height:28px;background:rgba(255,255,255,0.15);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .right{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:48px 32px;background:white;}
        .form-box{width:100%;max-width:400px;}
        .form-logo{display:none;font-size:22px;font-weight:800;color:#10367D;margin-bottom:32px;align-items:center;gap:8px;}
        @media(max-width:768px){.form-logo{display:flex;}}
        .form-title{font-size:26px;font-weight:700;color:#060E1C;margin-bottom:6px;}
        .form-sub{font-size:14px;color:#64748b;margin-bottom:32px;}
        .input-group{margin-bottom:18px;}
        .input-label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;}
        .input-wrap{position:relative;}
        .input-field{width:100%;padding:12px 16px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:15px;font-family:inherit;color:#060E1C;background:#fafafa;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
        .input-field:focus{border-color:#10367D;background:white;box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
        .input-field.has-icon{padding-right:44px;}
        .input-icon-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;padding:4px;display:flex;align-items:center;}
        .btn-submit{width:100%;padding:14px;background:#10367D;color:white;border:none;border-radius:10px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;transition:background 0.2s,transform 0.1s;margin-top:8px;}
        .btn-submit:hover:not(:disabled){background:#0B2960;}
        .btn-submit:active:not(:disabled){transform:scale(0.99);}
        .btn-submit:disabled{opacity:0.7;cursor:not-allowed;}
        .divider{display:flex;align-items:center;gap:12px;margin:20px 0;color:#94a3b8;font-size:13px;}
        .divider::before,.divider::after{content:'';flex:1;height:1px;background:#e2e8f0;}
        .signup-link{text-align:center;font-size:14px;color:#64748b;}
        .signup-link a{color:#10367D;font-weight:600;text-decoration:none;}
        .signup-link a:hover{text-decoration:underline;}
        .error-msg{background:#F4F7FC;border:1px solid #B8CAEB;color:#0B2960;padding:12px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
      `}</style>

      <div className="page">
        {/* Left panel */}
        <div className="left">
          <div className="orb orb1"/>
          <div className="orb orb2"/>
          <div className="left-inner">
            <div className="brand">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#10367D" stroke="white" strokeWidth="7"/><path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none"/><rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/><circle cx="70" cy="22" r="5.5" fill="#B5CE00"/><circle cx="73" cy="68" r="7.5" stroke="white" strokeWidth="4" fill="none"/><line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="white" strokeWidth="4" strokeLinecap="round"/></svg>
              <span><span style={{fontWeight:300,letterSpacing:'-0.02em'}}>Saka</span><span style={{fontWeight:700,letterSpacing:'-0.02em'}}>Boma</span></span>
            </div>
            <div className="left-title">Find Your Perfect Student Home</div>
            <div className="left-sub">Trusted accommodation near every university in Tanzania.</div>
            <div className="feature-list">
              {[
                {icon:'verified', text:'Verified and inspected properties'},
                {icon:'location_on', text:'Near your university campus'},
                {icon:'payments', text:'Secure semester-based payments'},
                {icon:'support_agent', text:'24/7 student support'},
              ].map(f => (
                <div key={f.icon} className="feature-item">
                  <div className="feature-dot">
                    <span className="material-icons-round" style={{fontSize:'14px'}}>{f.icon}</span>
                  </div>
                  {f.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="right">
          <div className="form-box">
            <div className="form-logo">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#10367D" strokeWidth="7"/><path d="M70 22 C70 44 55 50 50 50 C45 50 30 56 30 78" stroke="#10367D" strokeWidth="6.5" strokeLinecap="round" fill="none"/><rect x="23" y="71" width="14" height="14" rx="2.2" fill="#B5CE00"/><circle cx="70" cy="22" r="5.5" fill="#B5CE00"/><circle cx="73" cy="68" r="7.5" stroke="#10367D" strokeWidth="4" fill="none"/><line x1="67.7" y1="62.7" x2="62.7" y2="57.7" stroke="#10367D" strokeWidth="4" strokeLinecap="round"/></svg>
              <span><span style={{fontWeight:300,letterSpacing:'-0.02em',color:'#10367D'}}>Saka</span><span style={{fontWeight:700,letterSpacing:'-0.02em',color:'#10367D'}}>Boma</span></span>
            </div>
            <div className="form-title">Welcome back</div>
            <div className="form-sub">Sign in to your account to continue</div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Email address</label>
                <div className="input-wrap">
                  <input
                    className="input-field"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrap">
                  <input
                    className="input-field has-icon"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    autoComplete="current-password"
                  />
                  <button type="button" className="input-icon-btn" onClick={() => setShowPass(!showPass)}>
                    <span className="material-icons-round" style={{fontSize:'18px'}}>{showPass ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="divider">or</div>
            <div className="signup-link">
              Don't have an account? <Link href="/register">Create one free</Link>
            </div>
            <div style={{marginTop:'16px',textAlign:'center'}}>
              <Link href="/" style={{fontSize:'13px',color:'#64748b',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'4px'}}>
                <span className="material-icons-round" style={{fontSize:'14px'}}>arrow_back</span>
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
