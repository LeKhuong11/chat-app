import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBGD4RM_PSlhETjhE6-CMnBByL7bTbWN3M",
    authDomain: "chat-app-95381.firebaseapp.com",
    projectId: "chat-app-95381",
    storageBucket: "chat-app-95381.appspot.com",
    messagingSenderId: "301679233000",
    appId: "1:301679233000:web:3358f7a16c6216c979c65d",
    measurementId: "G-GL3CXZ5DFD"
  }; 
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app