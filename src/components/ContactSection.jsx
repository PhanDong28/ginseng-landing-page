import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Clock, Star, MessageCircle, Zap, X } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVQ5hsUsZOUWMrRTF3oGvVTnzOWlXngyym2g0AKAgDyMXNF7mKaAqAtG8_XDbj7ac34Q/exec';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitStatus === 'error') {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('Vui lòng nhập họ tên');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!formData.message.trim()) {
      alert('Vui lòng nhập tin nhắn');
      return false;
    }
    
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      alert('Số điện thoại không hợp lệ');
      return false;
    }
    
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        alert('Email không hợp lệ');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Sending to:', GOOGLE_SCRIPT_URL);
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          timestamp: new Date().toLocaleString('vi-VN')
        })
      });

      console.log('Response received');
      setSubmitStatus('success');
      setShowSuccessPopup(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Hotline 24/7",
      value: "0968 127 968",
      subtitle: "Tư vấn miễn phí",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      href: "tel:0968127968"
    },
    {
      icon: Mail,
      title: "Email hỗ trợ",
      value: "haunv@sampremium.com",
      subtitle: "Phản hồi trong 2h",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      href: "mailto:haunv@sampremium.com"
    },
    {
      icon: MapPin,
      title: "Văn phòng chính",
      value: "33 Đường Hải Hồ, Quận Hải Châu, TP. Đà Nẵng",
      subtitle: "Ghé thăm trực tiếp - Gặp a Hậu",
      color: "from-red-500 to-orange-500",
      bgColor: "from-red-50 to-orange-50",
      href: "https://www.google.com/maps/place/33+%C4%90.+H%E1%BA%A3i+H%E1%BB%93,+Thanh+B%C3%ACnh,+H%E1%BA%A3i+Ch%C3%A2u,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vietnam/@16.0704771,108.2170004,15z/data=!4m6!3m5!1s0x31421838881c0a51:0x4e05520b362b7f5c!8m2!3d16.0787744!4d108.2147924!16s%2Fg%2F11fsjj09dy?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
    }
  ];

  const features = [
    { icon: Zap, text: "Phản hồi nhanh trong 15 phút", color: "text-yellow-600" },
    { icon: Star, text: "Tư vấn từ chuyên gia 20+ năm kinh nghiệm", color: "text-purple-600" },
    { icon: MessageCircle, text: "Hỗ trợ 24/7 kể cả ngày lễ", color: "text-blue-600" }
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-yellow-300 to-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-500 animate-[slideUp_0.5s_ease-out]">
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Gửi thành công!</h3>
              <p className="text-gray-600 mb-6">
                Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                <br />
                <span className="font-medium text-green-600">Mã số: #{Math.floor(Math.random() * 10000)}</span>
              </p>
              
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">15 phút</div>
                    <div className="text-sm text-green-600">Phản hồi nhanh</div>
                  </div>
                  <div className="h-10 w-px bg-green-200"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">0901 234 567</div>
                    <div className="text-sm text-green-600">Hotline hỗ trợ</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
              >
                Đóng thông báo
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 px-6 py-2 rounded-full mb-6 backdrop-blur-sm shadow-lg">
              <MessageCircle className="w-5 h-5 text-amber-600 mr-2 animate-pulse" />
              <span className="text-amber-800 font-medium text-sm tracking-wide uppercase">Liên hệ ngay</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
              Tư Vấn <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Miễn Phí</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Đội ngũ chuyên gia với hơn 20 năm kinh nghiệm sẵn sàng tư vấn sản phẩm sâm phù hợp nhất cho bạn
            </p>
          </div>

          {/* Features highlight */}
          <div className={`flex flex-wrap justify-center gap-6 mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <feature.icon className={`w-5 h-5 ${feature.color} mr-3`} />
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info cards */}
            <div className={`lg:col-span-1 space-y-6 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {contactInfo.map((info, index) => (
                <a 
                  key={index} 
                  href={info.href}
                  className={`group block bg-gradient-to-r ${info.bgColor} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 backdrop-blur-sm cursor-pointer`}
                >
                  <div className="flex items-start">
                    <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{info.title}</h3>
                      <p className="text-lg font-semibold text-gray-700 mb-1">{info.value}</p>
                      <p className="text-sm text-gray-600">{info.subtitle}</p>
                    </div>
                  </div>
                </a>
              ))}
              
              {/* Working hours */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-3xl shadow-xl border border-white/50 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Giờ làm việc</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Thứ 2 - Thứ 7:</span>
                    <span className="text-gray-800 font-semibold">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Chủ nhật:</span>
                    <span className="text-gray-800 font-semibold">9:00 - 17:00</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-green-800 font-medium text-sm">🟢 Hotline 24/7 - Luôn sẵn sàng hỗ trợ</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className={`lg:col-span-2 transform transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">Gửi tin nhắn</h3>
                    <p className="text-gray-600 mt-1">Chúng tôi sẽ phản hồi trong vòng 15 phút</p>
                  </div>
                </div>
                
                {submitStatus && (
                  <div className={`mb-8 p-6 rounded-2xl flex items-center shadow-lg transition-all duration-500 ${
                    submitStatus === 'success' 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                      : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'
                  }`}>
                    {submitStatus === 'success' ? (
                      <>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-green-800 font-semibold">Gửi tin nhắn thành công!</p>
                          <p className="text-green-700 text-sm">Chúng tôi sẽ liên hệ với bạn trong 15 phút tới.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-red-800 font-semibold">Có lỗi xảy ra</p>
                          <p className="text-red-700 text-sm">Vui lòng thử lại hoặc gọi hotline: 0901 234 567</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-gray-700 font-semibold mb-3 text-lg">
                        Họ tên <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-lg ${
                            focusedField === 'name' 
                              ? 'border-amber-500 shadow-lg transform scale-105' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Nhập họ tên của bạn"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label className="block text-gray-700 font-semibold mb-3 text-lg">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-lg ${
                            focusedField === 'phone' 
                              ? 'border-amber-500 shadow-lg transform scale-105' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Nhập số điện thoại"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-lg ${
                          focusedField === 'email' 
                            ? 'border-amber-500 shadow-lg transform scale-105' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Nhập email của bạn (không bắt buộc)"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-gray-700 font-semibold mb-3 text-lg">
                      Tin nhắn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea 
                        rows="6" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Hãy cho chúng tôi biết nhu cầu của bạn: loại sâm quan tâm, mục đích sử dụng, ngân sách..."
                        className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-lg resize-none ${
                          focusedField === 'message' 
                            ? 'border-amber-500 shadow-lg transform scale-105' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white py-5 px-8 rounded-xl font-bold text-xl hover:from-amber-700 hover:via-orange-700 hover:to-amber-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-1 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Gửi tin nhắn ngay</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Trust indicators */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">15 phút</div>
                      <div className="text-sm text-blue-700">Thời gian phản hồi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24/7</div>
                      <div className="text-sm text-blue-700">Hỗ trợ khách hàng</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">20+</div>
                      <div className="text-sm text-blue-700">Năm kinh nghiệm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;