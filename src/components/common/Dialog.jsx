import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

const Dialog = ({
  showDefault,
  title,
  text,
  acceptCaption,
  acceptClass,
  acceptCallback
}) => {

  const [show, setShow] = useState(showDefault || false)

  const acceptBtnCaption = acceptCaption || 'Accept'

  const acceptBtnClass = acceptClass || 'primary'

  const handleClose = () => {
    setShow(false)
  }

  const handleAccept = () => {
    acceptCallback()
    setShow(false)
  }
  
  return (
    <Modal show={show} onHide={handleClose} data-testid="dialog-modal">
      <Modal.Header>
        <Modal.Title data-testid="dialog-title">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body data-testid="dialog-text">
        {text}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"
          onClick={handleClose}
          data-testid="dialog-close-btn">
          Close
        </Button>
        <Button variant={acceptBtnClass}
          onClick={handleAccept}
          data-testid="dialog-accept-btn">
          {acceptBtnCaption}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Dialog