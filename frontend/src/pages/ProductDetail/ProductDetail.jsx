import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Package, Edit, Trash2, ShoppingCart } from 'lucide-react';
import './ProductDetail.css';
import { useCart } from '../../context/CartContext';

function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = localStorage.getItem('role') || 'admin';
  const { addToCart } = useCart();
  
  const product = state?.product;

  if (!product) {
    return (
      <div className="pd-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/inventory')} style={{marginTop: '20px', padding: '10px 20px', background: '#c85310', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Go Back to Inventory</button>
      </div>
    );
  }

  const productName = product.nameKey ? t(product.nameKey) : product.name;
  const productCategory = t(product.categoryKey);

  return (
    <div className="pd-container">
      {/* Header */}
      <div className="pd-header">
        <button className="pd-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back to Inventory
        </button>
        {role === 'admin' && (
          <div className="pd-admin-actions">
            <button className="pd-btn outline"><Edit size={16} /> Edit Product</button>
            <button className="pd-btn danger"><Trash2 size={16} /> Delete</button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pd-content">
        <div className="pd-image-section">
          <div className="pd-image-wrapper">
            <img src={product.image} alt={productName} />
            <span className={`pd-status-badge ${product.statusColor}`}>{product.status}</span>
          </div>
        </div>
        
        <div className="pd-info-section">
          <div className="pd-category-tag">{productCategory}</div>
          <h1 className="pd-title">{productName}</h1>
          <div className="pd-price">{product.price}</div>
          
          <p className="pd-description">
            Experience the exquisite taste of our finest {productName}. Made with premium ingredients and crafted to perfection, it's designed to satisfy your cravings.
          </p>

          <div className="pd-stats-grid">
            <div className="pd-stat-card">
              <span className="pd-stat-label">In Stock</span>
              <div className="pd-stat-value">
                <Package size={18} color="#c85310" />
                <span>{product.stock} Units</span>
              </div>
            </div>
            <div className="pd-stat-card">
              <span className="pd-stat-label">Calories</span>
              <div className="pd-stat-value">
                <span>🔥 450 kcal</span>
              </div>
            </div>
            <div className="pd-stat-card">
              <span className="pd-stat-label">Allergens</span>
              <div className="pd-stat-value">
                <span>🌾 Dairy, Gluten</span>
              </div>
            </div>
          </div>

          <div className="pd-action-section">
            <button className="pd-primary-btn" onClick={() => addToCart(product)}>
              <ShoppingCart size={18} /> Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
