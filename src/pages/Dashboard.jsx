import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const {user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log('You are logged out')
    } catch (err) {
      alert(err.message)
      console.log(err.message)
    }
  }

  return (
     <>
      <h1 className='text-center'>Dashboard</h1>
      <div className='mt-4 text-center'>
        <h5>User Email : {user && user.email}</h5>
        <Button onClick={handleLogout} className="mt-3" variant="primary" type="submit">Sign out</Button>
      </div>
     </>
  )
}

export default Dashboard