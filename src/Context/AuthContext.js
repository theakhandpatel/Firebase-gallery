import React, { useContext, useState, useEffect, createContext } from "react"
import { projectAuth } from "../firebase/config"

const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}){
const [currentUser,setCurrentUser] = useState()
const [loading,setLoading] = useState(true)

function signup(email,password){
    return projectAuth.createUserWithEmailAndPassword(email ,password)
}

function login(email,password){
    return projectAuth.signInWithEmailAndPassword(email,password)
}

function logout(){
    return projectAuth.signOut()
}

function resetPassword(email){
    return projectAuth.sendPasswordResetEmail(email)
}

function updateEmail(email){
    return currentUser.updateEmail(email)
}
function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

useEffect(()=>{
    return projectAuth.onAuthStateChanged((user)=>{
        setCurrentUser(user)
        setLoading(false)
    })
},[])

const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
}

return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )

}