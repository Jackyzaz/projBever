// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import * as config from "../firebasekey"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: config.REACT_APP_FIREBASE_APIKEY,
  authDomain: config.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: config.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: config.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: config.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: config.REACT_APP_FIREBASE_APPID,
  measurementId: config.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;