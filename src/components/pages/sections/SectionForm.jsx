import { useState } from "react"
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"

const SectionForm = ({
  defaultIcon,
  defaultTitle,
  defaultLinkTo,
  defaultOrder,
  submitLabel
}) => {

  const [validated, seteValidated] = useState(false)
  const [icon, setIcon] = useState(defaultIcon || '')
  const [title, setTitle] = useState(defaultTitle || '')
  const [linkTo, setLinkTo] = useState(defaultLinkTo || '')
  const [order, setOrder] = useState(defaultOrder || 999)

  const handleIconChange = evt => setIcon(evt.target.value)

  const handleTitleChange = evt => setTitle(evt.target.value)

  const handleLinkChange = evt => setLinkTo(evt.target.value)

  const handleOrderChange = evt => setOrder(Number(evt.target.value))

  const handleSubmit = evt => {
    const form = evt.currentTarget
    if (!form.checkValidity()) {
      evt.preventDefault()
      evt.stopPropagation()
      seteValidated(true)
    } else {
      // Todo invoke callback and navigate
    }
  }

  const buttonLabel = submitLabel || 'Submit'

  return (
    <div className="container mt-5" data-testid="section-form-container">
      <Form onSubmit={handleSubmit} validated={validated} noValidate>
        <Row>
          <FormGroup as={Col} className="mb-3" data-testid="form-icon">
            <Form.Label>Icon</Form.Label>
            <Form.Control
              type="text"
              value={icon}
              onChange={handleIconChange}
              required
              data-testid="section-icon-input"
              placeholder="Enter icon reference" />
            <Form.Control.Feedback
              type="invalid"
              data-testid="section-icon-feedback">
              Please provide a section icon reference
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup as={Col} className="mb-3" data-testid="form-title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              data-testid="section-title-input"
              placeholder="Enter section title" />
            <Form.Control.Feedback
              type="invalid"
              data-testid="section-title-feedback">
              Please provide a title
            </Form.Control.Feedback>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col}className="mb-3" data-testid="form-description">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text"
              value={linkTo}
              onChange={handleLinkChange}
              required
              data-testid="section-link-input"
              placeholder="Enter relative link" />
          </FormGroup>
          <FormGroup as={Col} className="mb-3" data-testid="form-order">
            <Form.Label>Order</Form.Label>
            <Form.Control
              type="number"
              value={order}
              onChange={handleOrderChange}
              required
              data-testid="section-order-input" />
            <Form.Control.Feedback></Form.Control.Feedback>
          </FormGroup>
        </Row>
        <Button type="submit" data-testid="submit-button">
          {buttonLabel}
        </Button>
      </Form>
    </div>
  )
}

export default SectionForm