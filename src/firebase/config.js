// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH9bHJV-K8H76q5nmHc7rVI9KvzNJ9FJc",
  authDomain: "postbook-21f4d.firebaseapp.com",
  projectId: "postbook-21f4d",
  storageBucket: "postbook-21f4d.appspot.com",
  messagingSenderId: "337072983468",
  appId: "1:337072983468:web:768d1213aee627d4fc7e09",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
