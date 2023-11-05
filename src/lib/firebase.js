import { initializeApp } from 'firebase/app';
import { getFirestore, FieldValue } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// import the seed file once
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCQe_Jb43-luhIcRiBYn-RGR1lpiQHPW5E',
  authDomain: 'fabgram-a4e3b.firebaseapp.com',
  projectId: 'fabgram-a4e3b',
  storageBucket: 'fabgram-a4e3b.appspot.com',
  messagingSenderId: '933906181188',
  appId: '1:933906181188:web:c9616eb6d31d5f65a62011',
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
