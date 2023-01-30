import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAVvlHxzYhGPRPvKSlv3un-frwINKnLhX8",
    authDomain: "my-onlineshopping.firebaseapp.com",
    databaseURL: "https://my-onlineshopping-default-rtdb.firebaseio.com",
    projectId: "my-onlineshopping",
    storageBucket: "my-onlineshopping.appspot.com",
    messagingSenderId: "64998039121",
    appId: "1:64998039121:web:5b0bb4390d52e862452270"
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app);

export { app, firestore, storage };