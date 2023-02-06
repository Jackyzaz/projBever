import React from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { Navbar, Button } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

function AuthButton() {
    const { user } = UserAuth()

    if (!user) {
        return <Navbar.Collapse className="justify-content-end">
            <Navbar.Text><Button onClick={<Navigate to="/signin" />} className="" variant="outline-light" type="submit">Sign In</Button>
            </Navbar.Text>
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