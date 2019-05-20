import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Routes from './Routes'
import MainNav from './components/MainNav'

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
    isAuthenticated,
    userHasAuthenticated: setIsAuthenticated
  }

  const handleLogout = async event => {
    await Auth.signOut()

    setIsAuthenticated(false)

    props.history.push('/login')
  }
  return (
    !isAuthenticating && (
      <Container>
        <MainNav handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Routes childProps={childProps} />
      </Container>
    )
  )
}

export default withRouter(App)
