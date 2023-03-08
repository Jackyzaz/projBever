import React from 'react'
import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import GuestButton from '../components/GuestButton'
import { UserAuth } from '../contexts/AuthContext'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {signIn} = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      alert(err.message)
      setError(err.message)
      console.log(err.message)
    }
  }

  return (
    <Container>
      <h1 className='text-center mb-3'>Sign In</h1>
      <Form className='d-grid mb-5' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">Sign In</Button>
      <p className='text-center mt-4'>Don't have an account yet? <Link to='/signup'>Sign up</Link></p>

      </Form>
      <GuestButton />
    </Container>
  )
}

export default Signin