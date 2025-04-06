import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, update ,ref, set, collection, addDoc, serverTimestamp, query, push, orderBy, onSnapshot, onValue, get, DataSnapshot } from 'firebase/database';
import { getStorage } from 'firebase/storage';  // Importation du service de stockage

const firebaseConfig = {
  apiKey: "AIzaSyDPFYpCJ6b93w9JVnwF5YbNHtqCopMiY00",
  authDomain: "message-bdea3.firebaseapp.com",
  projectId: "message-bdea3",
  storageBucket: "message-bdea3.firebasestorage.app",
  messagingSenderId: "680649408212",
  appId: "1:680649408212:web:061cde2f8529088932c541",
  measurementId: "G-81L674FE3G"
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services nécessaires
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);  // Initialisation de Firebase Storage

// Exportation des services pour utilisation dans d'autres fichiers
export { 
  db, 
  ref, 
  get, 
  set, 
  DataSnapshot, 
  collection, 
  push, 
  addDoc, 
  onValue, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot, 
  storage, 
  auth ,update 
};
