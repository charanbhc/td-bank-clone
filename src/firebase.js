// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  runTransaction,
  onSnapshot // ✅ Add this for real-time updates
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIbiiQaF0Utwroagk_mrc8oXRaEARflp8",
  authDomain: "tdbank-e8711.firebaseapp.com",
  projectId: "tdbank-e8711",
  storageBucket: "tdbank-e8711.appspot.com",
  messagingSenderId: "751032373687",
  appId: "1:751032373687:web:d8f2746b8acda673f11832",
  measurementId: "G-PZG95CZJKW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  runTransaction,
  onSnapshot // ✅ Export it
};
