// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-451c8.firebaseapp.com",
  projectId: "mern-blog-451c8",
  storageBucket: "mern-blog-451c8.appspot.com",
  messagingSenderId: "117110858786",
  appId: "1:117110858786:web:0fa3d10c02d13c5828967b",
  measurementId: "G-0MY2MNV85K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 