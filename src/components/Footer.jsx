import React from 'react';
import { Leaf, Phone, Mail, MapPin, Facebook, MessageSquare, Mail as MailIcon } from 'lucide-react';

const Footer = () => {
  return (
<footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-10 left-10 w-32 h-32 border border-amber-600 rounded-full"></div>
    <div className="absolute bottom-20 right-20 w-20 h-20 border border-amber-600 rounded-full"></div>
    <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-amber-600 rounded-full"></div>
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
      <div className="md:col-span-2">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-amber-600 p-3 rounded-full shadow-lg">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Sâm Hậu A
          </h3>
        </div>
        <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Chuyên cung cấp sâm chất lượng cao, được chọn lọc kỹ càng từ những vùng đất trồng sâm nổi tiếng. 
              Uy tín hàng đầu Việt Nam với hơn 15 năm kinh nghiệm.
        </p>
        <div className="flex space-x-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl" aria-label="Facebook">
            <Facebook className="w-5 h-5 text-white" />
          </a>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl" aria-label="Zalo">
            <MessageSquare className="w-5 h-5 text-white" />
          </a>
          <a href="mailto:info@example.com" className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl" aria-label="Email">
            <MailIcon className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

          {/* Quick Links */}
      <div>
        <h4 className="text-xl font-semibold mb-6 text-amber-400">Liên kết nhanh</h4>
        <ul className="space-y-3">
              {['Trang chủ', 'Sản phẩm', 'Về chúng tôi', 'Tin tức', 'Liên hệ'].map((item) => (
          <li key={item}>
<a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {item}
          </a>
        </li>
              ))}
      </ul>
    </div>

          {/* Contact Info */}
    <div>
      <h4 className="text-xl font-semibold mb-6 text-amber-400">Liên hệ</h4>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-600/20 p-2 rounded-lg">
            <Phone className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-gray-300">0968 127 968</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-amber-600/20 p-2 rounded-lg">
            <Mail className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-gray-300">haunv@sampremium.vn</span>
        </div>
        <div className="flex items-start space-x-3">
          <div className="bg-amber-600/20 p-2 rounded-lg mt-1">
            <MapPin className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-gray-300">33 Đường Hải Hồ, Quận Hải Châu, TP. Đà Nẵng</span>
        </div>
      </div>
    </div>
  </div>

        {/* Divider */}
  <div className="border-t border-gray-700 pt-8">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Sâm Hậu A. Tất cả quyền được bảo lưu.
      </p>
      <div className="flex space-x-6 text-sm">
        <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                Chính sách bảo mật
        </a>
        <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                Điều khoản sử dụng
        </a>
        <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                Hỗ trợ khách hàng
        </a>
      </div>
    </div>
  </div>
</div>
</footer>
  );
};

export default Footer;