import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, X, Download, ArrowLeft, Loader, Home } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const ProductManagement = () => {
  const navigate = useNavigate();
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    features: '',
    rating: 5,
    reviews: 0
  });

  const handleGoBack = () => {
    navigate('/');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      features: '',
      rating: 5,
      reviews: 0
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
    setFormLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.image || !formData.description || !formData.features) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    setFormLoading(true);
    
    try {
      const productData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews)
      };

      if (isEditing) {
        await updateProduct(editingId, productData);
        alert('Cập nhật sản phẩm thành công!');
      } else {
        await addProduct(productData);
        alert('Thêm sản phẩm thành công!');
      }
      
      resetForm();
    } catch (error) {
      alert(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      features: Array.isArray(product.features) ? product.features.join(', ') : product.features,
      rating: product.rating,
      reviews: product.reviews
    });
    setIsEditing(true);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        alert('Xóa sản phẩm thành công!');
      } catch (error) {
        alert(`Có lỗi khi xóa sản phẩm: ${error.message}`);
      }
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([`export const products = ${dataStr};`], { type: 'text/javascript' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products-firebase-backup.js';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Đang tải dữ liệu sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors flex items-center gap-2"
                title="Quay lại trang chính"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Trang chủ</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">🛠️ Quản Lý Sản Phẩm</h1>
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">Tổng số sản phẩm: <span className="font-semibold text-blue-600">{products.length}</span></p>
                  {loading && (
                    <div className="flex items-center text-blue-600">
                      <Loader className="w-4 h-4 animate-spin mr-1" />
                      <span className="text-sm">Đang đồng bộ...</span>
                    </div>
                  )}
                </div>
                {error && (
                  <p className="text-red-600 text-sm mt-1">⚠️ {error}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(true)}
                disabled={formLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Thêm Sản Phẩm</span>
              </button>
              <button
                onClick={exportData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Xuất Dữ Liệu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isEditing ? '✏️ Chỉnh Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}
                  </h2>
                  <button
                    onClick={resetForm}
                    disabled={formLoading}
                    className="text-gray-500 hover:text-gray-700 disabled:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={formLoading}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Nhập tên sản phẩm..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá *
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      disabled={formLoading}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="VD: 1.200.000đ hoặc Liên hệ"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Đường dẫn hình ảnh *
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      disabled={formLoading}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={formLoading}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Mô tả chi tiết về sản phẩm..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tính năng * (phân cách bằng dấu phẩy)
                    </label>
                    <textarea
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      disabled={formLoading}
                      rows="2"
                      placeholder="Tăng cường miễn dịch, Chống lão hóa, Tăng cường trí nhớ"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Đánh giá (1-5 sao)
                      </label>
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        disabled={formLoading}
                        min="1"
                        max="5"
                        step="0.1"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số lượng đánh giá
                      </label>
                      <input
                        type="number"
                        name="reviews"
                        value={formData.reviews}
                        onChange={handleInputChange}
                        disabled={formLoading}
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={formLoading}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      {formLoading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save size={20} />
                      )}
                      {formLoading 
                        ? 'Đang xử lý...' 
                        : (isEditing ? 'Cập Nhật' : 'Thêm Mới')
                      }
                    </button>
                    <button
                      onClick={resetForm}
                      disabled={formLoading}
                      className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Hình ảnh</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Tên sản phẩm</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Giá</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Đánh giá</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {product.id.length > 8 ? `${product.id.substring(0, 8)}...` : product.id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{product.description}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-800 font-medium">{product.price}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium text-yellow-600">{product.rating}</span>
                        <span className="text-gray-500">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          disabled={loading}
                          className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-800 disabled:text-gray-400 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg">Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Hướng dẫn sử dụng:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600">
            <ul className="space-y-2">
              <li>• <strong>Thêm sản phẩm:</strong> Click nút "Thêm Sản Phẩm" để mở form nhập liệu</li>
              <li>• <strong>Chỉnh sửa:</strong> Click biểu tượng bút chì để chỉnh sửa thông tin sản phẩm</li>
              <li>• <strong>Xóa sản phẩm:</strong> Click biểu tượng thùng rác để xóa sản phẩm</li>
              <li>• <strong>Xuất dữ liệu:</strong> Click "Xuất Dữ Liệu" để tải file backup từ Firebase</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>Tính năng:</strong> Nhập các tính năng phân cách bằng dấu phẩy</li>
              <li>• <strong>Đồng bộ:</strong> Dữ liệu được lưu trữ trên Firebase và đồng bộ real-time</li>
              <li>• <strong>Offline:</strong> Nếu mất kết nối, app sẽ fallback về dữ liệu mặc định</li>
              <li>• <strong>Bảo mật:</strong> Chỉ admin mới có thể truy cập trang này</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;