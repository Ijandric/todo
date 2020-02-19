import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5PepiREIjGEcoo4KYG9ElC2HHbw_jyKE",
    authDomain: "todo-project-5b73a.firebaseapp.com",
    databaseURL: "https://todo-project-5b73a.firebaseio.com",
    projectId: "todo-project-5b73a",
    storageBucket: "todo-project-5b73a.appspot.com",
    messagingSenderId: "1017802644504",
    appId: "1:1017802644504:web:48526d17037b233cff376d"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const firestore = firebaseApp.firestore();
//   firestore.settings({timestampsInSnapshots: true});

  export default firestore;