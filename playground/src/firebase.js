
import { initializeApp } from "firebase/app";
import { getFirestore, collection} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBL5CHHa8yJ6I14QmAPYF0qNucwRvfw7ho",
    authDomain: "timeblocker-247e3.firebaseapp.com",
    projectId: "timeblocker-247e3",
    storageBucket: "timeblocker-247e3.appspot.com",
    messagingSenderId: "131557899054",
    appId: "1:131557899054:web:0441542b9ed965b03e98bf"
  };
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)
export const todolistRef = collection(db, "todolist")

