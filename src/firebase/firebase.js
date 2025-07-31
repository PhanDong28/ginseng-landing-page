// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Thay thế config này bằng config từ Firebase Console của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDAdDuoPq8dh7WgTZX9nVjZBxYWcnB8a6Y",
  authDomain: "ginseng-landing-page.firebaseapp.com",
  projectId: "ginseng-landing-page",
  storageBucket: "ginseng-landing-page.firebasestorage.app",
  messagingSenderId: "799598206703",
  appId: "1:799598206703:web:54b27cef5eab2f13ab451a",
  measurementId: "G-NR34D0NVGE"
};

// QUAN TRỌNG: Thay thế config trên bằng config thực từ Firebase Console
// Để lấy config:
// 1. Vào Firebase Console: https://console.firebase.google.com/
// 2. Chọn project của bạn
// 3. Vào Project Settings (biểu tượng bánh răng)
// 4. Scroll xuống phần "Your apps" và chọn web app
// 5. Copy config object

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore và export
export const db = getFirestore(app);

// Export default app
export default app;