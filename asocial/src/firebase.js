import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHD,
    projectId:process.env.REACT_APP_PROJECTID,
    storageBucket:process.env.REACT_APP_STORAGE,
    messagingSenderId: process.env.REACT_APP_MESSAGING,
    appId:process.env. REACT_APP_APPID,
    measurementId:process.env.REACT_APP_MEASUR
  };
  const firebaseApp = firebase.initializeApp (firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
  