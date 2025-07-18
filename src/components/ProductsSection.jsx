import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductsSection = ({ onViewDetail }) => {
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Sản Phẩm Của Chúng Tôi</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;