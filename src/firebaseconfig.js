import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyC2qtprutULKpYXqHZx9ZgeLEySp3KYdyc",
  authDomain: "prothom-47b7d.firebaseapp.com",
  projectId: "prothom-47b7d",
  storageBucket: "prothom-47b7d.appspot.com",
  messagingSenderId: "745609583816",
  appId: "1:745609583816:web:3837e2eb1da28bc7fc99fd",
  measurementId: "G-KC7BNH16BW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig; 
