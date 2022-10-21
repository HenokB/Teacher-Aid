import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const { api_Key, authDomain_Id, project_Id, storageBucket_Id, messagingSender_Id, app_Id } = process.env;
// Make sure to add your Firebase configuration below here
const firebaseConfig = {
    apiKey: {api_Key},
    authDomain: {authDomain_Id},
    projectId: {project_Id},
    storageBucket: {storageBucket_Id},
    messagingSenderId: {messagingSender_Id},
    appId: {app_Id}
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };