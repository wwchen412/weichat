import firebase from 'firebase';


  var firebaseConfig = {
    apiKey: "AIzaSyBWgHetjjRDzGTDr8FvogbV8mG1gGeLwjY",
    authDomain: "weichat-2aac0.firebaseapp.com",
    databaseURL: "https://weichat-2aac0.firebaseio.com",
    projectId: "weichat-2aac0",
    storageBucket: "weichat-2aac0.appspot.com",
    messagingSenderId: "690893761233",
    appId: "1:690893761233:web:4d4a83412c1aa7589033f0",
    measurementId: "G-WG9ZP3LS4B"
  };

  firebase.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth;
  export const db = firebase.database();
