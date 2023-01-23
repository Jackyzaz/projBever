import React, { useState, useEffect} from 'react'
import firebaseConfig from '../config'

export const AuthContext = React.createContext(); 

export const AuthProvider = ({ children }) => {
    const [ loading, setloading ] = useState(true)
    const [ currentUser, setCurrentUser] = useEffect(null)

    useEffect(() => {
      firebaseConfig.auth().OnAuthStateChanged((user) => {
        setCurrentUser(user)
        setloading(false)
      })
    }, [])
    
    if (loading) {
        return <p>Loading...</p> 
    }

    return (
        <AuthProvider value={{currentUser}}>
            {children}
        </AuthProvider>
    )
}