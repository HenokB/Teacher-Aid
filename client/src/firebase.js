import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = process.env;
// Make sure to add your Firebase configuration below here
const firebaseConfig = {
  apiKey: "AIzaSyAlv-G_GN6rQNk9Sc_redEjXwJDkdKIvKo",
  authDomain: "teachers-aid-95cc1.firebaseapp.com",
  projectId: "teachers-aid-95cc1",
  storageBucket: "teachers-aid-95cc1.appspot.com",
  messagingSenderId: "943454664002",
  appId: "1:943454664002:web:a6a83f7e82b2caf02984db"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };