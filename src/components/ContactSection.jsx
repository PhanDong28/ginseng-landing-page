import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Liên Hệ Với Chúng Tôi</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">Hotline</p>
                    <p className="text-gray-600">0901 234 567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">info@sampremium.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-amber-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">Địa chỉ</p>
                    <p className="text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-gray-700 mb-4">Giờ làm việc:</p>
                <p className="text-gray-600">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
                <p className="text-gray-600">Chủ nhật: 9:00 - 17:00</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Họ tên *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Số điện thoại *</label>
                  <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tin nhắn *</label>
                  <textarea rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
                </div>
                
                <button onClick={() => alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.')} className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300">
                  Gửi tin nhắn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;