import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyATA35vW-Yb8mclhhpJOY4riCP9QbWWLLY",
  authDomain: "blog-f5e40.firebaseapp.com",
  projectId: "blog-f5e40",
  storageBucket: "blog-f5e40.appspot.com",
  messagingSenderId: "19296513262",
  appId: "1:19296513262:web:1302bc0ef460739d9917ff",
  measurementId: "G-CS6TX2FDFT"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };