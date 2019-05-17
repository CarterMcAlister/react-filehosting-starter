import React, { Component, Fragment, useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Link, withRouter } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Routes from './Routes'
import './App.css'

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    async function getAuthSession() {
      try {
        await Auth.currentSession()
        setIsAuthenticated(true)
      } catch (e) {
        if (e !== 'No current user') {
          alert(e)
        }
      }

      setIsAuthenticating(false)
    }

    getAuthSession()
  }, [])

  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: setIsAuthenticated
  }

  const handleLogout = async event => {
    await Auth.signOut()

    setIsAuthenticated(false)

    props.history.push('/login')
  }
  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React Filehosting Starter</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <Fragment>
                  <LinkContainer to="/profile">
                    <NavItem>Profile</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    )
  )
}

export default withRouter(App)
