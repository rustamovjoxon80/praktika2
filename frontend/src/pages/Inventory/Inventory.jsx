import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, Bell, Grid, Moon, LogOut, HelpCircle, 
  LayoutDashboard, Utensils, Package, Users, Settings, Plus,
  Filter, X, ShoppingCart
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Inventory.css';
import burgerImg from '../../assets/burger.png';
import friesImg from '../../assets/fries.png';
import drinkImg from '../../assets/drink.png';
import wingsImg from '../../assets/wings.png';
import dessertImg from '../../assets/dessert.png';
import saladImg from '../../assets/salad.png';

const initialInventoryItems = [
  { id: 1, nameKey: 'products.classic_smash', categoryKey: 'inventory.burgers', price: '$12.99', stock: 45, status: 'ACTIVE', statusColor: 'green', image: burgerImg },
  { id: 2, nameKey: 'products.crinkle_fries', categoryKey: 'inventory.sides', price: '$4.50', stock: 120, status: 'ACTIVE', statusColor: 'green', image: friesImg },
  { id: 3, nameKey: 'products.craft_soda', categoryKey: 'inventory.drinks', price: '$3.99', stock: 88, status: 'LOW STOCK', statusColor: 'red', image: drinkImg },
  { id: 4, nameKey: 'products.buffalo_wings', categoryKey: 'inventory.sides', price: '$10.99', stock: 32, status: 'ACTIVE', statusColor: 'green', image: wingsImg },
  { id: 5, nameKey: 'products.lava_cake', categoryKey: 'inventory.desserts', price: '$7.50', stock: 15, status: 'LIMITED', statusColor: 'orange', image: dessertImg },
  { id: 6, nameKey: 'products.salad', categoryKey: 'inventory.sides', price: '$6.99', stock: 54, status: 'ACTIVE', statusColor: 'green', image: saladImg },
];

function Inventory() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState(initialInventoryItems);
  const { cartItems, setIsCartOpen, addToCart } = useCart();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'inventory.burgers',
    price: '',
    stock: '',
    image: null
  });

  const role = localStorage.getItem('role') || 'admin';

  const filteredInventory = items.filter(item => {
    const name = item.nameKey ? t(item.nameKey).toLowerCase() : item.name.toLowerCase();
    const cat = t(item.categoryKey).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = name.includes(query) || cat.includes(query);
    const matchesCategory = selectedCategory === 'all' || item.categoryKey === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct({...newProduct, image: URL.createObjectURL(e.target.files[0])});
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;

    const newItem = {
      id: items.length + 1,
      name: newProduct.name,
      nameKey: null,
      categoryKey: newProduct.category,
      price: `$${newProduct.price}`,
      stock: parseInt(newProduct.stock),
      status: 'ACTIVE',
      statusColor: 'green',
      image: newProduct.image || burgerImg 
    };

    setItems([...items, newItem]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'inventory.burgers', price: '', stock: '', image: null });
  };

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
            <ul>
              <li onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}><LayoutDashboard size={18} /> {t('sidebar.dashboard')}</li>
              <li onClick={() => navigate('/operations')} style={{cursor: 'pointer'}}><Utensils size={18} /> {t('sidebar.operations')}</li>
              <li className="active"><Package size={18} /> {t('sidebar.inventory')}</li>
              <li onClick={() => navigate('/management')} style={{cursor: 'pointer'}}><Users size={18} /> {t('sidebar.management')}</li>
              {role === 'admin' && (
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
          <div className="search-bar" style={{width: '350px'}}>
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

        {/* Dashboard Body */}
        <div className="dashboard-body inv-body">
          <div className="inv-header">
            <div>
              <h1>{t('inventory.title')}</h1>
              <p>{t('inventory.subtitle')}</p>
            </div>
            {role === 'admin' && (
              <button className="inv-add-btn" onClick={() => setIsModalOpen(true)}>
                <Plus size={16} /> {t('inventory.add_product')}
              </button>
            )}
          </div>

          <div className="inv-search-section">
            <div className="inv-search-bar">
              <Search size={18} color="#888" />
              <input 
                type="text" 
                placeholder={t('inventory.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="inv-category-tabs">
              <button 
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                {t('inventory.all_categories')}
              </button>
              <button 
                className={`category-tab ${selectedCategory === 'inventory.burgers' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('inventory.burgers')}
              >
                {t('inventory.burgers')}
              </button>
              <button 
                className={`category-tab ${selectedCategory === 'inventory.sides' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('inventory.sides')}
              >
                {t('inventory.sides')}
              </button>
              <button 
                className={`category-tab ${selectedCategory === 'inventory.drinks' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('inventory.drinks')}
              >
                {t('inventory.drinks')}
              </button>
              <button 
                className={`category-tab ${selectedCategory === 'inventory.desserts' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('inventory.desserts')}
              >
                {t('inventory.desserts')}
              </button>
            </div>
            <button className="inv-filter-btn">
              <Filter size={18} />
            </button>
          </div>

          <div className="inv-grid">
            {filteredInventory.map(item => (
              <div className="inv-card" key={item.id} onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} style={{cursor: 'pointer'}}>
                <div className="inv-card-image" style={{backgroundImage: `url(${item.image})`}}>
                  <span className="inv-badge">{t(item.categoryKey)}</span>
                </div>
                <div className="inv-card-content">
                  <div className="inv-card-title">
                    <h3>{item.nameKey ? t(item.nameKey) : item.name}</h3>
                    <span className="inv-price">{item.price}</span>
                  </div>
                  <div className="inv-card-footer">
                    <span className="inv-stock"><Package size={14} /> {item.stock} {t('inventory.in_stock')}</span>
                    <span className={`inv-status ${item.statusColor}`}>
                      <span className="status-dot"></span> {item.status}
                    </span>
                    <button 
                      className="add-cart-btn" 
                      onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                      style={{background: '#c85310', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto'}}
                    >
                      <ShoppingCart size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {role === 'admin' && (
              <div className="inv-card add-new-card" onClick={() => setIsModalOpen(true)}>
                <div className="add-icon-wrapper">
                  <Plus size={24} color="#888" />
                </div>
                <h3>{t('inventory.add_new')}</h3>
                <p>{t('inventory.expand_menu')}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            <h2>{t('inventory.add_new')}</h2>
            <form className="modal-form" onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Product Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{padding: '6px', background: '#f8fafc'}}
                />
                {newProduct.image && (
                  <div style={{marginTop: '10px'}}>
                    <img src={newProduct.image} alt="Preview" style={{height: '80px', borderRadius: '8px', objectFit: 'cover'}} />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Double Cheeseburger" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="inventory.burgers">{t('inventory.burgers')}</option>
                  <option value="inventory.sides">{t('inventory.sides')}</option>
                  <option value="inventory.drinks">{t('inventory.drinks')}</option>
                  <option value="inventory.desserts">{t('inventory.desserts')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="e.g. 14.99" 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input 
                  type="number" 
                  placeholder="e.g. 100" 
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
