import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import ProblemCard from '../components/ProblemCard';
import { UserAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
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
      <h1 className='text-center'>Admin Dashboard</h1>
      <div className='mt-3 text-center'>
        <h5>User Email : {user && user.email}</h5>
        <div className="mt-3">
        <Button onClick={handleLogout} className="m-2" variant="danger">Sign out</Button>
        <Button as={Link} to="/reportproblem" className="m-2" variant="danger">ProblemReporter</Button>
        </div>
       
      
      </div>
     </>
  )
}

export default AdminDashboard