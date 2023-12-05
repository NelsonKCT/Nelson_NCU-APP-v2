// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
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

async function getEvents() {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, 'ACTIVITY'));
  const events = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  return events;
}

async function uploadImage(blob) {
  const filename = `${new Date().getTime()}.jpg`; // 使用當前時間戳作為文件名
  const storageRef = ref(storage, `/images/${filename}`);

  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL; // 返回從Firebase Storage取得的URL
}

export default {
  add,
  storage,
  uploadImage,
  getEvents,
};
