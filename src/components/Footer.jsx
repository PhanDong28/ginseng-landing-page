import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="w-8 h-8 text-amber-600" />
            <h3 className="text-2xl font-bold">Sâm Premium</h3>
          </div>
          <p className="text-gray-400 mb-4">Chuyên cung cấp sâm chất lượng cao, uy tín hàng đầu Việt Nam</p>
          <div className="flex justify-center space-x-6">
            <span className="text-gray-400">© 2024 Sâm Premium. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;