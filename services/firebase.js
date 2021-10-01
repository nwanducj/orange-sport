// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBxpM3wXCt9WsYAgHC8YHWOffdriTnYh4",
  authDomain: "nexbuy-development.firebaseapp.com",
  databaseURL: "https://nexbuy-development.firebaseio.com",
  projectId: "nexbuy-development",
  storageBucket: "nexbuy-development.appspot.com",
  messagingSenderId: "1040974565177",
  appId: "1:1040974565177:web:eefeae4172790bcb1ee2e8",
  measurementId: "G-WQNVGP8D1G"
};

// Initialize Firebase
const apps = getApps()
let app
if (!apps.length) {
  app = initializeApp(firebaseConfig)
} else {
  app = apps[0]
}
const appAuth = getAuth(app);
const appFirestore = getFirestore(app);
const appStorage = getStorage(app);

export const auth = appAuth
export const firestore = appFirestore
export const storage = appStorage
