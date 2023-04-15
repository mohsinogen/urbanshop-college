// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2_5wC6Lrg0-kEXASunAgjajUgX90PVrI",
    authDomain: "my-bucket-a9016.firebaseapp.com",
    databaseURL: "https://my-bucket-a9016-default-rtdb.firebaseio.com",
    projectId: "my-bucket-a9016",
    storageBucket: "my-bucket-a9016.appspot.com",
    messagingSenderId: "647323027699",
    appId: "1:647323027699:web:4832367558e3ab5db34f86"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);