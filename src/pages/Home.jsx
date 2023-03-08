import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GuestButton from '../components/GuestButton'
import { UserAuth } from '../contexts/AuthContext'

function Home() {
  return (
      <>
        <h1>Bever</h1>
        <p>Welcome to Bever, Application for complaint and intelligent problem mangement in school.</p>
        <Button className='mr-3 my-3' as={Link} to='/dashboard'>Dashboard</Button>
        <Button className=' m-3 my-3' as={Link} to='/reportproblem'>Report Problem</Button>
        <hr className='my-5'></hr>
        <GuestButton />
      </>
  )
}

export default Home