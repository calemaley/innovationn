// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj7KYDvdjp_RQfD4XbHpU4mGb83AieoKA",
  authDomain: "innovationz-e6410.firebaseapp.com",
  projectId: "innovationz-e6410",
  storageBucket: "innovationz-e6410.firebasestorage.app",
  messagingSenderId: "36627457154",
  appId: "1:36627457154:web:ec8aee41082c362b2b809b",
  measurementId: "G-PP49KP5J5Q"
};

// Initialize Firebase to be SSR-friendly
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, app, analytics };
