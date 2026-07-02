import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, Bell, Grid, Moon, LogOut, HelpCircle, 
  LayoutDashboard, Utensils, Package, Users, Settings, Plus,
  Filter, MoreHorizontal, Clock, CheckCircle2, XCircle, ShoppingCart,
  Calendar, Download, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Operations.css';

const orders = [
  { id: '#QB-92834', initials: 'JD', customer: 'Johnathan Doe', date: 'Oct 19, 2023 · 12:45 PM', amount: '$45.50', statusKey: 'operations.completed', color: 'green' },
  { id: '#QB-92833', initials: 'SR', customer: 'Sarah Richardson', date: 'Oct 19, 2023 · 12:30 PM', amount: '$128.20', statusKey: 'operations.pending', color: 'yellow' },
  { id: '#QB-92832', initials: 'MK', customer: 'Marcus Kane', date: 'Oct 19, 2023 · 11:15 AM', amount: '$32.00', statusKey: 'operations.cancelled', color: 'red' },
  { id: '#QB-92831', initials: 'AL', customer: 'Amara Lopez', date: 'Oct 19, 2023 · 10:45 AM', amount: '$56.75', statusKey: 'operations.completed', color: 'green' },
  { id: '#QB-92830', initials: 'TW', customer: 'Thomas Wright', date: 'Oct 19, 2023 · 09:20 AM', amount: '$18.40', statusKey: 'operations.completed', color: 'green' },
];

function Operations() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, setIsCartOpen } = useCart();

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
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
        </div>

        <nav className="sidebar-menu">
          <div className="menu-group">
            <ul>
              <li onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}><LayoutDashboard size={18} /> {t('sidebar.dashboard')}</li>
              <li className="active"><Utensils size={18} /> {t('sidebar.operations')}</li>
              <li onClick={() => navigate('/inventory')} style={{cursor: 'pointer'}}><Package size={18} /> {t('sidebar.inventory')}</li>
              <li onClick={() => navigate('/management')} style={{cursor: 'pointer'}}><Users size={18} /> {t('sidebar.management')}</li>
              {localStorage.getItem('role') === 'admin' && (
                <li onClick={() => navigate('/admin')} style={{cursor: 'pointer'}}><Settings size={18} /> {t('sidebar.admin')}</li>
              )}
            </ul>
          </div>
          
          <div className="sidebar-new-order">
            <button className="new-order-btn" onClick={() => navigate('/new-order')}>
              <Plus size={16} /> {t('sidebar.new_order')}
            </button>
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
          <div className="search-bar" style={{width: '400px'}}>
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

            <div className="icon-action"><Bell size={18} /></div>
            <div className="icon-action"><Grid size={18} /></div>
            <div className="icon-action"><Moon size={18} /></div>
            <button className="go-live-btn">{t('topbar.go_live')}</button>
            <div className="icon-action" onClick={() => setIsCartOpen(true)} style={{position: 'relative', cursor: 'pointer'}}>
              <ShoppingCart size={18} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </div>
            <UserProfile />
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="dashboard-body ops-body">
          <div className="ops-header-section">
            <div className="ops-header-text">
              <h1>{t('operations.title')}</h1>
              <p>{t('operations.subtitle')}</p>
            </div>
            <div className="ops-header-stats">
              <div className="stat-box">
                <span className="stat-box-label">{t('operations.completed_stats')}</span>
                <span className="stat-box-val" style={{color: '#c85310'}}>1,284</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-label">{t('operations.revenue_stats')}</span>
                <span className="stat-box-val" style={{color: '#c85310'}}>$42,910</span>
              </div>
            </div>
          </div>

          <div className="ops-card">
            {/* Filter Bar */}
            <div className="ops-filters">
              <div className="ops-tabs">
                <button className="ops-tab active">{t('operations.all_orders')}</button>
                <button className="ops-tab">{t('operations.dine_in')}</button>
                <button className="ops-tab">{t('operations.takeaway')}</button>
              </div>

              <div className="ops-filter-actions">
                <button className="ops-btn date-btn">
                  <Calendar size={14} /> Oct 12, 2023 - Oct 19, 2023
                </button>
                <select className="ops-select">
                  <option>{t('operations.all_statuses')}</option>
                  <option>{t('operations.completed')}</option>
                  <option>{t('operations.pending')}</option>
                  <option>{t('operations.cancelled')}</option>
                </select>
                <button className="ops-btn export-btn">
                  <Download size={14} /> {t('operations.export_csv')}
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="ops-table-wrapper">
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>{t('operations.table_id')}</th>
                    <th>{t('operations.table_customer')}</th>
                    <th>{t('operations.table_date')}</th>
                    <th style={{textAlign: 'right'}}>{t('operations.table_amount')}</th>
                    <th style={{textAlign: 'center'}}>{t('operations.table_status')}</th>
                    <th style={{textAlign: 'right'}}>{t('operations.table_actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="order-id">{order.id}</td>
                      <td>
                        <div className="customer-cell">
                          <div className={`initials-avatar ${order.color}`}>{order.initials}</div>
                          <span>{order.customer}</span>
                        </div>
                      </td>
                      <td className="date-time">{order.date}</td>
                      <td style={{textAlign: 'right', fontWeight: '600'}}>{order.amount}</td>
                      <td style={{textAlign: 'center'}}>
                        <span className={`status-badge ${order.color}`}>
                          {t(order.statusKey)}
                        </span>
                      </td>
                      <td style={{textAlign: 'right'}}>
                        <a href="#" className="details-link">{t('operations.details')}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="ops-pagination">
              <span className="showing-text">{t('operations.showing')}</span>
              <div className="page-numbers">
                <button className="page-nav"><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
                <button className="page-nav"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Operations;
