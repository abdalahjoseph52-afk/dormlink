'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') window.location.href = '/admin/dashboard';
      else if (user.role === 'host') window.location.href = '/host/dashboard';
      else window.location.href = '/student/dashboard';
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      const { token, user: userData } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success(`Welcome back, ${userData.first_name}!`);
      setTimeout(() => {
        if (userData.role === 'admin') window.location.href = '/admin/dashboard';
        else if (userData.role === 'host') window.location.href = '/host/dashboard';
        else window.location.href = '/student/dashboard';
      }, 800);
    } catch (e) {
      toast.error(e.response?.data?.error || 'Invalid email or password');
    } finally { setLoading(false); }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#f8fafc;min-height:100vh;}
        .page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
        .left{background:linear-gradient(160deg,#1e3a8a 0%,#2563eb 50%,#3b82f6 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:48px;position:relative;overflow:hidden;}
        .left::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E");}
        .left-content{position:relative;text-align:center;color:white;max-width:400px;}
        .left-logo{font-family:'Sora',sans-serif;font-size:32px;font-weight:800;color:white;display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:48px;}
        .left-logo-icon{width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:14px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);}
        .left-title{font-family:'Sora',sans-serif;font-size:clamp(24px,3vw,36px);font-weight:800;line-height:1.2;margin-bottom:16px;}
        .left-sub{font-size:16px;opacity:0.75;line-height:1.7;margin-bottom:40px;}
        .left-stats{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;}
        .left-stat{background:rgba(255,255,255,0.1);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:16px 20px;text-align:center;}
        .left-stat-num{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;}
        .left-stat-label{font-size:12px;opacity:0.65;margin-top:2px;}
        .right{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:48px 40px;background:white;}
        .form-box{width:100%;max-width:420px;}
        .form-title{font-family:'Sora',sans-serif;font-size:28px;font-weight:800;color:#0f172a;margin-bottom:6px;}
        .form-sub{font-size:15px;color:#64748b;margin-bottom:32px;}
        .form-group{margin-bottom:18px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;}
        .input-wrap{position:relative;}
        .input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#9ca3af;font-size:20px;}
        .form-input{width:100%;border:1.5px solid #e5e7eb;border-radius:12px;padding:13px 14px 13px 44px;font-size:15px;font-family:'DM Sans',sans-serif;color:#0f172a;outline:none;transition:all 0.2s;background:#f9fafb;}
        .form-input:focus{border-color:#2563eb;background:white;box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
        .pass-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9ca3af;display:flex;}
        .btn-submit{width:100%;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:14px;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-submit:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(37,99,235,0.3);}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none;}
        .divider{display:flex;align-items:center;gap:12px;margin:20px 0;color:#9ca3af;font-size:13px;}
        .divider::before,.divider::after{content:'';flex:1;height:1px;background:#e5e7eb;}
        .form-footer{text-align:center;font-size:14px;color:#64748b;margin-top:20px;}
        .form-footer a{color:#2563eb;font-weight:600;text-decoration:none;}
        .form-footer a:hover{text-decoration:underline;}
        .forgot{display:block;text-align:right;font-size:13px;color:#2563eb;font-weight:600;text-decoration:none;margin-top:6px;}
        .forgot:hover{text-decoration:underline;}
        .back-home{display:inline-flex;align-items:center;gap:6px;color:#64748b;font-size:13px;text-decoration:none;margin-bottom:32px;transition:color 0.2s;}
        .back-home:hover{color:#2563eb;}
        @media(max-width:768px){
          .page{grid-template-columns:1fr;}
          .left{display:none;}
          .right{padding:32px 24px;min-height:100vh;}
        }
      `}</style>

      <div className="page">
        <div className="left">
          <div className="left-content">
            <div className="left-logo">
              <div className="left-logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              DormLink
            </div>
            <div className="left-title">Find your home away from home</div>
            <div className="left-sub">Join thousands of students who found safe, affordable accommodation near their university across Tanzania.</div>
            <div className="left-stats">
              {[{num:'500+',label:'Hostels Listed'},{num:'44+',label:'Universities'},{num:'20+',label:'Cities'}].map((s,i)=>(
                <div key={i} className="left-stat">
                  <div className="left-stat-num">{s.num}</div>
                  <div className="left-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right">
          <div className="form-box">
            <Link href="/" className="back-home">
              <span className="material-icons-round" style={{fontSize:'16px'}}>arrow_back</span>
              Back to home
            </Link>
            <div className="form-title">Welcome back 👋</div>
            <div className="form-sub">Sign in to your DormLink account</div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrap">
                  <span className="material-icons-round input-icon">mail</span>
                  <input className="form-input" type="email" placeholder="you@example.com"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} required/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <span className="material-icons-round input-icon">lock</span>
                  <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Enter your password"
                    value={form.password} onChange={e => setForm({...form, password: e.target.value})} required/>
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    <span className="material-icons-round" style={{fontSize:'20px'}}>{showPass ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? <>
                  <span style={{width:'18px',height:'18px',border:'2px solid rgba(255,255,255,0.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block'}}/>
                  Signing in...
                </> : <>
                  <span className="material-icons-round" style={{fontSize:'18px'}}>login</span>
                  Sign In
                </>}
              </button>
            </form>

            <div className="form-footer">
              Don't have an account?{' '}
              <Link href="/register">Sign up free</Link>
            </div>

            <div className="form-footer" style={{marginTop:'8px'}}>
              <Link href="/" style={{color:'#94a3b8',fontSize:'13px'}}>← Browse hostels without signing in</Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </>
  );
}