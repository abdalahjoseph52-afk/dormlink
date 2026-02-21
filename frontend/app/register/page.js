'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    phone: '', password: '', role: 'student'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form);
      toast.success('Account created successfully!');
      if (user.role === 'host') router.push('/host/dashboard');
      else router.push('/student/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #f8fafc; }
        .page { min-height: 100vh; display: flex; }
        .left { flex: 1; background: linear-gradient(160deg, #0f172a 0%, #1e3a7a 100%); padding: 48px; display: flex; flex-direction: column; justify-content: space-between; }
        .left-logo { font-family: 'Merriweather', serif; font-size: 22px; font-weight: 700; color: white; display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-mark { width: 34px; height: 34px; background: #1a56db; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .left h2 { font-family: 'Merriweather', serif; font-size: 36px; font-weight: 700; color: white; line-height: 1.2; margin-bottom: 16px; margin-top: 48px; }
        .left h2 span { color: #93b4f8; }
        .left p { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 380px; }
        .role-cards { display: flex; flex-direction: column; gap: 12px; margin-top: 36px; }
        .role-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px 18px; display: flex; align-items: center; gap: 14px; }
        .role-icon { width: 36px; height: 36px; background: rgba(26,86,219,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .role-title { font-size: 14px; font-weight: 600; color: white; }
        .role-desc { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .right { width: 520px; display: flex; align-items: center; justify-content: center; padding: 48px; background: white; overflow-y: auto; }
        .form-box { width: 100%; max-width: 420px; }
        .form-title { font-family: 'Merriweather', serif; font-size: 26px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
        .form-sub { font-size: 14px; color: #94a3b8; margin-bottom: 28px; }
        .role-tabs { display: flex; background: #f1f4f9; border-radius: 8px; padding: 4px; margin-bottom: 24px; }
        .role-tab { flex: 1; padding: 9px; text-align: center; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; border: none; font-family: 'Inter', sans-serif; background: none; color: #94a3b8; }
        .role-tab.active { background: white; color: #1a56db; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-group { margin-bottom: 16px; }
        .form-label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
        .form-input { width: 100%; border: 1px solid #e2e8f0; border-radius: 7px; padding: 11px 14px; font-size: 14px; font-family: 'Inter', sans-serif; color: #0f172a; outline: none; transition: border 0.15s; }
        .form-input:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        .btn-submit { width: 100%; background: #1a56db; color: white; border: none; padding: 12px; border-radius: 7px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; margin-top: 8px; }
        .btn-submit:hover { background: #1e429f; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-footer { text-align: center; margin-top: 20px; font-size: 13px; color: #94a3b8; }
        .form-footer a { color: #1a56db; font-weight: 500; text-decoration: none; }
        .terms { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 14px; line-height: 1.5; }
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
          <div>
            <h2>Join <span>DormLink</span><br />Today</h2>
            <p>Create your free account and get access to hundreds of verified student properties across Tanzania.</p>
            <div className="role-cards">
              <div className="role-card">
                <div className="role-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="#93b4f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="role-title">For Students</div>
                  <div className="role-desc">Browse, book and manage your accommodation online</div>
                </div>
              </div>
              <div className="role-card">
                <div className="role-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#93b4f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="role-title">For Property Owners</div>
                  <div className="role-desc">List your hostel and reach thousands of students</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.2)'}}>© 2024 DormLink. All rights reserved.</div>
        </div>

        <div className="right">
          <div className="form-box">
            <h1 className="form-title">Create Account</h1>
            <p className="form-sub">Join thousands of students and hosts on DormLink</p>

            <div className="role-tabs">
              <button
                className={`role-tab ${form.role === 'student' ? 'active' : ''}`}
                onClick={() => setForm({...form, role: 'student'})}
                type="button"
              >
                I am a Student
              </button>
              <button
                className={`role-tab ${form.role === 'host' ? 'active' : ''}`}
                onClick={() => setForm({...form, role: 'host'})}
                type="button"
              >
                I am a Host
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-input" type="text" placeholder="John"
                    value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-input" type="text" placeholder="Doe"
                    value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" placeholder="07XXXXXXXX"
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="Min. 8 characters"
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
              </div>
              <button className="btn-submit" disabled={loading}>
                {loading ? 'Creating account...' : `Create ${form.role === 'host' ? 'Host' : 'Student'} Account`}
              </button>
            </form>

            <p className="form-footer">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
            <p className="terms">By creating an account you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </>
  );
}