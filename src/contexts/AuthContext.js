import React, { useContext, useState, useEffect } from 'react'
import {auth, db} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
const [currentUser, setCurrentUser] = useState()
const [loading, setLoading] = useState(true)

/*signing up with email and pass*/
function signup(email, password){
 return auth.createUserWithEmailAndPassword(email, password)
}

// signing in with email and password
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

// // adding data to firebase
// function addData(email, ced, nombres, apellidos){
//   db
//   .collection('users')
//   .doc(auth.user.uid)
//   .set({
//     "cedula": ced,
//     "name": nombres,
//     "apellidos": apellidos,
//     "email": email,
//   })
// }

function logout() {
  return auth.signOut()
}

useEffect(() => {
//getting notification of currentUser
const unsubscribe = auth.onAuthStateChanged( user => {
  setCurrentUser(user)
  setLoading(false)
})
return unsubscribe
}, [])

// exporting functions
const value = {
        currentUser,
        login,
        signup,
        logout,

}

  return (
    <AuthContext.Provider value={value}> {/* managing the state*/} 
        {!loading && children}
    </AuthContext.Provider>
    
  )
}
