import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import LoaderButton from '../components/LoaderButton'

const Signup = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [{ username, email, password, confirmPassword, confirmationCode }, setUserInput] = useState({
    username,
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  })
  const [newUser, setNewUser] = useState(null)

  const validateForm = () => {
    return email.length > 0 && password.length > 0 && password === confirmPassword
  }

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0
  }

  const handleChange = ({ target: { id, value } }) => {
    setUserInput(prevState => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()

    setIsLoading(true)

    try {
      const newUserData = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      })
      setNewUser(newUserData)
    } catch (e) {
      alert(e.message)
    }
    setIsLoading(false)
  }

  const handleConfirmationSubmit = async event => {
    event.preventDefault()

    setIsLoading(true)

    try {
      await Auth.confirmSignUp(username, confirmationCode)
      await Auth.signIn(email, password)

      props.userHasAuthenticated(true)
      props.history.push('/')
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  const renderConfirmationForm = () => {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" bsSize="large">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control autoFocus type="tel" value={confirmationCode} onChange={handleChange} />
          <Form.Check>Please check your email for the code.</Form.Check>
        </Form.Group>
        <LoaderButton
          block
          bsSize="large"
          disabled={!validateConfirmationForm()}
          type="submit"
          isLoading={isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    )
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="username" bsSize="large">
          <Form.Label>Username</Form.Label>
          <Form.Control autoFocus type="text" value={username} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={handleChange} type="password" />
        </Form.Group>
        <Form.Group controlId="confirmPassword" bsSize="large">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control value={confirmPassword} onChange={handleChange} type="password" />
        </Form.Group>
        <LoaderButton
          block
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    )
  }

  return <div>{newUser === null ? renderForm() : renderConfirmationForm()}</div>
}

export default Signup
