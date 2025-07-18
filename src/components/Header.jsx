import React from 'react';
// import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="./images/logo2.png" alt="Logo" className="w-12 h-12" />
            {/* <Leaf className="w-8 h-8 text-amber-600" /> */}
            <h1 className="text-2xl font-bold text-gray-800">Sâm Premium</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#products" className="text-gray-700 hover:text-amber-600 transition-colors">Sản phẩm</a>
            <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors">Giới thiệu</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">Liên hệ</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;