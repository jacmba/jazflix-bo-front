import { Col, Form, FormGroup, Row } from "react-bootstrap"

const UserForm = () => {

  return (
    <div className="container mt-5" data-testid="user-form-container">
      <Form>
        <Row className="mb-3">
          <FormGroup as={Col} className="mb-3" controlId="form-username">
            <Form.Label>User name (email address)</Form.Label>
            <Form.Control type="email" placeholder="Enter email address" data-testid="user-name-input"/>
          </FormGroup>

          <FormGroup as={Col} className="mb-3" controlId="form-enabled">
            <Form.Label>Enabled</Form.Label>
            <Form.Check type="switch" data-testid="user-enabled-input" />
          </FormGroup>
        </Row>
      </Form>
    </div>
  )
}

export default UserForm