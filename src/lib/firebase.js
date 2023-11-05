import { initializeApp } from 'firebase/app';
import { getFirestore, FieldValue } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// import the seed file once
// import { seedDatabase } from '../seed';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// initialize firebase
const app = initializeApp(config);

// Initialize Cloud firestore and get a reference to the service
const firebase = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// call the seed file
//seedDatabase(firebase);

export { firebase, auth, FieldValue };
