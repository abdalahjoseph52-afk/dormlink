'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    password: '', phone: '', role: 'student',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.password) {
      toast.error('Please fill in all required fields'); return;
    }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      toast.success('Account created! Please sign in.');
      setTimeout(() => window.location.href = '/login', 1000);
    } catch (e) {
      toast.error(e.response?.data?.error || 'Registration failed. Try again.');
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
        .left{background:linear-gradient(160deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:48px;position:relative;overflow:hidden;}
        .left::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E");}
        .left-content{position:relative;text-align:center;color:white;max-width:400px;}
        .left-logo{font-family:'Sora',sans-serif;font-size:32px;font-weight:800;color:white;display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:40px;}
        .left-logo-icon{width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:14px;display:flex;align-items:center;justify-content:center;}
        .left-title{font-family:'Sora',sans-serif;font-size:clamp(22px,3vw,34px);font-weight:800;line-height:1.2;margin-bottom:16px;}
        .left-sub{font-size:15px;opacity:0.75;line-height:1.7;margin-bottom:32px;}
        .perks{display:flex;flex-direction:column;gap:14px;text-align:left;}
        .perk{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.08);border-radius:12px;padding:14px 16px;border:1px solid rgba(255,255,255,0.12);}
        .perk-icon{width:36px;height:36px;background:rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .perk-text{font-size:14px;font-weight:500;}
        .right{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px;background:white;overflow-y:auto;}
        .form-box{width:100%;max-width:440px;}
        .form-title{font-family:'Sora',sans-serif;font-size:26px;font-weight:800;color:#0f172a;margin-bottom:4px;}
        .form-sub{font-size:14px;color:#64748b;margin-bottom:28px;}
        .role-select{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;}
        .role-card{border:2px solid #e5e7eb;border-radius:12px;padding:16px;cursor:pointer;transition:all 0.2s;text-align:center;background:#f9fafb;}
        .role-card:hover{border-color:#93c5fd;}
        .role-card.active{border-color:#2563eb;background:#eff6ff;}
        .role-card-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;background:#e2e8f0;}
        .role-card.active .role-card-icon{background:#dbeafe;}
        .role-card-label{font-size:14px;font-weight:700;color:#0f172a;}
        .role-card-desc{font-size:11px;color:#64748b;margin-top:2px;}
        .form-group{margin-bottom:16px;}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .form-label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:5px;}
        .input-wrap{position:relative;}
        .input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#9ca3af;font-size:18px;}
        .form-input{width:100%;border:1.5px solid #e5e7eb;border-radius:12px;padding:12px 14px 12px 42px;font-size:14px;font-family:'DM Sans',sans-serif;color:#0f172a;outline:none;transition:all 0.2s;background:#f9fafb;}
        .form-input:focus{border-color:#2563eb;background:white;box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
        .pass-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9ca3af;}
        .btn-submit{width:100%;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:white;border:none;padding:14px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px;}
        .btn-submit:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(37,99,235,0.3);}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none;}
        .form-footer{text-align:center;font-size:14px;color:#64748b;margin-top:16px;}
        .form-footer a{color:#2563eb;font-weight:600;text-decoration:none;}
        .back-home{display:inline-flex;align-items:center;gap:6px;color:#64748b;font-size:13px;text-decoration:none;margin-bottom:24px;}
        .back-home:hover{color:#2563eb;}
        .section-label{font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @media(max-width:768px){
          .page{grid-template-columns:1fr;}
          .left{display:none;}
          .right{padding:28px 20px;min-height:100vh;}
          .form-row{grid-template-columns:1fr;}
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
            <div className="left-title">Join Tanzania's biggest student housing platform</div>
            <div className="left-sub">Trusted by students and hosts from Dar es Salaam to Dodoma, Mwanza to Arusha.</div>
            <div className="perks">
              {[
                { icon: 'search', text: 'Search hostels near your university instantly' },
                { icon: 'verified_user', text: 'All properties verified before listing' },
                { icon: 'payments', text: 'Pay securely via M-Pesa, Tigo or Airtel' },
                { icon: 'support_agent', text: 'Support available 7 days a week' },
              ].map((p, i) => (
                <div key={i} className="perk">
                  <div className="perk-icon">
                    <span className="material-icons-round" style={{color:'white',fontSize:'18px'}}>{p.icon}</span>
                  </div>
                  <div className="perk-text">{p.text}</div>
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
            <div className="form-title">Create your account</div>
            <div className="form-sub">Free forever — no credit card required</div>

            <div className="section-label">I am a...</div>
            <div className="role-select">
              {[
                { value: 'student', label: 'Student', desc: 'Looking for accommodation', icon: 'school' },
                { value: 'host', label: 'Host / Owner', desc: 'Listing my property', icon: 'home' },
              ].map(r => (
                <div key={r.value} className={`role-card ${form.role === r.value ? 'active' : ''}`}
                  onClick={() => setForm({...form, role: r.value})}>
                  <div className="role-card-icon">
                    <span className="material-icons-round" style={{color: form.role === r.value ? '#2563eb' : '#64748b',fontSize:'22px'}}>{r.icon}</span>
                  </div>
                  <div className="role-card-label">{r.label}</div>
                  <div className="role-card-desc">{r.desc}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="section-label">Personal Details</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <div className="input-wrap">
                    <span className="material-icons-round input-icon">person</span>
                    <input className="form-input" placeholder="Abdalah" value={form.first_name}
                      onChange={e => setForm({...form, first_name: e.target.value})} required/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <div className="input-wrap">
                    <span className="material-icons-round input-icon">person</span>
                    <input className="form-input" placeholder="Mohamed" value={form.last_name}
                      onChange={e => setForm({...form, last_name: e.target.value})} required/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="input-wrap">
                  <span className="material-icons-round input-icon">mail</span>
                  <input className="form-input" type="email" placeholder="you@example.com" value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})} required/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-wrap">
                  <span className="material-icons-round input-icon">phone</span>
                  <input className="form-input" type="tel" placeholder="0712345678" value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}/>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <div className="input-wrap">
                  <span className="material-icons-round input-icon">lock</span>
                  <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="At least 6 characters"
                    value={form.password} onChange={e => setForm({...form, password: e.target.value})} required/>
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    <span className="material-icons-round" style={{fontSize:'20px'}}>{showPass ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? <>
                  <span style={{width:'18px',height:'18px',border:'2px solid rgba(255,255,255,0.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block'}}/>
                  Creating account...
                </> : <>
                  <span className="material-icons-round" style={{fontSize:'18px'}}>how_to_reg</span>
                  Create Account
                </>}
              </button>
            </form>

            <div className="form-footer">
              Already have an account? <Link href="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}