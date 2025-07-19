import React from 'react';
import { Star, Eye, ShoppingBag, Zap } from 'lucide-react';

const ProductCard = ({ product, onViewDetail }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Badge giảm giá với hiệu ứng */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <Zap className="w-3 h-3 inline mr-1" />
          Giảm giá
        </div>
        
        {/* Overlay với nút xem chi tiết */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button 
            onClick={() => onViewDetail(product)}
            className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-50 flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Xem ngay
          </button>
        </div>
      </div>
      
      <div className="p-8 relative">
        {/* Decorative element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-80"></div>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-amber-600 transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Rating với hiệu ứng */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 transition-all duration-300 hover:scale-125 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-current text-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm font-medium">({product.reviews} đánh giá)</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-2 text-center leading-relaxed">
          {product.description}
        </p>
        
        {/* Giá với hiệu ứng gradient */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl py-4 px-6 mb-4">
            <span className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {product.price}
            </span>
            <span className="text-lg text-gray-500 line-through ml-3 opacity-75">
              {product.originalPrice}
            </span>
          </div>
        </div>
        
        {/* Nút CTA với hiệu ứng đặc biệt */}
        <button 
          onClick={() => onViewDetail(product)}
          className="w-full relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn"
        >
          {/* Hiệu ứng shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-transform duration-1000"></div>
          
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 mr-2 group-hover/btn:animate-bounce" />
            Xem chi tiết
          </div>
        </button>
        
        {/* Decorative dots */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-amber-300 rounded-full opacity-50"></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full opacity-30"></div>
          <div className="w-2 h-2 bg-amber-300 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;