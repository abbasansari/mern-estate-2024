// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "mern-estate-c2071.firebaseapp.com",
  projectId: "mern-estate-c2071",
  storageBucket: "mern-estate-c2071.appspot.com",
  messagingSenderId: "604635917868",
  appId: "1:604635917868:web:82e599bca793a2f0c42b89",
  measurementId: "G-8ELDM222GY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
