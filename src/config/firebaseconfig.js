import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyB48C6-WVgAMIvFo-PjX35yOuQn_GTurlI',
  authDomain: 'sandar-89f26.firebaseapp.com',
  databaseURL: 'https://sandar-89f26.firebaseio.com',
  projectId: 'sandar-89f26',
  storageBucket: 'sandar-89f26.appspot.com',
  messagingSenderId: '421482275813',
  appId: '1:421482275813:web:a84d005e4cbb24cc7c850c',
  measurementId: 'G-ZKEPYR428M',
};
let app = Firebase.initializeApp(config);
export const db = app.database();
