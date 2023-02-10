import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import AuthButton from './AuthButton';

function AppNavBar() {
    
    return (
        <Navbar bg="primary" variant="dark" sticky='top' expand='md' >
            <Container>
                <Navbar.Brand href='#home'>Bever</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/reportproblem">ReportProblem</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <AuthButton />
            </Container>
        </Navbar>
    )
}

export default AppNavBar