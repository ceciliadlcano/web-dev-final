// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0_6iPWBpqwkV7SUOcB2A9UXi1TtagNF0",
  authDomain: "final-proj-bc237.firebaseapp.com",
  projectId: "final-proj-bc237",
  storageBucket: "final-proj-bc237.firebasestorage.app",
  messagingSenderId: "559720312690",
  appId: "1:559720312690:web:c0cbf9665ea678f02db7eb",
  measurementId: "G-5RV6Z1STTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
