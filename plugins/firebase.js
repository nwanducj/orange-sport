// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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