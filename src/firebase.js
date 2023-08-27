import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD_wUAiEfkuo3WcYWbOYRzIGTc9SgB0tYc",
  authDomain: "playground-5147e.firebaseapp.com",
  databaseURL: "https://playground-5147e-default-rtdb.firebaseio.com",
  projectId: "playground-5147e",
  storageBucket: "playground-5147e.appspot.com",
  messagingSenderId: "835426378712",
  appId: "1:835426378712:web:a16e7dd94c69fc92cb48ad"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
