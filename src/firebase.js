import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDKGsfbt5HPPOqgG_waJbfHQIeSaiemiW4",
  authDomain: "shopify-challenge-6e16c.firebaseapp.com",
  projectId: "shopify-challenge-6e16c",
  storageBucket: "shopify-challenge-6e16c.appspot.com",
  messagingSenderId: "528359091693",
  appId: "1:528359091693:web:1cdbfc70383cb69e3b0be4",
  measurementId: "G-XXBGGHMGXL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
