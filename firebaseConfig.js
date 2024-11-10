import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKnPoj32lqx9PNnOAPDe81EW67JRwL1U0",
  authDomain: "myproject-a8a85.firebaseapp.com",
  projectId: "myproject-a8a85",
  storageBucket: "myproject-a8a85.firebasestorage.app",
  messagingSenderId: "798483139606",
  appId: "1:798483139606:web:be8c54428b487f14e23937",
  measurementId: "G-8EPCPRHNLW"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
