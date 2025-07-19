import React from 'react';
import { Award, Shield, Leaf, Users, Heart, Star, Sparkles, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Award,
      title: "Chất lượng đỉnh cao",
      description: "Sản phẩm sâm được tuyển chọn từ những vùng trồng sâm nổi tiếng nhất Hàn Quốc và Việt Nam, đạt chuẩn chất lượng quốc tế",
      highlight: "Chứng nhận FDA & KFDA"
    },
    {
      icon: Shield,
      title: "Thương hiệu uy tín",
      description: "Hơn 15 năm kinh nghiệm phân phối, phục vụ hơn 50,000 khách hàng tin tưởng trên toàn quốc",
      highlight: "50,000+ khách hàng"
    },
    {
      icon: Leaf,
      title: "100% tự nhiên",
      description: "Cam kết không sử dụng chất bảo quản, hóa chất độc hại. Quy trình sản xuất theo tiêu chuẩn hữu cơ",
      highlight: "Organic certified"
    }
  ];

  const stats = [
    { number: "15+", label: "Năm kinh nghiệm", icon: TrendingUp },
    { number: "50K+", label: "Khách hàng tin tưởng", icon: Users },
    { number: "98%", label: "Khách hàng hài lòng", icon: Heart },
    { number: "4.8/5", label: "Đánh giá trung bình", icon: Star }
  ];

  return (
<section id="about" className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative background elements */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-6xl mx-auto">
          {/* Header section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
              Câu chuyện của chúng tôi
        </div>
        <h2 className="text-5xl font-black text-gray-800 mb-6 leading-tight">
              Về <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Sâm Premium</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Khởi nguồn từ tình yêu với các giá trị truyền thống và sức khỏe cộng đồng, 
            <strong className="text-amber-700"> Sâm Premium</strong> đã trở thành người bạn đồng hành 
                tin cậy của hàng nghìn gia đình Việt trong suốt hành trình chăm sóc sức khỏe.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
                Với cam kết <strong>"Chất lượng là danh dự"</strong>, chúng tôi tự hào mang đến những sản phẩm 
                sâm cao cấp được tuyển chọn kỹ lưỡng từ các vùng trồng sâm danh tiếng nhất thế giới.
          </p>
        </div>
      </div>

          {/* Stats section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
        <div key={index} className="text-center group">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-gray-800 mb-1">{stat.number}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        </div>
            ))}
      </div>

          {/* Features section */}
      <div className="grid md:grid-cols-3 gap-8">
  {features.map((feature, index) => (
        <div key={index} className="group h-full"> {/* Thêm h-full ở đây */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-amber-100/50 relative overflow-hidden h-full flex flex-col"> {/* Thêm h-full và flex flex-col */}
        
        {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex-1 flex flex-col"> {/* Thêm flex-1 và flex flex-col */}
          {/* Icon with enhanced styling */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
          
          {/* Content */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-amber-700 transition-colors duration-300">
            {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed flex-1"> {/* Thêm flex-1 để đoạn văn chiếm không gian còn lại */}
            {feature.description}
              </p>
          
          {/* Highlight badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
            {feature.highlight}
              </div>
            </div>
          </div>
        </div>
  ))}
      </div>

          {/* Call to action section */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Tại sao khách hàng tin tưởng chúng tôi?</h3>
          <p className="text-lg mb-6 opacity-90">
                "Không chỉ là sản phẩm, chúng tôi mang đến sự an tâm và niềm tin về chất lượng"
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Nguồn gốc rõ ràng</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Kiểm định chất lượng</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Bảo hành sản phẩm</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">✓ Hỗ trợ 24/7</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default AboutSection;  