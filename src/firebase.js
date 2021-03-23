import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: `${process.env.REACT_APP_GOOGLE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_GOOGLE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_GOOGLE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_GOOGLE_APP_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();

export default firebaseApp;