// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHuew2ZcnP4wk6OqyZbBrs5p-yDR93w6k",
  authDomain: "super-cameras.firebaseapp.com",
  databaseURL: "https://super-cameras.firebaseio.com",
  projectId: "super-cameras",
  storageBucket: "super-cameras.appspot.com",
  messagingSenderId: "972833864547",
  appId: "1:972833864547:web:b4e1935046472389b6b156",
  measurementId: "G-RSY7N4GQ4H"
};


// Initialize Firebase
const apps = getApps()
let app
if (!apps.length) {
  app = initializeApp(firebaseConfig)
} else {
  app = apps[0]
}