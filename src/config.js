import firebase, { initializeApp } from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCdDNMHCQlHS0B_sLe6MEuNRIyirIbfgfk",
  authDomain: "projbever.firebaseapp.com",
  projectId: "projbever",
  storageBucket: "projbever.appspot.com",
  messagingSenderId: "61471535275",
  appId: "1:61471535275:web:32c31b129b1940bf0b07ee",
  measurementId: "G-KWREWSMC6J"
};

const app = initializeApp(firebaseConfig)
export default app