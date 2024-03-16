// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5ZtwQYE1OAmjyvQre66QjvSx-aoqxTKQ",
  authDomain: "netflixgpt-3c36a.firebaseapp.com",
  projectId: "netflixgpt-3c36a",
  storageBucket: "netflixgpt-3c36a.appspot.com",
  messagingSenderId: "111006719658",
  appId: "1:111006719658:web:c873a3a8757a63632b7ad3",
  measurementId: "G-HLHSKNMTZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();