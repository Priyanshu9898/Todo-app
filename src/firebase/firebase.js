// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnM7v5oJFTEQ4Ty_qI1IUBxXqZk8onqP8",
  authDomain: "todop-app-488c3.firebaseapp.com",
  projectId: "todop-app-488c3",
  storageBucket: "todop-app-488c3.appspot.com",
  messagingSenderId: "418301332952",
  appId: "1:418301332952:web:b44135f8b509c56301f6ad",
  measurementId: "G-G6WDQSPE64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

 