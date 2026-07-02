import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';
import { useTranslation } from 'react-i18next';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { t } = useTranslation();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2><ShoppingBag size={20} /> Your Cart ({cartItems.length})</h2>
          <button onClick={() => setIsCartOpen(false)}><X size={20} /></button>
        </div>
        
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt="product" />
                <div className="cart-item-info">
                  <h4>{item.nameKey ? t(item.nameKey) : item.name}</h4>
                  <div className="cart-item-price">{item.price}</div>
                  <div className="cart-qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
