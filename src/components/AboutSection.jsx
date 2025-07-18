import React from 'react';
import { Award, Shield, Leaf } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Về Chúng Tôi</h2>
          <p className="text-lg text-gray-700 mb-8">
            Với hơn 15 năm kinh nghiệm trong lĩnh vực phân phối sâm cao cấp, chúng tôi cam kết mang đến 
            những sản phẩm sâm chất lượng nhất từ Hàn Quốc và Việt Nam. Tất cả sản phẩm đều được 
            kiểm định chất lượng nghiêm ngặt và có nguồn gốc xuất xứ rõ ràng.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chất lượng cao</h3>
              <p className="text-gray-600">Sản phẩm được tuyển chọn kỹ lưỡng, đảm bảo chất lượng tốt nhất</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uy tín</h3>
              <p className="text-gray-600">15 năm kinh nghiệm, được khách hàng tin tưởng và lựa chọn</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tự nhiên</h3>
              <p className="text-gray-600">100% tự nhiên, không chất bảo quản, an toàn cho sức khỏe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;