import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, push,
  orderBy, 
  onSnapshot ,onValue,DataSnapshot,get } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDPFYpCJ6b93w9JVnwF5YbNHtqCopMiY00",
  authDomain: "message-bdea3.firebaseapp.com",
  projectId: "message-bdea3",
  storageBucket: "message-bdea3.firebasestorage.app",
  messagingSenderId: "680649408212",
  appId: "1:680649408212:web:061cde2f8529088932c541",
  measurementId: "G-81L674FE3G"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref,get, set,DataSnapshot ,collection,push, addDoc,onValue, serverTimestamp, query, orderBy, onSnapshot  }