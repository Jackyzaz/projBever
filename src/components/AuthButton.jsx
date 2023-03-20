import React from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function AuthButton() {
    const { user, logout } = UserAuth()
    const navigate = useNavigate()
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

    if (!user) {
        return <Navbar.Collapse className="justify-content-end">
            <Nav.Link as={Link} to="/signin"><Button className="mx-5 my-2" variant="outline-light">Sign In</Button></Nav.Link>
        </Navbar.Collapse>
    } else {
        return <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: <a href="/profile">{user && user.email}</a>
                <Button onClick={handleLogout} className="ms-4 me-5" variant="outline-light">Sign out</Button>
            </Navbar.Text>
        </Navbar.Collapse>
    }
}

export default AuthButton