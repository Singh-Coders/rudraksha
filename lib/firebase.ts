// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9Hivu5Ivk0Mejxlp82O7UzYXVI6MSNQ4",
  authDomain: "vibeflow-bc788.firebaseapp.com",
  projectId: "vibeflow-bc788",
  storageBucket: "vibeflow-bc788.firebasestorage.app",
  messagingSenderId: "764593296690",
  appId: "1:764593296690:web:50d8657fa9668b4c1a732b",
  measurementId: "G-T6PZW3QDGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);

export { app, analytics, auth }; 