import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import AuthButton from './AuthButton';

function AppNavBar() {
    const { user } = UserAuth() ?? { user: { isAdmin: false } };

    return (
        <Navbar bg={user?.isAdmin ? 'danger' : 'primary'} variant="dark" sticky='top' expand='md' >
            <Navbar.Brand className='mx-4 text-bold' href='/'>Bever</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse>
                {!user?.isAdmin
                    ? (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/reportproblem">ReportProblem</Nav.Link>
                            <NavDropdown title="Feature" id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/social">Social Problem</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/consultant">Personal Consultant</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/lostnfound">Lost & Found</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/Contact">
                                    Contact Us
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin/dashboard">ProblemMonitor</Nav.Link>
                            <Nav.Link as={Link} to="/admin/ranking">Problem Ranking</Nav.Link>
                            <Nav.Link as={Link} to="/admin/database">Database</Nav.Link>
                        </Nav>
                    )
                }
            </Navbar.Collapse>
            <AuthButton />
        </Navbar>
    )
}

export default AppNavBar