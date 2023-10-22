import React, { useEffect } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import AuthButton from './AuthButton';

function AppNavBar() {
    const { user, userDB } = UserAuth()
        ?? {
        user: {
            isAdmin: false,
            isAcademic: false,
            isBuilding: false,
            isWelfare: false,
            isFinace: false,
            isSC: false,
            isDirector: false
        }
    };

    return (
        <Navbar bg={user?.isAdmin ? 'danger' : (user?.isAcademic ||
            user?.isBuilding ||
            user?.isWelfare ||
            user?.isFinace ||
            user?.isSC ||
            user?.isDirector) ? 'success' : 'primary'} variant="dark" sticky='top' expand='lg' >
            <Navbar.Brand className='mx-4 text-bold' href='/'>Bever</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse>
                {!user?.isAdmin
                    ?
                    (
                        (user?.isAcademic ||
                            user?.isBuilding ||
                            user?.isWelfare ||
                            user?.isFinace ||
                            user?.isSC ||
                            user?.isDirector) ?
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/admin/dashboard">Department Dashboard</Nav.Link>
                            </Nav> :

                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/reportproblem">ReportProblem</Nav.Link>
                                {/* <NavDropdown title="Feature" id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/social">Social Problem</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/consultant">Personal Consultant</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/lostnfound">Lost & Found</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/Contact">
                                    Contact Us
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            </Nav>
                    ) : (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin/dashboard">ProblemMonitor</Nav.Link>
                            <Nav.Link as={Link} to="/admin/ranking">Problem Ranking</Nav.Link>
                            <NavDropdown title="Database" id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/admin/database">Problem Database</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/userdb">User Database</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )
                }
            </Navbar.Collapse>
            <AuthButton />
        </Navbar>
    )
}

export default AppNavBar