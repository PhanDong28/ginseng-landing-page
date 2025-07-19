import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, Star, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleSectionObserver = () => {
      const sections = ['products', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionObserver);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionObserver);
    };
  }, []);

  const navItems = [
    { href: '#products', text: 'Sản phẩm', icon: Sparkles },
    { href: '#about', text: 'Giới thiệu', icon: Star },
    { href: '#contact', text: 'Liên hệ', icon: Phone }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top info bar */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-medium">Hotline: 0901 234 567</span>
              </div>
              <div className="hidden sm:flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>8:00 - 18:00 (T2-T7)</span>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>123 Đường ABC, Quận 1, TP.HCM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-amber-100' 
          : 'bg-white shadow-lg'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
                <img 
                  src="./images/logo2.png" 
                  alt="Sâm Premium Logo" 
                  className={`relative z-10 transition-all duration-300 group-hover:scale-110 ${
                    isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                  }`} 
                />
              </div>
              <div>
                <h1 className={`font-black text-gray-800 transition-all duration-300 ${
                  isScrolled ? 'text-xl' : 'text-2xl'
                }`}>
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Sâm Hậu A
                  </span>
                </h1>
                <p className="text-xs text-gray-500 font-medium">Chất lượng cao cấp</p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className={`group flex items-center px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 relative overflow-hidden ${
                    activeSection === item.href.substring(1)
                      ? 'text-white bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 mr-2 transition-all duration-300 ${
                    activeSection === item.href.substring(1) ? 'text-white' : 'text-amber-600'
                  } group-hover:scale-110`} />
                  <span>{item.text}</span>
                  {activeSection === item.href.substring(1) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Enhanced CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection('#contact')}
                className="group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Tư vấn ngay
              </button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600 hover:from-amber-200 hover:to-orange-200 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-t border-amber-100">
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-3">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full flex items-center px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 text-left ${
                      activeSection === item.href.substring(1)
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-white hover:text-amber-600 hover:shadow-md'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${
                      activeSection === item.href.substring(1) ? 'text-white' : 'text-amber-600'
                    }`} />
                    <span>{item.text}</span>
                  </button>
                ))}
                
                {/* Mobile CTA */}
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-base hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mt-4"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Gọi ngay: 0901 234 567
                </button>
              </nav>
              
              {/* Mobile contact info */}
              <div className="mt-6 pt-6 border-t border-amber-200">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-amber-600" />
                    <span>Thứ 2 - Thứ 7: 8:00 - 18:00</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                    <span>123 Đường ABC, Quận 1, TP.HCM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;