import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyAwb9uWWvQ27RsgalRWpxriICO4rEE-iZk",
        authDomain: "newfriend-4dd5c.firebaseapp.com",
        databaseURL: "https://newfriend-4dd5c.firebaseio.com",
        projectId: "newfriend-4dd5c",
        storageBucket: "newfriend-4dd5c.appspot.com",
        messagingSenderId: "814796786",
        appId: "1:814796786:web:1e8b02dc9caa92a308256b",
        measurementId: "G-V2GFQ8EWZ8"
    };
    firebase.initializeApp(firebaseConfig)
}
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()