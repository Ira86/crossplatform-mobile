// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTo1VI1mSx2byvfn48tHcU4mVO2qETHz4",
  authDomain: "project-iths.firebaseapp.com",
  projectId: "project-iths",
  storageBucket: "project-iths.appspot.com",
  messagingSenderId: "178402500702",
  appId: "1:178402500702:web:156a8393cc7a316fb614cf",
  measurementId: "G-VLM2PXDHM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore();