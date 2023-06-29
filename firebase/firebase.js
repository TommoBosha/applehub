import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCX1Cm6-ycILOw7EEtEsXmVMvDt5r8vD4c",
    authDomain: "applehub-e2023.firebaseapp.com",
    projectId: "applehub-e2023",
    storageBucket: "applehub-e2023.appspot.com",
    messagingSenderId: "388339879557",
    appId: "1:388339879557:web:6789354e9e32b38c6463ec",
    measurementId: "G-TEBMC46VLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);