import React from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onViewDetail }) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 border border-orange-100/50 backdrop-blur-sm">
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-300/15 to-transparent rounded-tr-full"></div>
      
      {/* Image Container với overlay gradient */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-1000"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
          }}
        />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 via-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-300/60 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-orange-400/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-orange-200/50 rounded-full animate-bounce"></div>
        </div>
        
        {/* Quick view button với hiệu ứng đẹp hơn */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-8 group-hover:translate-x-0">
          <button
            onClick={() => onViewDetail(product)}
            className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl hover:bg-orange-50 hover:shadow-orange-200/50 hover:scale-110 transition-all duration-300 border border-orange-100/30"
            title="Xem nhanh"
          >
            <Eye className="w-6 h-6 text-orange-600" />
          </button>
        </div>

        {/* Rating badge với hiệu ứng đẹp */}
        <div className="absolute top-6 left-6">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-2xl shadow-orange-500/30 border border-orange-400/30">
            <Star className="w-4 h-4 fill-current animate-pulse" />
            {product.rating}
          </div>
        </div>
      </div>

      {/* Content với padding và spacing đẹp hơn */}
      <div className="relative p-8 space-y-5 bg-gradient-to-b from-white to-orange-50/30">
        {/* Product name với typography đẹp */}
        <h3 className="text-2xl font-black text-gray-800 leading-tight group-hover:text-orange-600 transition-colors duration-300 tracking-tight">
          {product.name}
        </h3>
        
        {/* Rating and reviews với layout cải thiện */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 transition-all duration-200 hover:scale-110 ${i < Math.floor(product.rating) ? 'fill-current text-orange-500' : 'stroke-current fill-transparent text-orange-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium ml-2">({product.reviews} đánh giá)</span>
          </div>
          
          {/* Price với typography nổi bật */}
          <div className="text-right">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 drop-shadow-sm">
              {product.price}
            </span>
          </div>
        </div>

        {/* Description với styling đẹp */}
        <p className="text-gray-600 text-base leading-relaxed line-clamp-3 font-medium">
          {product.description}
        </p>

        {/* Features với design cải thiện */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Tác dụng chính:</h4>
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-2 rounded-2xl text-sm font-semibold border border-orange-200/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 px-4 py-2 rounded-2xl text-sm font-semibold border border-gray-200/50 shadow-sm">
                  +{product.features.length - 2} khác
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action buttons với design cao cấp */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={() => onViewDetail(product)}
            className="flex-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-4 px-8 rounded-2xl font-bold hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/25 border border-orange-400/30"
          >
            <Eye className="w-5 h-5" />
            Xem chi tiết
          </button>
          
          <button
            onClick={() => onViewDetail(product)}
            className="bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 text-white p-4 rounded-2xl hover:from-orange-700 hover:via-orange-800 hover:to-orange-900 transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-2xl shadow-orange-600/30 border border-orange-500/30"
            title="Đặt hàng ngay"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Animated bottom border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 via-orange-500 via-orange-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;