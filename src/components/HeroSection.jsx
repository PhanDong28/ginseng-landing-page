import React from 'react';
import { Award, Shield, Leaf } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Sâm Chất Lượng Cao</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Chuyên cung cấp sâm Hàn Quốc, sâm Ngọc Linh và các sản phẩm từ sâm cao cấp. 
          Cam kết chất lượng, nguồn gốc rõ ràng, giá cả hợp lý.
        </p>
        <div className="flex justify-center space-x-8 mb-12">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-amber-600 mr-2" />
            <span className="text-gray-700">Chất lượng đảm bảo</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-amber-600 mr-2" />
            <span className="text-gray-700">Nguồn gốc rõ ràng</span>
          </div>
          <div className="flex items-center">
            <Leaf className="w-6 h-6 text-amber-600 mr-2" />
            <span className="text-gray-700">100% tự nhiên</span>
          </div>
        </div>
        <a href="#products" className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg">
          Xem sản phẩm ngay
        </a>
      </div>
    </section>
  );
};

export default HeroSection;