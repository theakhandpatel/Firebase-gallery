import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyDrW1uB8JGtlcI5GqYXjmEYZjw6_Fr_k7c",
  authDomain: "firegram-e86ed.firebaseapp.com",
  projectId: "firegram-e86ed",
  storageBucket: "firegram-e86ed.appspot.com",
  messagingSenderId: "312257081106",
  appId: "1:312257081106:web:9c7db73f74cc620cd14dcb",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage()
const projectFirestore = firebase.firestore()
const timeStamp = firebase.firestore.FieldValue.serverTimestamp

export { projectStorage, projectFirestore, timeStamp }
