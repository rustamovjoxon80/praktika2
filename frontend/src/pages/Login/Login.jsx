import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Zap, Smartphone, QrCode, Globe, User } from 'lucide-react';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isRegister) {
      if (phone.length < 5 || password.length < 4 || !name) {
        setError(t('login.error'));
        return;
      }
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
      users.push({ phone, password, name, role: 'user' });
      localStorage.setItem('registered_users', JSON.stringify(users));
      
      setSuccess(t('login.success_reg'));
      setIsRegister(false);
      setPassword('');
      setName('');
    } else {
      if (phone === '940997002' && password === '7002') {
        localStorage.setItem('role', 'admin');
        localStorage.setItem('currentUser', JSON.stringify({ name: 'Admin User', phone: '940997002', role: 'admin' }));
        navigate('/dashboard');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const user = users.find(u => u.phone === phone && u.password === password);
      
      if (user) {
        localStorage.setItem('role', 'user');
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError(t('login.error'));
      }
    }
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="brand">
          <div className="logo-icon">
            <Zap size={24} color="white" fill="white" />
          </div>
          <div className="brand-text">
            <h1>Kinetic Kitchen</h1>
            <p className="subtitle">{t('login.brand_subtitle')}</p>
          </div>
        </div>
        
        <h2 className="tagline" dangerouslySetInnerHTML={{__html: t('login.tagline')}}></h2>
        
        <div className="trust-indicator">
          <div className="avatars">
            <div className="avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=11)'}}></div>
            <div className="avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=12)'}}></div>
            <div className="avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=13)'}}></div>
          </div>
          <span>{t('login.trusted')}</span>
        </div>
      </div>

      <div className="right-panel" style={{position: 'relative'}}>
        
        <div style={{position: 'absolute', top: '32px', right: '40px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Globe size={16} color="#888" />
            <select 
              value={i18n.language} 
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              style={{
                background: '#fff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '8px 12px', 
                fontSize: '13px', 
                fontWeight: '600', 
                color: '#1e293b', 
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                outline: 'none',
                transition: 'all 0.2s',
                minWidth: '80px'
              }}
            >
              <option value="en">🇺🇸 EN</option>
              <option value="uz">🇺🇿 UZ</option>
              <option value="ru">🇷🇺 RU</option>
            </select>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h3>{isRegister ? t('login.register') : t('login.welcome')}</h3>
            <p>{isRegister ? t('login.welcome_desc') : t('login.welcome_desc')}</p>
          </div>

          {success && <div style={{color: '#10b981', background: '#d1fae5', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', fontWeight: '500'}}>{success}</div>}

          <form className="login-form" onSubmit={handleAuth}>
            
            {isRegister && (
              <div className="form-group">
                <label>{t('login.name')}</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon left" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>{t('login.phone')}</label>
              <div className="input-with-prefix">
                <span className="prefix">+998</span>
                <input 
                  type="text" 
                  placeholder="94 099 70 02" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>{t('login.password')}</label>
                {!isRegister && <a href="#" className="forgot-password">{t('login.forgot')}</a>}
              </div>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon left" />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder={t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div 
                  className="input-icon right" 
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>

            {error && <div style={{color: '#ff4d4f', fontSize: '12px', marginBottom: '16px', fontWeight: '500'}}>{error}</div>}

            <button type="submit" className="login-button">
              {isRegister ? t('login.register_btn') : t('login.login_btn')} &rarr;
            </button>
          </form>

          <div style={{marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#475569'}}>
            {isRegister ? t('login.have_account') : t('login.no_account')}{' '}
            <span 
              onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess(''); }} 
              style={{color: '#c85310', fontWeight: '600', cursor: 'pointer'}}
            >
              {isRegister ? t('login.login_btn') : t('login.register')}
            </span>
          </div>

          {!isRegister && (
            <button type="button" className="qr-button" style={{marginTop: '20px'}}>
              <QrCode size={16} /> {t('login.qr_login')}
            </button>
          )}

          <div className="support-links">
            <span className="help-text">{t('login.need_help')}</span>
            <div className="links">
               <a href="#"><Smartphone size={14}/> {t('login.contact')}</a>
               <a href="#">{t('login.docs')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
