import React from 'react';
import { useSelector } from 'react-redux';

const Header = ({ onNavigate, showCartButton = true, showHomeButton = true }) => {
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      background: '#4CAF50',
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <h1 style={{ margin: 0, fontSize: 24, letterSpacing: 1 }}>Paradise Nursery</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {showHomeButton && (
          <button
            style={{ background: '#fff', color: '#4CAF50', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
        )}
        {showCartButton && (
          <button
            style={{ background: '#fff', color: '#4CAF50', border: 'none', borderRadius: 4, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => onNavigate('cart')}
          >
            🛒
            <span style={{ fontWeight: 'bold' }}>{totalQuantity}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
