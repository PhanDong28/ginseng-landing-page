// src/context/ProductContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAllProducts, 
  addProduct as addProductToFirebase, 
  updateProduct as updateProductInFirebase, 
  deleteProduct as deleteProductFromFirebase,
  subscribeToProducts 
} from '../firebase/firebaseService';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load dữ liệu từ Firebase khi component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Lắng nghe thay đổi real-time (optional)
  useEffect(() => {
    const unsubscribe = subscribeToProducts((updatedProducts) => {
      setProducts(updatedProducts);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Load tất cả sản phẩm
  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getAllProducts();
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu sản phẩm');
      console.error('Lỗi khi load sản phẩm:', err);
      // Fallback về dữ liệu mặc định nếu có lỗi
      setProducts(getDefaultProducts());
    } finally {
      setLoading(false);
    }
  };

  // Thêm sản phẩm
  const addProduct = async (productData) => {
    try {
      setLoading(true);
      await addProductToFirebase(productData);
      setError(null);
      // Dữ liệu sẽ được cập nhật tự động qua subscription
    } catch (err) {
      setError('Không thể thêm sản phẩm');
      console.error('Lỗi khi thêm sản phẩm:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sửa sản phẩm
  const updateProduct = async (id, updatedProduct) => {
    try {
      setLoading(true);
      await updateProductInFirebase(id, updatedProduct);
      setError(null);
      // Dữ liệu sẽ được cập nhật tự động qua subscription
    } catch (err) {
      setError('Không thể cập nhật sản phẩm');
      console.error('Lỗi khi cập nhật sản phẩm:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductFromFirebase(id);
      setError(null);
      // Dữ liệu sẽ được cập nhật tự động qua subscription
    } catch (err) {
      setError('Không thể xóa sản phẩm');
      console.error('Lỗi khi xóa sản phẩm:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Dữ liệu mặc định fallback
  const getDefaultProducts = () => [
    {
      id: 'default-1',
      name: "Sâm Hàn Quốc 6 năm tuổi",
      price: "Liên hệ để được tư vấn",
      image: "./images/pro1.jpg",
      description: "Sâm Hàn Quốc chính hãng, 6 năm tuổi, chất lượng cao.",
      features: ["Tăng cường miễn dịch", "Chống lão hóa"],
      rating: 5,
      reviews: 128,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    loadProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};