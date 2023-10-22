import React, { useState } from 'react'
import { Container, Form, Button, Modal } from 'react-bootstrap'
import { UserAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errShow, setErrSmShow] = useState(false);

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const userCollectionRef = collection(db, "/user_db")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      await setDoc(doc(userCollectionRef, email), {
        firstname: '',
        lastname: '', 
        username: '',
        email: email,
        uid: '',
        role: 'member',
        avatarURLs: '/avatar.png',
    })
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
      setErrSmShow(true)
    }
  }

  return (
    <>
      <Container className='justify-content-center mt-5'>
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
          <p className='text-center mt-4'>Already have an account? <Link to='/signin'>Sign In</Link></p>
        </Form>
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


export default Signup