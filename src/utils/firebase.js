import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyD_8MEB0kDHCzgX27vaGKDUZRaGpJQ-Aew',
  authDomain: 'glimpse-mobile-93741.firebaseapp.com',
  projectId: 'glimpse-mobile-93741',
  storageBucket: 'glimpse-mobile-93741.firebasestorage.app',
  messagingSenderId: '1008117957425',
  appId: '1:1008117957425:web:a30f4a8c9e73bc226c6610',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const database = getFirestore(app);

export {database};
