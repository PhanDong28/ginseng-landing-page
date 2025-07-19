import React, { useState, useEffect } from 'react';
import { Award, Shield, Leaf, Sparkles, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeParticle, setActiveParticle] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveParticle(prev => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden flex items-center">
      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60 animate-float ${
              activeParticle === i ? 'scale-150 opacity-80' : ''
            } transition-all duration-1000`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Premium background blobs with enhanced effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-orange-300 to-red-300 rounded-full mix-blend-multiply filter blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Premium badge */}
        <div className={`inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 px-6 py-2 rounded-full mb-8 backdrop-blur-sm shadow-lg transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Sparkles className="w-4 h-4 text-amber-600 mr-2 animate-pulse" />
          <span className="text-amber-800 font-medium text-sm tracking-wide uppercase">Sản phẩm cao cấp</span>
        </div>

        {/* Main heading with enhanced typography */}
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
            Sâm Cao Cấp
          </span>
          <br />
          <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent animate-gradient-x">
            Chính Hãng
          </span>
        </h1>
        
        {/* Enhanced subtitle */}
        <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Chuyên cung cấp <strong className="text-amber-700">sâm Hàn Quốc</strong>, <strong className="text-amber-700">sâm Ngọc Linh</strong> và các sản phẩm từ sâm cao cấp. 
          <br className="hidden md:block" />
          Cam kết chất lượng, nguồn gốc xuất xứ rõ ràng với <strong className="text-amber-700">20+ năm kinh nghiệm</strong>.
        </p>
        
        {/* Enhanced feature badges */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { icon: Award, text: "Chứng nhận chất lượng", color: "from-amber-500 to-orange-500" },
            { icon: Shield, text: "Bảo hành chính hãng", color: "from-blue-500 to-cyan-500" },
            { icon: Leaf, text: "100% thiên nhiên", color: "from-green-500 to-emerald-500" }
          ].map((item, index) => (
            <div 
              key={index} 
              className="group flex items-center bg-white/90 backdrop-blur-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-800 font-semibold text-lg">{item.text}</span>
            </div>
          ))}
        </div>
        
        {/* Enhanced CTA buttons */}
        <div className={`flex flex-col sm:flex-row justify-center gap-6 mb-16 transform transition-all duration-1000 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <a 
            href="#products" 
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white px-12 py-5 rounded-2xl font-bold text-xl overflow-hidden shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-700 via-orange-700 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center">
              Xem sản phẩm
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
            </span>
          </a>
          <a 
            href="#contact" 
            className="group inline-flex items-center justify-center bg-white/90 backdrop-blur-lg text-amber-700 border-2 border-amber-600 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 hover:text-white transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
          >
            Tư vấn miễn phí
            <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className={`animate-bounce transform transition-all duration-1000 delay-1100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <ChevronDown className="w-8 h-8 text-amber-600 mx-auto animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;