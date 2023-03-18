import React from 'react'
import { useState } from 'react'
import { Container, Form, Button, Row, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import GuestButton from '../components/GuestButton'
import { UserAuth } from '../contexts/AuthContext'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errShow, setErrSmShow] = useState(false);
  const navigate = useNavigate()
  const { signIn } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
      console.log(err.message)
      setErrSmShow(true)
    }
  }

  return (
    <>
      <Container className='justify-content-center mt-5 w-50'>
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
        <hr />
        <div className='text-center py-3'>
          <h2 className='text-center'>Or Continued as Guest?</h2>
          <p>If you come as guest, Let's try as guest account</p>
          <div className='mt-4 justify-content-between'>
            <GuestButton />
          </div>
        </div>
      </Container>
      <Modal
        size="sm"
        show={errShow}
        onHide={() => setErrSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Error!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
      </Modal>
    </>
  )
}

export default Signin