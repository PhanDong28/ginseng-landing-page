// src/firebase/firebaseService.js
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  orderBy,
  query 
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'products';

// Lấy tất cả sản phẩm
export const getAllProducts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    throw error;
  }
};

// Thêm sản phẩm mới
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    throw error;
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    throw error;
  }
};

// Xóa sản phẩm
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, productId));
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    throw error;
  }
};

// Lắng nghe thay đổi real-time (optional)
export const subscribeToProducts = (callback) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(products);
  }, (error) => {
    console.error('Lỗi khi lắng nghe thay đổi:', error);
  });
};