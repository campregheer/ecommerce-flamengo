import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC0pEwyoEm80m7-MZUmblCOPHuFLX2bKI0",
  authDomain: "ecommerce-b4960.firebaseapp.com",
  projectId: "ecommerce-b4960",
  storageBucket: "ecommerce-b4960.firebasestorage.app",
  messagingSenderId: "864399788552",
  appId: "1:864399788552:web:c90360167696869c999fbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();