// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-rental-c61c4.firebaseapp.com",
  projectId: "mern-rental-c61c4",
  storageBucket: "mern-rental-c61c4.firebasestorage.app",
  messagingSenderId: "316507217009",
  appId: "1:316507217009:web:9c8e4c1f35ffe456284fd0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);