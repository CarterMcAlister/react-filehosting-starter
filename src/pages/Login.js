import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import LoaderButton from '../components/LoaderButton'

const Login = ({ userHasAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validateForm = () => email.length > 0 && password.length > 0

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await Auth.signIn(email, password)
      userHasAuthenticated(true)
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  return (
    <LoginPage>
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus value={email} onChange={event => setEmail(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={event => setPassword(event.target.value)} type="password" />
        </Form.Group>
        <LoaderButton
          block
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text="Login"
          loadingText="Logging in…"
        />
      </form>
    </LoginPage>
  )
}

const LoginPage = styled.div`
  padding: 60px 0;
`

export default Login
