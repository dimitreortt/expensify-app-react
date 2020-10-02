// import firebase from 'firebase/app'
// import 'firebase/database'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  // databaseURL:'https://react-expensify-test-1aaf4.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig)

const db = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export { firebase, db, googleAuthProvider }
