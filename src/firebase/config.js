import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCX1Cm6-ycILOw7EEtEsXmVMvDt5r8vD4c",
  authDomain: "applehub-e2023.firebaseapp.com",
  databaseURL:
    "https://applehub-e2023-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "applehub-e2023",
  storageBucket: "applehub-e2023.appspot.com",
  messagingSenderId: "388339879557",
  appId: "1:388339879557:web:6789354e9e32b38c6463ec",
  measurementId: "G-TEBMC46VLC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
const database = getDatabase(app);
export { database, ref, onValue, off };
export const apiKey = firebaseConfig.apiKey;
