// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz1p8uzxlYJN02-G0TahlknOeNrmITG8Q",
  authDomain: "chirayu-sih.firebaseapp.com",
  projectId: "chirayu-sih",
  storageBucket: "chirayu-sih.firebasestorage.app",
  messagingSenderId: "97905000095",
  appId: "1:97905000095:web:967cd2cab932d32ba22caa",
  measurementId: "G-5FP2XNSME3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function signinAnon() {
  try {
    await signInAnonymously(auth);
    return auth.currentUser;
  } catch (err) {
    console.error("Anon signin error:", err);
    throw err;
  }
}
