import React, { useState } from "react"
import { Navigate, Redirect } from 'react-router-dom'
import firebaseConfig from "../config"

const SignUp = () => {
    const [currentUser, setCurrentUser] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = e.target.elements

        try {
            firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value)
            setCurrentUser(true)
        } catch (err) {
            alert(err)
        }
    }

    if (currentUser) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default SignUp