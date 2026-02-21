'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success('Welcome back!');
      if (!user || !user.role) {
        toast.error('Login error: no role found');
        setLoading(false);
        return;
      }
      if (user.role === 'admin') window.location.href = '/admin/dashboard';
      else if (user.role === 'host') window.location.href = '/host/dashboard';
      else window.location.href = '/student/dashboard';
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || 'Invalid email or password';
      toast.error(message, { duration: 4000 });
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Inter',sans-serif;background:#f8fafc;}
        .page{min-height:100vh;display:flex;}
        .left{flex:1;background:linear-gradient(160deg,#0f172a 0%,#1e3a7a 100%);padding:48px;display:flex;flex-direction:column;justify-content:space-between;}
        .left-logo{font-family:'Merriweather',serif;font-size:22px;font-weight:700;color:white;display:flex;align-items:center;gap:10px;text-decoration:none;}
        .logo-mark{width:34px;height:34px;background:#1a56db;border-radius:8px;display:flex;align-items:center;justify-content:center;}
        .left-content{margin-top:60px;}
        .left-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(26,86,219,0.2);border:1px solid rgba(26,86,219,0.4);color:#93b4f8;padding:5px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:24px;}
        .left h2{font-family:'Merriweather',serif;font-size:36px;font-weight:700;color:white;line-height:1.2;margin-bottom:16px;}
        .left h2 span{color:#93b4f8;}
        .left p{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;max-width:380px;}
        .left-features{display:flex;flex-direction:column;gap:14px;margin-top:36px;}
        .lf{display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.6);font-size:14px;}
        .lf-icon{width:32px;height:32px;background:rgba(26,86,219,0.25);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .right{width:480px;display:flex;align-items:center;justify-content:center;padding:48px;background:white;}
        .form-box{width:100%;max-width:380px;}
        .form-title{font-family:'Merriweather',serif;font-size:26px;font-weight:700;color:#0f172a;margin-bottom:6px;}
        .form-sub{font-size:14px;color:#94a3b8;margin-bottom:32px;}
        .form-group{margin-bottom:18px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:#475569;margin-bottom:6px;}
        .form-input{width:100%;border:1px solid #e2e8f0;border-radius:7px;padding:11px 14px;font-size:14px;font-family:'Inter',sans-serif;color:#0f172a;outline:none;transition:border 0.15s;}
        .form-input:focus{border-color:#1a56db;box-shadow:0 0 0 3px rgba(26,86,219,0.1);}
        .btn-submit{width:100%;background:#1a56db;color:white;border:none;padding:12px;border-radius:7px;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;margin-top:8px;}
        .btn-submit:hover{background:#1e429f;}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .form-footer{text-align:center;margin-top:20px;font-size:13px;color:#94a3b8;}
        .form-footer a{color:#1a56db;font-weight:500;text-decoration:none;}
        .divider{display:flex;align-items:center;gap:12px;margin:24px 0;}
        .divider-line{flex:1;height:1px;background:#e2e8f0;}
        .divider-text{font-size:12px;color:#94a3b8;}
      `}</style>

      <div className="page">
        <div className="left">
          <Link href="/" className="left-logo">
            <div className="logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            DormLink
          </Link>
          <div className="left-content">
            <div className="left-tag">Student Housing Platform</div>
            <h2>Welcome Back to <span>DormLink</span></h2>
            <p>Tanzania&apos;s most trusted platform for verified student accommodation.</p>
            <div className="left-features">
              {['Verified properties only', 'Secure online payments', 'Book in minutes'].map((f, i) => (
                <div key={i} className="lf">
                  <div className="lf-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#93b4f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.2)'}}>© 2024 DormLink. All rights reserved.</div>
        </div>

        <div className="right">
          <div className="form-box">
            <h1 className="form-title">Sign In</h1>
            <p className="form-sub">Enter your credentials to access your account</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  required
                />
              </div>
              <button className="btn-submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>
            <p className="form-footer">
              Don&apos;t have an account? <Link href="/register">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}