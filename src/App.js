import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import HomePage from './pages/HomePage';
import ProductManagement from './components/ProductManagement';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<ProductManagement />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;