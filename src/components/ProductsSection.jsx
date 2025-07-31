import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';
import { Package, Loader } from 'lucide-react';

const ProductsSection = ({ onViewDetail }) => {
  const { products, loading, error } = useProducts();

  return (
    <section id="products" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Sản Phẩm Của Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Khám phá bộ sưu tập sâm Hàn Quốc chính hãng, chất lượng cao được nhập khẩu trực tiếp
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{products.length}</div>
              <div className="text-sm text-gray-500">Sản phẩm</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">100%</div>
              <div className="text-sm text-gray-500">Chính hãng</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-sm text-gray-500">Hỗ trợ</div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 animate-spin text-orange-600 mb-4" />
            <p className="text-gray-600 text-lg">Đang tải sản phẩm...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Có lỗi xảy ra</div>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-orange-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Chưa có sản phẩm nào
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Hiện tại chưa có sản phẩm nào trong danh sách. Vui lòng quay lại sau!
            </p>
          </div>
        )}

        {/* Call to action */}
        {products.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🌟 Cần tư vấn sản phẩm?
              </h3>
              <p className="text-gray-600 mb-6">
                Liên hệ với chúng tôi để được tư vấn miễn phí và chọn sản phẩm phù hợp nhất
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://www.facebook.com/hau.us99" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  📱 Chat Facebook
                </a>
                <a 
                  href="tel:+84123456789" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  📞 Gọi ngay
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator for updates */}
        {loading && products.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-3 border border-orange-100">
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin text-orange-600" />
              <span className="text-sm text-gray-600">Đang cập nhật...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection; 