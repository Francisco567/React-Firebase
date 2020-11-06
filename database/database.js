import firebase from "firebase";

import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD4sO15AEi79R0QG6CaQRp4wRWS102vrfg",
    authDomain: "react-fire-61371.firebaseapp.com",
    databaseURL: "https://react-fire-61371.firebaseio.com",
    projectId: "react-fire-61371",
    storageBucket: "react-fire-61371.appspot.com",
    messagingSenderId: "942137657688",
    appId: "1:942137657688:web:da1218a029b6bdca2dfd2d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore();

  export default {
      firebase,
      db
  }