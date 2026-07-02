import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, Bell, Grid, Moon, LogOut, HelpCircle, 
  LayoutDashboard, Utensils, Package, Users, Settings, Plus,
  Building2, Banknote, Palette, ShieldCheck, BellRing, Sun, Check
} from 'lucide-react';
import './Admin.css';
import UserProfile from '../../components/UserProfile/UserProfile';
import chefLogo from '../../assets/chef_logo.png';

function Admin() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [activeTab, setActiveTab] = useState('General');
  const [themeMode, setThemeMode] = useState('Light');
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="dashboard-container" style={{backgroundColor: '#fafafa'}}>
      {/* Sidebar */}
      <aside className="sidebar admin-custom-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-box" style={{background: '#fa6b00', color: 'white'}}>
              <Utensils size={16} />
            </div>
            <div className="logo-text">
              <h2 style={{color: '#fa6b00', fontWeight: '700', fontSize: '18px'}}>QuickBite OMS</h2>
              <p style={{color: '#aaa', fontSize: '12px'}}>Central Kitchen HQ</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-group">
            <p className="menu-label" style={{padding: '0 24px', fontSize: '10px', color: '#666', fontWeight: '800', marginBottom: '12px', letterSpacing: '1px'}}>{t('sidebar.core')}</p>
            <ul>
              <li onClick={() => navigate('/dashboard')}><LayoutDashboard size={18} /> {t('sidebar.dashboard')}</li>
              <li onClick={() => navigate('/operations')}><Utensils size={18} /> {t('sidebar.operations')}</li>
              <li onClick={() => navigate('/inventory')}><Package size={18} /> {t('sidebar.inventory')}</li>
              <li onClick={() => navigate('/management')}><Users size={18} /> {t('sidebar.management')}</li>
              <li className="active"><Settings size={18} /> {t('sidebar.admin')}</li>
            </ul>
          </div>
        </nav>

        <div className="sidebar-new-order" style={{marginTop: 'auto', padding: '0 24px', marginBottom: '20px'}}>
          <button className="new-order-btn" onClick={() => navigate('/new-order')} style={{width: '100%', background: '#ff6b00', color: 'white', border: 'none', padding: '12px 0', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'}}>
            <Plus size={16} /> {t('sidebar.new_order')}
          </button>
        </div>

        <div className="sidebar-footer">
          <ul>
            <li><HelpCircle size={18} /> {t('sidebar.help_center')}</li>
            <li onClick={() => navigate('/')}><LogOut size={18} /> {t('sidebar.sign_out')}</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{background: '#fff'}}>
        {/* Topbar */}
        <header className="topbar admin-topbar">
          <div className="search-bar" style={{width: '350px', background: '#fdf5ef', border: 'none'}}>
            <Search size={16} color="#888" />
            <input type="text" placeholder={t('topbar.search')} style={{background: 'transparent', width: '100%'}} />
          </div>
          <div className="topbar-actions">
            <span className="action-link">{t('topbar.support')}</span>
            <span className="action-link">{t('topbar.status')}</span>
            <span className="action-link">{t('topbar.docs')}</span>
            
            <select 
              value={i18n.language} 
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              style={{background: 'transparent', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', fontWeight: 'bold', color: '#555', cursor: 'pointer', marginLeft: '8px'}}
            >
              <option value="en">🇺🇸 EN</option>
              <option value="uz">🇺🇿 UZ</option>
              <option value="ru">🇷🇺 RU</option>
            </select>

            <button className="go-live-btn" style={{background: '#b54900', color: 'white', padding: '8px 16px', borderRadius: '20px', border: 'none', fontSize: '12px', fontWeight: '600', marginLeft: '12px', cursor: 'pointer'}}>{t('topbar.go_live')}</button>
            <div className="icon-action"><Bell size={18} /></div>
            <div className="icon-action"><Grid size={18} /></div>
            <div className="icon-action"><Moon size={18} /></div>
            <UserProfile />
          </div>
        </header>

        <div className="admin-body">
          <div className="admin-header">
            <h1>{t('admin.title')}</h1>
            <p>{t('admin.subtitle')}</p>
          </div>

          <div className="settings-layout">
            {/* Settings Sidebar */}
            <div className="settings-sidebar">
              <button 
                className={`set-tab-btn ${activeTab === 'General' ? 'active' : ''}`}
                onClick={() => setActiveTab('General')}
              >
                <Building2 size={16} /> {t('admin.tabs.general')}
              </button>
              <button 
                className={`set-tab-btn ${activeTab === 'Financials' ? 'active' : ''}`}
                onClick={() => setActiveTab('Financials')}
              >
                <Banknote size={16} /> {t('admin.tabs.financials')}
              </button>
              <button 
                className={`set-tab-btn ${activeTab === 'Appearance' ? 'active' : ''}`}
                onClick={() => setActiveTab('Appearance')}
              >
                <Palette size={16} /> {t('admin.tabs.appearance')}
              </button>
              <button 
                className={`set-tab-btn ${activeTab === 'Security' ? 'active' : ''}`}
                onClick={() => setActiveTab('Security')}
              >
                <ShieldCheck size={16} /> {t('admin.tabs.security')}
              </button>
              <button 
                className={`set-tab-btn ${activeTab === 'Alerts' ? 'active' : ''}`}
                onClick={() => setActiveTab('Alerts')}
              >
                <BellRing size={16} /> {t('admin.tabs.alerts')}
              </button>
            </div>

            {/* Settings Content */}
            <div className="settings-content">
              
              {/* Branding & Identity Section */}
              <div className="settings-card">
                <div className="card-header">
                  <h2>{t('admin.branding.title')}</h2>
                  <span className="live-badge">{t('admin.branding.live')}</span>
                </div>
                
                <div className="branding-grid">
                  <div className="branding-inputs">
                    <div className="set-input-group">
                      <label>{t('admin.branding.company_name')}</label>
                      <input type="text" defaultValue="QuickBite Central" />
                    </div>
                    <div className="set-input-group">
                      <label>{t('admin.branding.store_identifier')}</label>
                      <input type="text" defaultValue="QB-OMS-001" />
                    </div>
                  </div>
                  <div className="branding-logo">
                    <label>{t('admin.branding.company_logo')}</label>
                    <div className="logo-upload-box">
                      <div className="logo-preview">
                        <img src={chefLogo} alt="Logo" style={{width: '60px', height: '60px', borderRadius: '8px', objectFit: 'contain'}} />
                      </div>
                      <span>{t('admin.branding.change_logo')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financials Section */}
              <div className="settings-card">
                <div className="card-header">
                  <h2><Banknote size={20} color="#b54900"/> {t('admin.financials.title')}</h2>
                </div>
                <div className="financials-grid">
                  <div className="set-input-group">
                    <label>{t('admin.financials.tax_percentage')}</label>
                    <div className="input-with-suffix">
                      <input type="text" defaultValue="8.50" />
                      <span className="suffix">%</span>
                    </div>
                  </div>
                  <div className="set-input-group">
                    <label>{t('admin.financials.default_currency')}</label>
                    <select defaultValue="USD">
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  <div className="set-input-group">
                    <label>{t('admin.financials.payout_schedule')}</label>
                    <select defaultValue="Weekly">
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Theme Settings Section */}
              <div className="settings-card">
                <div className="card-header">
                  <h2><Palette size={20} color="#b54900"/> {t('admin.theme.title')}</h2>
                </div>
                <div className="theme-options">
                  <div 
                    className={`theme-card light ${themeMode === 'Light' ? 'active' : ''}`}
                    onClick={() => setThemeMode('Light')}
                  >
                    <div className="theme-icon"><Sun size={24} /></div>
                    <div className="theme-info">
                      <h4>{t('admin.theme.light_mode')}</h4>
                      <p>{t('admin.theme.light_desc')}</p>
                    </div>
                    <div className="theme-check">
                      {themeMode === 'Light' && <Check size={14} color="#b54900" />}
                    </div>
                  </div>
                  
                  <div 
                    className={`theme-card dark ${themeMode === 'Dark' ? 'active' : ''}`}
                    onClick={() => setThemeMode('Dark')}
                  >
                    <div className="theme-icon"><Moon size={24} /></div>
                    <div className="theme-info">
                      <h4>{t('admin.theme.dark_mode')}</h4>
                      <p>{t('admin.theme.dark_desc')}</p>
                    </div>
                    <div className="theme-check">
                      {themeMode === 'Dark' && <Check size={14} color="#666" />}
                    </div>
                  </div>
                </div>

                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>{t('admin.theme.high_contrast')}</h4>
                    <p>{t('admin.theme.contrast_desc')}</p>
                  </div>
                  <div 
                    className={`toggle-switch ${highContrast ? 'active' : ''}`}
                    onClick={() => setHighContrast(!highContrast)}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="settings-actions">
                <button className="discard-btn">{t('admin.actions.discard')}</button>
                <button className="save-btn">{t('admin.actions.save')}</button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;
