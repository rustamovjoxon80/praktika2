import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, Bell, Grid, Moon, LogOut, HelpCircle, 
  LayoutDashboard, Utensils, Package, Users, Settings, Plus,
  Filter, MoreHorizontal, Building, MapPin, Search as SearchIcon, ShoppingCart,
  Building2, Edit, Trash2, X
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Management.css';
import mapImg from '../../assets/map_ny.png';

const branches = [
  { id: 1, name: 'Downtown Core Plaza', address: '452 Broadway, Manhattan, NY 10013', manager: 'Sarah Jenkins', email: 'sarah.j@quickbite.com', statusKey: 'management.status_open', statusColor: 'green', avatar: 'https://i.pravatar.cc/100?img=9' },
  { id: 2, name: 'Westside Terminal', address: 'Pier 78, Hudson River Park, NY 10018', manager: 'David Chen', email: 'd.chen@quickbite.com', statusKey: 'management.status_closed', statusColor: 'gray', avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: 3, name: 'Heights Drive-Thru', address: '1200 Washington Ave, Brooklyn, NY 11225', manager: 'Maria Rodriguez', email: 'm.rodriguez@quickbite.com', statusKey: 'management.status_open', statusColor: 'green', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 4, name: 'Financial District Express', address: '20 Wall Street, New York, NY 10005', manager: 'Robert Wilson', email: 'r.wilson@quickbite.com', statusKey: 'management.status_open', statusColor: 'green', avatar: 'https://i.pravatar.cc/100?img=12' },
];

