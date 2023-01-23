import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Auth'

const Home = () => {
    const { currentUser} = useContext(AuthContext)

    return (
        <>
          <h1>Hello</h1>  
        </>
    )
}

export default Home