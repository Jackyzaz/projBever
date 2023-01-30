import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { UserAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      navigate('/dashboard')
    } catch (e) {
      alert(e)
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <Container>
      <h1 className='text-center mb-3'>Sign Up</h1>
      <Form className='d-grid' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">Sign Up</Button>
      <p className='text-center mt-4'>Already have an account? <Link to='/'>Sign In</Link></p>

      </Form>
    </Container>
  )
}


export default Signup