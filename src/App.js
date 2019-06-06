import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Routes from './Routes'
import MainNav from './components/MainNav'
import './libs/fontLibrary'

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    async function getAuthSession() {
      try {
        await Auth.currentSession()
        setIsAuthenticated(true)

        const { username } = await Auth.currentAuthenticatedUser()
        setCurrentUser(username)
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
    setCurrentUser(null)

    props.history.push('/login')
  }
  return (
    !isAuthenticating && (
      <div>
        <MainNav handleLogout={handleLogout} isAuthenticated={isAuthenticated} userName={currentUser} />
        <Container fluid>
          <Routes childProps={childProps} />
        </Container>
      </div>
    )
  )
}

export default withRouter(App)
