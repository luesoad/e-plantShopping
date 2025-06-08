import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import Header from './Header';
import './App.css';

function App() {
  const [page, setPage] = useState('landing');

  const handleNavigate = (target) => {
    if (target === 'home') setPage('products');
    if (target === 'cart') setPage('cart');
    if (target === 'landing') setPage('landing');
  };

  const handleGetStartedClick = () => setPage('products');
  const handleContinueShopping = () => setPage('products');

  return (
    <div className="app-container">
      {page !== 'landing' && (
        <Header
          onNavigate={handleNavigate}
          showCartButton={page !== 'cart'}
        />
      )}
      {page === 'landing' && (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      )}
      {page === 'products' && (
        <div className="product-list-container visible">
          <ProductList />
        </div>
      )}
      {page === 'cart' && (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default App;
