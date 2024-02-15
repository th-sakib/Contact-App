// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBX6Z-2PXZOndu2tOiaQRt0u-snZjv8CQ",
  authDomain: "contact-app-ed1b7.firebaseapp.com",
  projectId: "contact-app-ed1b7",
  storageBucket: "contact-app-ed1b7.appspot.com",
  messagingSenderId: "415582968155",
  appId: "1:415582968155:web:4c68a0be5953bcb2dca27e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);