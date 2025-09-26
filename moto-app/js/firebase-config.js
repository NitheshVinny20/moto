// /js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIxCrMdhYAG7p_iLoNXIkcnBhD6n1Kqek",
  authDomain: "motoapp-97373.firebaseapp.com",
  projectId: "motoapp-97373",
  storageBucket: "motoapp-97373.firebasestorage.app",
  messagingSenderId: "494648272586",
  appId: "1:494648272586:web:c82f4903f11b633",
  measurementId: "G-3HYCVRGDNE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
