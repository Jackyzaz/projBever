import React from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function AuthButton() {
    const { user } = UserAuth()

    if (!user) {
        return <Navbar.Collapse className="justify-content-end">
            <Nav.Link as={Link} to="/signin"><Button className="" variant="outline-light">Sign In</Button></Nav.Link>
        </Navbar.Collapse>
    } else {
        return <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: <a href="/dashboard">{user && user.email}</a>
            </Navbar.Text>
        </Navbar.Collapse>
    }
}

export default AuthButton