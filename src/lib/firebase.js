
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: "fir-chat-f91f9.firebaseapp.com",

  projectId: "fir-chat-f91f9",

  storageBucket: "fir-chat-f91f9.firebasestorage.app",

  messagingSenderId: "1028626986490",

  appId: "1:1028626986490:web:73b415039d404762bd2043"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();