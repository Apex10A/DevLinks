import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { isSupported, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAv1WTqIG0osA_di-z3GjuFGl8NSYmBcb4",
  authDomain: "devliks-site.firebaseapp.com",
  projectId: "devliks-site",
  storageBucket: "devliks-site.appspot.com",
  messagingSenderId: "461850940220",
  appId: "1:461850940220:web:ef7b4049be176bf8338439",
  measurementId: "G-BNVT5XSR41"
};

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  }).catch((error) => {
    console.error('Error checking analytics support:', error);
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage  = getStorage(app);
export default app;
