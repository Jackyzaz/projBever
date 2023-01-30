// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdDNMHCQlHS0B_sLe6MEuNRIyirIbfgfk",
  authDomain: "projbever.firebaseapp.com",
  projectId: "projbever",
  storageBucket: "projbever.appspot.com",
  messagingSenderId: "61471535275",
  appId: "1:61471535275:web:32c31b129b1940bf0b07ee",
  measurementId: "G-KWREWSMC6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;