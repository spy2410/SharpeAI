// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNkemTqYrdooLCs-vpKKp0Rba8_Mf3Ckk",
  authDomain: "sharpeai-1f9e9.firebaseapp.com",
  projectId: "sharpeai-1f9e9",
  storageBucket: "sharpeai-1f9e9.appspot.com",
  messagingSenderId: "433659041157",
  appId: "1:433659041157:web:7c654d8ceaecb3423ca0ec",
  measurementId: "G-JFN2XXF5QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

