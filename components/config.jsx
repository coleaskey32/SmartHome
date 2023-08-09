// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRNv8a-_NRYSIn2WOxm-DE2UK54LlyoFY",
  authDomain: "smart-home-7d5af.firebaseapp.com",
  databaseURL: "https://smart-home-7d5af-default-rtdb.firebaseio.com",
  projectId: "smart-home-7d5af",
  storageBucket: "smart-home-7d5af.appspot.com",
  messagingSenderId: "334399140998",
  appId: "1:334399140998:web:f224177427b365c3d78d07",
  measurementId: "G-1CK6LQPCEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initilize Database
export const database = getDatabase(app);