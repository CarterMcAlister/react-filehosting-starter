import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const MainNav = ({ isAuthenticated, handleLogout }) => (
  <Navbar collapseOnSelect expand="lg">
    <LinkContainer to="/">
      <Navbar.Brand>React Filehosting Starter</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      <Nav>
        {isAuthenticated ? (
          <>
            <Nav.Item>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogout}> Logout </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default MainNav
