// ProductList.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const products = [
  { name: 'Monstera', cost: '$12.99', image: '/images/monstera.jpg' },
  { name: 'Fiddle Leaf Fig', cost: '$18.50', image: '/images/fig.jpg' },
  { name: 'Snake Plant', cost: '$9.99', image: '/images/snake.jpg' },
  // ...weitere Produkte
];

function ProductList() {
  const dispatch = useDispatch();
  // KORREKT: Zugriff auf das Array
  const cartItems = useSelector(state => state.cart.items);

  // Prüft, ob das Produkt bereits im Warenkorb ist
  const isInCart = (productName) =>
    cartItems.some(item => item.name === productName);

  // Gesamtanzahl der Artikel im Warenkorb berechnen
  const calculateTotalQuantity = () =>
    cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  // Produkt zum Warenkorb hinzufügen
  const handleAddToCart = (product) => {
    if (!isInCart(product.name)) {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
  };

  return (
    <div>
      {/* Warenkorb-Icon mit Anzahl */}
      <div style={{ position: 'fixed', top: 20, right: 20, fontSize: 24 }}>
        🛒 <span>{calculateTotalQuantity()}</span>
      </div>

      <h2>Plant Shop</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.name} style={{ border: '1px solid #ddd', padding: 16, width: 200 }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>Preis: {product.cost}</p>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={isInCart(product.name)}
              style={{
                background: isInCart(product.name) ? '#ccc' : '#4CAF50',
                color: '#fff',
                cursor: isInCart(product.name) ? 'not-allowed' : 'pointer',
                padding: '8px 16px',
                border: 'none',
                borderRadius: 4
              }}
            >
              {isInCart(product.name) ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
