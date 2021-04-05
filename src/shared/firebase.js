import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC1MGJWD8XdbcFvNctouvg9Uz0nJ-U12cc",
    authDomain: "foodstagram-717f5.firebaseapp.com",
    projectId: "foodstagram-717f5",
    storageBucket: "foodstagram-717f5.appspot.com",
    messagingSenderId: "1065220674260",
    appId: "1:1065220674260:web:815a5a05c2c3f3a04e2141",
    measurementId: "G-LG06DPKQDG"
};

firebase.initializeApp(firebaseConfig);

const apiKey = "AIzaSyC1MGJWD8XdbcFvNctouvg9Uz0nJ-U12cc";
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };