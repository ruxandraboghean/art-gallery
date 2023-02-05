import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "art-gallery-da0fa.firebaseapp.com",
  projectId: "art-gallery-da0fa",
  storageBucket: "art-gallery-da0fa.appspot.com",
  messagingSenderId: "775443678838",
  appId: "1:775443678838:web:0e1a924e50727a71f98157",
  measurementId: "G-PPC4XL4BRC",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
