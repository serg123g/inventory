import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD89liEQ_s3dmRVOBFYiWYtBYM2U6IAOH8",
  authDomain: "vaccinated-people-development.firebaseapp.com",
  projectId: "vaccinated-people-development",
  storageBucket: "vaccinated-people-development.appspot.com",
  messagingSenderId: "946088622680",
  appId: "1:946088622680:web:867a54dcd037e0b948682d"
}


const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(app)
export const auth = app.auth()
export default app
export {db}