import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOyyoiJ1TGFGO_XxLbapsj4_PjJq4IvPQ",
  authDomain: "tp-6-a6c87.firebaseapp.com",
  projectId: "tp-6-a6c87",
  storageBucket: "tp-6-a6c87.appspot.com",
  messagingSenderId: "245245678887",
  appId: "1:245245678887:web:64f3e3669614dd800e0502",
  measurementId: "G-RT3G161EW7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

