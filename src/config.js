import firebase, { initializeApp } from 'firebase/app'
import 'firebase/auth'
import * as config from '../firebasekey'

const firebaseConfig = {
  apiKey: config.FIREBASE_APIKEY,
  authDomain: config.FIREBASE_AUTHDOMAIN,
  projectId: config.FIREBASE_PROJECTID,
  storageBucket: config.FIREBASE_STORAGEBUCKET,
  messagingSenderId: config.FIREBASE_MESSAGINGSENDERID,
  appId: config.FIREBASE_APPID,
  measurementId: config.FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig)
export default app