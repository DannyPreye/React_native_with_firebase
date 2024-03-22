// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIRE_BASE_API_KEY,
    authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_BASE_DATABASE_URL,
    projectId: process.env.FIRE_BASE_PROJECT_ID,
    storageBucket: process.env.FIRE_BASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
    appId: process.env.FIRE_BASE_APP_ID,
    measurementId: process.env.FIRE_BASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFireStore(app);
export const auth = getAuth(app);

export default app;
