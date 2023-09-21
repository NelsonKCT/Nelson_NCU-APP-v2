// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCHVlFfrjpdspU-KrM0c3zHsVEJGiuvObM',
  authDomain: 'ncuapp-summer-training.firebaseapp.com',
  projectId: 'ncuapp-summer-training',
  storageBucket: 'ncuapp-summer-training.appspot.com',
  messagingSenderId: '11610196247',
  appId: '1:11610196247:web:141663e37e659322eacf52',
  measurementId: 'G-4HDMFLJ568',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

async function add(docData) {
  const db = getFirestore(app);
  await addDoc(collection(db, 'ACTIVITY'), docData);
}

export default {
  add,
  storage,
};
