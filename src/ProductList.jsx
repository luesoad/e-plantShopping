// ProductList.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

// Pflanzen mit Kategorie und freien Bildern (unsplash)
const products = [
  {
    name: 'Monstera',
    cost: '$12.99',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'Blattpflanzen'
  },
  {
    name: 'Fiddle Leaf Fig',
    cost: '$18.50',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'Blattpflanzen'
  },
  {
    name: 'Snake Plant',
    cost: '$9.99',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'Sukkulenten'
  },
  {
    name: 'Aloe Vera',
    cost: '$11.99',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    category: 'Sukkulenten'
  },
  {
    name: 'Peace Lily',
    cost: '$14.99',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80',
    category: 'Blühpflanzen'
  },
  {
    name: 'Orchid',
    cost: '$21.50',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    category: 'Blühpflanzen'
  }
];

// Kategorien extrahieren
const categories = [...new Set(products.map(p => p.category))];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (productName) =>
    cartItems.some(item => item.name === productName);

  const calculateTotalQuantity = () =>
    cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

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
      {/* Gruppierte Darstellung */}
      {categories.map(category => (
        <div key={category} style={{ marginBottom: 32 }}>
          <h3 style={{ borderBottom: '2px solid #4CAF50', color: '#4CAF50' }}>{category}</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {products
              .filter(product => product.category === category)
              .map(product => (
                <div key={product.name} style={{ border: '1px solid #ddd', padding: 16, width: 200, background: '#fff' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                  <h4>{product.name}</h4>
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
      ))}
    </div>
  );
}

export default ProductList;
