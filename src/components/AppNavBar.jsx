import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

function AppNavBar() {
  return (
        <Navbar bg="primary" variant="dark" sticky='top' expand='md' >
            <Container>
                <Navbar.Brand href='#home'>Bever</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to ="/">Home</Nav.Link>
                        <Nav.Link as={Link} to ="/About">About</Nav.Link>
                        <Nav.Link as={Link} to ="/Contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
    )   
}

export default AppNavBar