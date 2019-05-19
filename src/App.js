import React, {useState, useEffect} from 'react'
import {Auth} from 'aws-amplify'
import {withRouter} from 'react-router-dom'
import Routes from './Routes'
import './App.css'
import MainNav from './components/MainNav'

function App(props) {
  const [isAuthenticated,
    setIsAuthenticated] = useState(false)
  const [isAuthenticating,
    setIsAuthenticating] = useState(true)

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

    props
      .history
      .push('/login')
  }
  return (!isAuthenticating && (
    <div className="App container">
      <MainNav handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>
      <Routes childProps={childProps}/>
    </div>
  ))
}

export default withRouter(App)
