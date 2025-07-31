import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <HeroSection />
      <ProductsSection onViewDetail={setSelectedProduct} />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default HomePage;