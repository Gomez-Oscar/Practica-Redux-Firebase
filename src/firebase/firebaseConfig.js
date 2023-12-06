// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCd5bAc54M2_pGPNfKnUq22fQb-c1C33Aw',
  authDomain: 'first-example-auth-ana.firebaseapp.com',
  projectId: 'first-example-auth-ana',
  storageBucket: 'first-example-auth-ana.appspot.com',
  messagingSenderId: '1094666079092',
  appId: '1:1094666079092:web:5e46118cb01eb9d1fb7a21',
  measurementId: 'G-43RF4PLZBM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
