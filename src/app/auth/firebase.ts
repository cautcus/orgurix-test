import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCER_fGnJVkjDJpebq2hvSMJWYGPwvHIWU",
  authDomain: "orgurix-in.firebaseapp.com",
  projectId: "orgurix-in",
  storageBucket: "orgurix-in.appspot.com",
  messagingSenderId: "283211177074",
  appId: "1:283211177074:web:f8f787ce54e8e5741b36eb",
  measurementId: "G-MS6L7Y7XM7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const db = getFirestore(app);


export {
  auth,
  db,
  firestore,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
};

