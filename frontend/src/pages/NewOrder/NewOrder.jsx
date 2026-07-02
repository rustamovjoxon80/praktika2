import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, Bell, Grid, Moon, LogOut, HelpCircle, 
  LayoutDashboard, Utensils, Package, Users, Settings, Plus,
  Minus, ShoppingBag, CreditCard, ChevronDown, ShoppingCart
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import UserProfile from '../../components/UserProfile/UserProfile';
import './NewOrder.css';
import burgerImg from '../../assets/burger.png';
import friesImg from '../../assets/fries.png';
import drinkImg from '../../assets/drink.png';
import chickenImg from '../../assets/chicken.png';
import dessertImg from '../../assets/dessert.png';
import saladImg from '../../assets/salad.png';
import tacosImg from '../../assets/tacos.png';

const menuItems = [
  { id: 1, nameKey: 'products.classic_burger', price: 12.50, tabIndex: 1, badge: '', image: burgerImg },
  { id: 2, nameKey: 'products.truffle_fries', price: 6.75, tabIndex: 2, badge: 'Side', image: friesImg },
  { id: 3, nameKey: 'products.lemonade', price: 4.25, tabIndex: 3, badge: 'Refresher', image: drinkImg },
  { id: 4, nameKey: 'products.chicken_deluxe', price: 11.50, tabIndex: 1, badge: '', image: chickenImg },
  { id: 5, nameKey: 'products.milkshake', price: 7.50, tabIndex: 4, badge: 'Kids Favorite', image: dessertImg },
  { id: 6, nameKey: 'products.chicken_bowl', price: 11.20, tabIndex: 2, badge: 'Healthy', image: saladImg },
  { id: 7, nameKey: 'products.street_tacos', price: 8.40, tabIndex: 2, badge: 'Appetizer', image: tacosImg },
  { id: 8, nameKey: 'products.soda', price: 2.50, tabIndex: 3, badge: 'Drink', image: drinkImg },
];

function NewOrder() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [orderItems, setOrderItems] = useState([
    { ...menuItems[0], quantity: 2 },
    { ...menuItems[1], quantity: 1 },
  ]);
  const { cartItems, setIsCartOpen } = useCart();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cart, setCart] = useState([
    { id: 1, nameKey: 'products.classic_burger', price: 12.50, qty: 1, note: 'No Pickles, Extra Cheese', image: burgerImg },
    { id: 2, nameKey: 'products.truffle_fries', price: 6.75, qty: 2, note: 'Regular Size', image: friesImg }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { index: 0, labelKey: 'new_order.all_items' },
    { index: 1, labelKey: 'new_order.burgers' },
    { index: 2, labelKey: 'new_order.sides' },
    { index: 3, labelKey: 'new_order.beverages' },
    { index: 4, labelKey: 'new_order.desserts' }
  ];

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1, note: '' }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(c => {
      if (c.id === id) {
        const newQty = c.qty + delta;
        return newQty > 0 ? { ...c, qty: newQty } : c;
      }
      return c;
    }).filter(c => c.qty > 0));
  };

  let filteredItems = activeTabIndex === 0 
    ? menuItems 
    : menuItems.filter(m => m.tabIndex === activeTabIndex);

  if (searchQuery.trim() !== '') {
    filteredItems = filteredItems.filter(item => 
      t(item.nameKey).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branchId: 1,
          total: total,
          items: cart
        })
      });
      if (response.ok) {
        alert("Buyurtma muvaffaqiyatli qabul qilindi! 🎉");
        setCart([]);
      } else {
        const errData = await response.json().catch(() => ({}));
        alert(`Xatolik: ${errData.error || response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Server xatosi: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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
      <main className="main-content new-order-layout">
        
        {/* Left Side: Menu */}
        <div className="menu-section">
          {/* Topbar inside Menu */}
          <header className="topbar">
            <div className="search-bar" style={{width: '350px', background: '#fdf5ef', border: 'none'}}>
              <Search size={16} color="#888" />
              <input 
                type="text" 
                placeholder={t('new_order.search_placeholder')} 
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

          <div className="menu-body">
            <div className="menu-tabs">
              {tabs.map(tab => (
                <button 
                  key={tab.index} 
                  className={`menu-tab ${activeTabIndex === tab.index ? 'active' : ''}`}
                  onClick={() => setActiveTabIndex(tab.index)}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {filteredItems.map(item => (
                <div className="menu-card" key={item.id} onClick={() => addToCart(item)}>
                  <div className="menu-card-image" style={{backgroundImage: `url(${item.image})`}}></div>
                  <div className="menu-card-content">
                    <h4>{t(item.nameKey)}</h4>
                    <div className="menu-card-bottom">
                      <span className="menu-price">${item.price.toFixed(2)}</span>
                      {item.badge && <span className="menu-badge">{item.badge}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Cart */}
        <div className="cart-section">
          <div className="cart-header">
            <div className="cart-title">
              <ShoppingBag size={20} color="#333" />
              <h2>{t('new_order.current_order')}</h2>
              <span className="order-number">{t('new_order.order_num')}</span>
            </div>
            <div className="cart-tabs">
              <button className="cart-tab active">{t('new_order.dine_in')}</button>
              <button className="cart-tab">{t('new_order.takeaway')}</button>
            </div>
          </div>

          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={t(item.nameKey)} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-title">
                    <h4>{t(item.nameKey)}</h4>
                    <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  {item.note && <p className="cart-item-note">{item.note}</p>}
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>{t('new_order.subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>{t('new_order.tax')}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>{t('new_order.total')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="cart-actions">
              <button className="btn-split">{t('new_order.split_pay')}</button>
              <button 
                className="btn-place" 
                onClick={handlePlaceOrder} 
                disabled={isSubmitting || cart.length === 0}
              >
                {isSubmitting ? '...' : <>{t('new_order.place_order')} &rarr;</>}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewOrder;
