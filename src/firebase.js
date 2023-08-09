// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClWdpkyZOZLKPMbAiJgPB2Yvclt1wnle4",
  authDomain: "auth-development-fe2b6.firebaseapp.com",
  projectId: "auth-development-fe2b6",
  storageBucket: "auth-development-fe2b6.appspot.com",
  messagingSenderId: "1047413091685",
  appId: "1:1047413091685:web:4b3760641482ba984cc58c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