function Management() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, setIsCartOpen } = useCart();

  const [branchList, setBranchList] = useState(branches);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this branch?')) {
      setBranchList(branchList.filter(b => b.id !== id));
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch({ ...branch });
    setIsEditModalOpen(true);
  };

  const saveEditedBranch = (e) => {
    e.preventDefault();
    setBranchList(branchList.map(b => b.id === editingBranch.id ? editingBranch : b));
    setIsEditModalOpen(false);
    setEditingBranch(null);
  };

  const filteredBranches = branchList.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    branch.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
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
              <li onClick={() => navigate('/operations')} style={{cursor: 'pointer'}}><Utensils size={18} /> {t('sidebar.operations')}</li>
              <li onClick={() => navigate('/inventory')} style={{cursor: 'pointer'}}><Package size={18} /> {t('sidebar.inventory')}</li>
              <li className="active"><Users size={18} /> {t('sidebar.management')}</li>
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
          <div className="search-bar" style={{width: '350px', background: '#fdf5ef', border: 'none'}}>
            <Search size={16} color="#888" />
            <input 
              type="text" 
              placeholder={t('topbar.search')} 
              style={{background: 'transparent'}} 
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

            <button className="go-live-btn">{t('topbar.go_live')}</button>
            <div className="icon-action" onClick={() => setIsCartOpen(true)} style={{position: 'relative', cursor: 'pointer'}}>
              <ShoppingCart size={18} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </div>
            <div className="icon-action"><Bell size={18} /></div>
            <div className="icon-action"><Grid size={18} /></div>
            <div className="icon-action"><Moon size={18} /></div>
            <UserProfile />
          </div>
        </header>

        {/* Body */}
        <div className="dashboard-body admin-body">
          <div className="admin-header">
            <div>
              <h1>{t('management.title')}</h1>
              <p className="admin-subtitle">{t('management.subtitle')}</p>
            </div>
            <div className="admin-header-actions">
              <button className="create-branch-btn"><Building2 size={16} /> {t('management.create_branch')}</button>
            </div>
          </div>

          <div className="admin-stats">
            <div className="admin-stat-card">
              <div className="admin-stat-info">
                <p>{t('management.total_branches')}</p>
                <div className="admin-stat-value">
                  <h2>24</h2>
                  <span className="stat-badge orange">{t('management.new_branches')}</span>
                </div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-info">
                <p>{t('management.active_now')}</p>
                <div className="admin-stat-value">
                  <h2>21</h2>
                  <span className="stat-badge blue">22% {t('management.up')}</span>
                </div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-info">
                <p>{t('management.avg_efficiency')}</p>
                <div className="admin-stat-value">
                  <h2>94%</h2>
                  <span className="stat-badge gray">{t('management.steady')}</span>
                </div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-info">
                <p>{t('management.alerts')}</p>
                <div className="admin-stat-value">
                  <h2>03</h2>
                  <span className="stat-badge red">{t('management.action_req')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t('management.table_branch')}</th>
                  <th>{t('management.table_manager')}</th>
                  <th>{t('management.table_status')}</th>
                  <th>{t('management.table_actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map(branch => (
                  <tr key={branch.id}>
                    <td>
                      <div className="branch-cell">
                        <div className="branch-icon-box">
                          <Building2 size={18} color="#c85310" />
                        </div>
                        <div className="branch-info">
                          <h4>{branch.name}</h4>
                          <p>{branch.address}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="manager-cell">
                        <img src={branch.avatar} alt={branch.manager} className="manager-avatar" />
                        <div className="manager-info">
                          <h4>{branch.manager}</h4>
                          <p>{branch.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="branch-status">
                        <span className={`status-badge ${branch.statusColor}`}>
                          <span className={`status-dot ${branch.statusColor}`}></span> {t(branch.statusKey)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="branch-actions">
                        <button className="action-btn" onClick={() => handleEdit(branch)}><Edit size={14} /> {t('management.edit') || 'Edit'}</button>
                        <button className="action-btn" onClick={() => handleDelete(branch.id)}><Trash2 size={14} /> {t('management.delete') || 'Delete'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-bottom-section">
            <div className="admin-map-card" style={{backgroundImage: `url(${mapImg})`}}>
              <div className="map-overlay-card">
                <h3>{t('management.regional_footprint')}</h3>
                <p>{t('management.ny_area')}</p>
              </div>
              <div className="map-controls">
                <button>+</button>
                <button>-</button>
              </div>
            </div>

            <div className="admin-opt-card">
              <div className="opt-icon">
                <Grid size={24} color="white" />
              </div>
              <h2>{t('management.optimization')}</h2>
              <p>
                {t('management.opt_desc')}
              </p>
              <button className="auto-scale-btn">{t('management.apply_scaling')}</button>
            </div>
          </div>
        </div>
      </main>

      {isEditModalOpen && editingBranch && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{padding: '30px', width: '400px', borderRadius: '12px', background: 'white'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2 style={{margin: 0}}>Edit Branch</h2>
              <button onClick={() => setIsEditModalOpen(false)} style={{background: 'none', border: 'none', cursor: 'pointer'}}><X size={20} /></button>
            </div>
            <form onSubmit={saveEditedBranch}>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Branch Name</label>
                <input 
                  type="text" 
                  value={editingBranch.name} 
                  onChange={(e) => setEditingBranch({...editingBranch, name: e.target.value})} 
                  style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}}
                  required 
                />
              </div>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Address</label>
                <input 
                  type="text" 
                  value={editingBranch.address} 
                  onChange={(e) => setEditingBranch({...editingBranch, address: e.target.value})} 
                  style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}}
                  required 
                />
              </div>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Manager Name</label>
                <input 
                  type="text" 
                  value={editingBranch.manager} 
                  onChange={(e) => setEditingBranch({...editingBranch, manager: e.target.value})} 
                  style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}}
                  required 
                />
              </div>
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Status</label>
                <select 
                  value={editingBranch.statusKey} 
                  onChange={(e) => setEditingBranch({...editingBranch, statusKey: e.target.value, statusColor: e.target.value === 'management.status_open' ? 'green' : 'gray'})} 
                  style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd'}}
                >
                  <option value="management.status_open">Open</option>
                  <option value="management.status_closed">Closed</option>
                </select>
              </div>
              <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{padding: '10px 15px', background: '#eee', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}>Cancel</button>
                <button type="submit" style={{padding: '10px 15px', background: '#ff6b00', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Management;
