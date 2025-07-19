import React from 'react';
import { Leaf, Star, MessageCircle } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  // URL Facebook của bạn - thay thế bằng link thực tế
  const FACEBOOK_PAGE_URL = 'https://www.facebook.com/hau.us99';
  
  const handleContactOrder = () => {
    // Mở trang Facebook trong tab mới
    window.open(FACEBOOK_PAGE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.reviews} đánh giá)</span>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-amber-600">{product.price}</span>
                <span className="text-lg text-gray-500 line-through ml-2">{product.originalPrice}</span>
              </div>
              
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Tác dụng chính:</h4>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Leaf className="w-4 h-4 text-green-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={handleContactOrder}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Liên hệ đặt hàng qua Facebook
              </button>
              
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">
                  📱 Nhắn tin trực tiếp để được tư vấn và đặt hàng nhanh chóng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;