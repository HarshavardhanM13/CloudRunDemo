import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // In production, this will use the gateway URL
      const apiUrl = process.env.REACT_APP_API_URL || '/api/products';
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productName) => {
    alert(`Added ${productName} to cart!`);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🛒 Ecommerce Store</h1>
        <p>React + FastAPI Demo</p>
      </header>

      <main style={styles.main}>
        {loading && <p style={styles.message}>Loading products...</p>}
        
        {error && (
          <div style={styles.error}>
            <p>Error: {error}</p>
            <button onClick={loadProducts} style={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div style={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productDescription}>{product.description}</p>
                <div style={styles.price}>${product.price}</div>
                <p style={styles.stock}>Stock: {product.stock}</p>
                <button
                  onClick={() => handleAddToCart(product.name)}
                  style={styles.button}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  header: {
    background: '#2c3e50',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
  main: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '0 20px',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    color: '#e74c3c',
  },
  retryButton: {
    marginTop: '10px',
    padding: '10px 20px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  productCard: {
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  productName: {
    color: '#2c3e50',
    marginBottom: '10px',
  },
  productDescription: {
    color: '#7f8c8d',
    marginBottom: '10px',
  },
  price: {
    fontSize: '24px',
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  stock: {
    color: '#95a5a6',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    fontSize: '16px',
  },
};

export default App;