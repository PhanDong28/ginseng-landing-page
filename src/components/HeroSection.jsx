import React from 'react';
import { Award, Shield, Leaf } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-28 bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-20 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-20 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Sâm Cao Cấp <span className="text-amber-600">Chính Hãng</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          Chuyên cung cấp sâm Hàn Quốc, sâm Ngọc Linh và các sản phẩm từ sâm cao cấp. 
          Cam kết chất lượng, nguồn gốc xuất xứ rõ ràng.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { icon: Award, text: "Chứng nhận chất lượng" },
            { icon: Shield, text: "Bảo hành chính hãng" },
            { icon: Leaf, text: "100% thiên nhiên" }
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <item.icon className="w-6 h-6 text-amber-600 mr-2" />
              <span className="text-gray-800 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#products" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Xem sản phẩm
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center bg-white text-amber-700 border-2 border-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Tư vấn miễn phí
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;