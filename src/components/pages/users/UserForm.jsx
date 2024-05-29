import { useState } from "react"
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const UserForm = ({
  defaultName,
  defaultEnabled,
  submitLabel,
  cb
}) => {

  const [username, setUsername] = useState(defaultName)
  const [enabled, setEnabled] = useState(defaultEnabled === 'true')
  const [validated, setValidated] = useState(false)

  const navigate = useNavigate()

  const buttonLabel = submitLabel || 'Submit'

  const handleSubmit = evt => {
    const form = evt.currentTarget
    if (!form.checkValidity()) {
      evt.preventDefault()
      evt.stopPropagation()
      setValidated(true)
    } else {
      cb(username, enabled)
      navigate('/users')
    }
  }

  const handleNameChange = evt => {
    setUsername(evt.target.value)
  }

  const handleEnabledChange = evt => {
    setEnabled(evt.target.checked)
  }

  return (
    <div className="container mt-5" data-testid="user-form-container">
      <Form onSubmit={handleSubmit} validated={validated} noValidate>
        <Row className="mb-3">
          <FormGroup as={Col} className="mb-3" controlId="form-username">
            <Form.Label>User name (email address)</Form.Label>
            <Form.Control type="email"
              placeholder="Enter your email address"
              value={username}
              required
              onChange={handleNameChange}
              data-testid="user-name-input"/>
            <Form.Control.Feedback
              type="invalid"
              data-testid="user-name-feedback">
              Enter a valid email address
            </Form.Control.Feedback>
          </FormGroup>

          <FormGroup as={Col} className="mb-3" controlId="form-enabled">
            <Form.Label>Enabled</Form.Label>
            <Form.Check type="switch"
              checked={enabled}
              onChange={handleEnabledChange}
              data-testid="user-enabled-input" />
          </FormGroup>
        </Row>
        <Button type="submit" data-testid="submit-button">
          {buttonLabel}
        </Button>
      </Form>
    </div>
  )
}

export default UserForm