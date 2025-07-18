import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onViewDetail }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Giảm giá
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-sm">({product.reviews})</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
        
        <div className="mb-4">
          <span className="text-2xl font-bold text-amber-600">{product.price}</span>
          <span className="text-lg text-gray-500 line-through ml-2">{product.originalPrice}</span>
        </div>
        
        <button 
          onClick={() => onViewDetail(product)}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductCard;