import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, Bell, Grid, Moon, LogOut, HelpCircle, 
  LayoutDashboard, Utensils, Package, Users, Settings, Plus,
  Calendar, Download, TrendingUp, Receipt, UsersRound, ShoppingCart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCart } from '../../context/CartContext';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Dashboard.css';
import burgerImg from '../../assets/burger.png';
import friesImg from '../../assets/fries.png';
import wrapImg from '../../assets/wrap.png';
import berryLemonadeImg from '../../assets/berry_lemonade.png';
import tacosImg from '../../assets/tacos.png';

const data = [
  { name: 'Mon', dineIn: 4000, delivery: 2400 },
  { name: 'Tue', dineIn: 3000, delivery: 1398 },
  { name: 'Wed', dineIn: 2000, delivery: 9800 },
  { name: 'Thu', dineIn: 2780, delivery: 3908 },
  { name: 'Fri', dineIn: 1890, delivery: 4800 },
  { name: 'Sat', dineIn: 2390, delivery: 3800 },
  { name: 'Sun', dineIn: 3490, delivery: 4300 },
];

const topSelling = [
  { id: 1, nameKey: 'products.classic_burger', sales: 842, price: '$5,894', growth: '+4%', image: burgerImg },
  { id: 2, nameKey: 'products.chicken_wrap', sales: 612, price: '$4,284', growth: '+8%', image: wrapImg },
  { id: 3, nameKey: 'products.truffle_fries', sales: 520, price: '$3,120', growth: '0%', image: friesImg },
  { id: 4, nameKey: 'products.lemonade', sales: 411, price: '$2,055', growth: '-2%', image: berryLemonadeImg },
  { id: 5, nameKey: 'products.tacos', sales: 390, price: '$1,950', growth: '+15%', image: tacosImg },
];

function Dashboard() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, setIsCartOpen, addToCart } = useCart();

  const filteredTopSelling = topSelling.filter(item => 
    t(item.nameKey).toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-box">
              <span style={{fontSize: '10px'}}>Q</span>
            </div>
            <div className="logo-text">
              <h2>QuickBite OMS</h2>
              <p>Central Kitchen HQ</p>
            </div>
          </div>
          <button className="new-order-btn" onClick={() => navigate('/new-order')}>
            <Plus size={16} /> {t('sidebar.new_order')}
          </button>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-group">
            <p className="menu-label">{t('sidebar.core')}</p>
            <ul>
              <li className="active"><LayoutDashboard size={18} /> {t('sidebar.dashboard')}</li>
              <li onClick={() => navigate('/operations')} style={{cursor: 'pointer'}}><Utensils size={18} /> {t('sidebar.operations')}</li>
              <li onClick={() => navigate('/inventory')} style={{cursor: 'pointer'}}><Package size={18} /> {t('sidebar.inventory')}</li>
              <li onClick={() => navigate('/management')} style={{cursor: 'pointer'}}><Users size={18} /> {t('sidebar.management')}</li>
              {localStorage.getItem('role') === 'admin' && (
                <li onClick={() => navigate('/admin')} style={{cursor: 'pointer'}}><Settings size={18} /> {t('sidebar.admin')}</li>
              )}
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          <ul>
            <li><HelpCircle size={18} /> {t('sidebar.help_center')}</li>
            <li onClick={() => navigate('/')} style={{cursor: 'pointer'}}><LogOut size={18} /> {t('sidebar.sign_out')}</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-bar">
            <Search size={16} color="#888" />
            <input 
              type="text" 
              placeholder={t('topbar.search')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

            <div className="icon-action" onClick={() => setIsCartOpen(true)} style={{position: 'relative', cursor: 'pointer'}}>
              <ShoppingCart size={18} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </div>
            <div className="icon-action"><Bell size={18} /></div>
            <div className="icon-action"><Grid size={18} /></div>
            <div className="icon-action"><Moon size={18} /></div>
            <button className="go-live-btn">{t('topbar.go_live')}</button>
            <UserProfile />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-body">
          <div className="dashboard-header">
            <div>
              <h1>{t('dashboard.greeting')}</h1>
              <p>{t('dashboard.subtitle')}</p>
            </div>
            <div className="header-actions">
              <button className="btn-outline"><Calendar size={14} /> {t('dashboard.this_week')}</button>
              <button className="btn-outline"><Download size={14} /> {t('dashboard.export')}</button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-info">
                <p className="stat-label">{t('dashboard.total_sales')}</p>
                <h2 className="stat-value">$12,450.00</h2>
                <div className="stat-trend positive">
                  <TrendingUp size={12} /> +5.2% <span>{t('dashboard.from_yesterday')}</span>
                </div>
              </div>
              <div className="stat-icon-wrapper" style={{background: '#fdf5ef', color: '#c85310'}}>
                <Receipt size={20} />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <p className="stat-label">{t('dashboard.todays_orders')}</p>
                <h2 className="stat-value">142</h2>
                <div className="stat-trend positive">
                  <TrendingUp size={12} /> +12.4% <span>{t('dashboard.capacity_high')}</span>
                </div>
              </div>
              <div className="stat-icon-wrapper" style={{background: '#f0f5ff', color: '#2f54eb'}}>
                <Package size={20} />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-info">
                <p className="stat-label">{t('dashboard.active_cashiers')}</p>
                <h2 className="stat-value">8</h2>
                <div className="stat-trend neutral">
                  <span className="badge">{t('dashboard.full_shift')}</span> <span>{t('dashboard.no_alerts')}</span>
                </div>
              </div>
              <div className="stat-icon-wrapper" style={{background: '#f6ffed', color: '#52c41a'}}>
                <UsersRound size={20} />
              </div>
            </div>
          </div>

          <div className="content-grid">
            {/* Chart Section */}
            <div className="chart-section">
              <div className="chart-header">
                <div>
                  <h3>{t('dashboard.weekly_revenue')}</h3>
                  <p>{t('dashboard.metrics')}</p>
                </div>
                <div className="chart-legend">
                  <span className="legend-item"><span className="dot dine-in"></span> {t('dashboard.dine_in')}</span>
                  <span className="legend-item"><span className="dot delivery"></span> {t('dashboard.delivery')}</span>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={45}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} tickFormatter={(value) => `$${value/1000}k`} ticks={[0, 3000, 6000, 9000, 12000]} />
                    <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                    <Bar dataKey="dineIn" stackId="a" fill="#d49a7a" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="delivery" stackId="a" fill="#ead4c8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Selling Section */}
            <div className="top-selling-section">
              <div className="section-header">
                <h3>{t('dashboard.top_selling')}</h3>
                <a href="#" className="view-all">{t('dashboard.view_all')}</a>
              </div>
              <div className="top-selling-list">
                {filteredTopSelling.map((item) => (
                  <div className="list-item" key={item.id}>
                    <img src={item.image} alt={t(item.nameKey)} className="item-image" />
                    <div className="item-details">
                      <h4>{t(item.nameKey)}</h4>
                      <p>{item.sales} {t('dashboard.units_sold')}</p>
                    </div>
                    <div className="item-stats">
                      <h4>{item.price}</h4>
                      <span className={`growth ${item.growth.startsWith('+') ? 'positive' : item.growth === '0%' ? 'neutral' : 'negative'}`}>
                        {item.growth}
                      </span>
                      <button className="add-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
