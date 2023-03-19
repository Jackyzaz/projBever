import React from 'react'
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GuestButton from '../components/GuestButton'
import { UserAuth } from '../contexts/AuthContext'

function Home() {
  return (
    <>
      <div className='bg-primary'>
        <Row className="py-5 row gx-4 gx-lg-5 justify-content-center">
          <Col xs={6} className="text-center">
            <h1 className="text-white mt-0">Welcome to Bever </h1>
            <hr className='divider divider-light' />
            <h6 className="text-white mb-4">
              Web-Application For Complaint And Intelligent Problem Management In Organization
            </h6>
            <Button className='mt-3' variant='outline-light' as={Link} to='/SignUp'>Get Started</Button>
          </Col>
        </Row>
      </div>
      <br></br>
      <Container className='mt-5'>
        <h2 className="text-center mt-0">At User Feature</h2>
        <Row className='justify-content-between my-5'>
          <Col className="text-center mx-2 mb-5" md={3}>
            <img className='' width={100} src='src\assets\paperplane.svg'></img>
            <h3 className="h4 my-2">Problem Reporter</h3>
            <p className="text-muted mb-0">Send your Problem to Operator Contribute to helping the organization</p>
          </Col>
          <Col className="text-center mx-2 mb-5" md={3} >
            <img className='' width={100} src='src\assets\tracker.svg'></img>
            <h3 className="h4 my-2">Track Status</h3>
            <p className="text-muted mb-0">Recognize and Follow your problem status</p>
          </Col>
          <Col className="text-center mx-2 mb-5" md={3} >
            <img className='' width={100} src='src\assets\admin.svg'></img>
            <h3 className="h4 my-2">Contact With Operator</h3>
            <p className="text-muted mb-0">You can private contact with Operator for fixing problem</p>
          </Col>
        </Row>
        <hr className='my-5'></hr>
        <div className='text-center py-3'>
          <h2 className='text-center'>How to Get Started With Application?</h2>
          <p>Here sign up to application, Then report your first problem!</p>
          <div className='mt-4 justify-content-between'>
            <Button className='mx-2' as={Link} to='/SignUp'>Sign Up</Button>
            <Button className='mx-2' as={Link} to='/reportproblem'>Report Problem</Button>
          </div>
        </div>
        <hr className='my-5'></hr>
        <div className='text-center py-3'>
          <h2 className='text-center'>Or Continued as Guest?</h2>
          <p>If you come as guest, Let's try as guest account</p>
          <div className='mt-4 justify-content-between'>
            <GuestButton />
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </Container>
      <footer className="bg-primary py-5">
        <div className="container px-4 px-lg-5"><h6 className="small text-center text-bold text-white">Copyright &copy; 2023 - Hatyaiwittayalai School - National Software Contest 25th</h6></div>
      </footer>
    </>
  )
}

export default Home