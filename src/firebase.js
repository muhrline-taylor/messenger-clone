import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyApi3_oIYICgTW3cII08cguPPENJ09bYIU",
    authDomain: "messengerclone1.firebaseapp.com",
    projectId: "messengerclone1",
    storageBucket: "messengerclone1.appspot.com",
    messagingSenderId: "749501696139",
    appId: "1:749501696139:web:af73fc46cc518f6e89ac8e",
    measurementId: "G-E583Z5TK6J"
});



const db = firebaseApp.firestore();

export default db;