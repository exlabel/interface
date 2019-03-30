import firebase from 'firebase'
import config from './config.js'
// import 'firebase/firebase-auth'
// import 'firebase/firebase-firestore'

firebase.initializeApp(config);

export default firebase
