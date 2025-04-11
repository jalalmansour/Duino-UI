import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyB0Azhz6silHeo9oavdaT5YV6sqDGm100c",
  authDomain: "jalalduino.firebaseapp.com",
  // databaseURL: "https://jalalduino.firebaseio.com",
  projectId: "jalalduino",
  storageBucket: "jalalduino.appspot.com",
  messagingSenderId: "605646932250",
  appId: "1:605646932250:web:22635638c5b1d2d22a84a3",
  measurementId: "G-NM9V9Z9J21",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
