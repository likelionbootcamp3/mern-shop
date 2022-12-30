// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdbTT4jt8OMMMyCSrkHQbT0fBOk9IiKWQ",
  authDomain: "mern-shop-c16fc.firebaseapp.com",
  projectId: "mern-shop-c16fc",
  storageBucket: "mern-shop-c16fc.appspot.com",
  messagingSenderId: "618828651726",
  appId: "1:618828651726:web:792134c5e26bc2a362049f",
  measurementId: "G-NV0Q2ZBG5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
