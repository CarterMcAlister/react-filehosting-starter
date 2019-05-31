import React, { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import LoaderButton from '../../components/LoaderButton'

const ChangePassword = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [changedPasswordStatus, setChangedPasswordStatus] = useState(null)
  const [{ oldPassword, newPassword, confirmNewPassword }, setUserInput] = useState({
    oldPassword,
    newPassword: '',
    confirmNewPassword: ''
  })

  const validateForm = () => {
    return newPassword.length > 0 && newPassword === confirmNewPassword
  }

  const handleChange = ({ target: { id, value } }) => {
    setUserInput(prevState => ({ ...prevState, [id]: value }))
  }

  const onPasswordChanged = status => {
    setChangedPasswordStatus(status)
    setUserInput({
      oldPassword,
      newPassword: '',
      confirmNewPassword: ''
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    setIsLoading(true)

    try {
      const user = await Auth.currentAuthenticatedUser()
      const changePasswordMsg = await Auth.changePassword(user, oldPassword, newPassword)
      onPasswordChanged(changePasswordMsg)
    } catch (e) {
      alert(e.message)
    }
    setIsLoading(false)
  }

  return (
    <div>
      {changedPasswordStatus === 'SUCCESS' ? <Alert variant="success">Password changed successfully!</Alert> : ''}
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="oldPassword" bsSize="large">
          <Form.Label>Old Password</Form.Label>
          <Form.Control type="password" value={oldPassword} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="newPassword" bsSize="large">
          <Form.Label>New Password</Form.Label>
          <Form.Control value={newPassword} onChange={handleChange} type="password" />
        </Form.Group>
        <Form.Group controlId="confirmNewPassword" bsSize="large">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control value={confirmNewPassword} onChange={handleChange} type="password" />
        </Form.Group>
        <LoaderButton
          block
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text="Change Password"
          loadingText="Changing Password…"
        />
      </form>
    </div>
  )
}

export default ChangePassword
