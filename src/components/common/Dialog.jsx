import { Button, Modal } from "react-bootstrap"

const Dialog = ({
  title,
  acceptCaption,
  acceptClass,
  acceptCallback,
  cancelCallback,
  children
}) => {

  const acceptBtnCaption = acceptCaption || 'Accept'

  const acceptBtnClass = acceptClass || 'primary'

  const handleClose = () => {
    cancelCallback()
  }

  const handleAccept = () => {
    acceptCallback()
  }
  
  return (
    <Modal show="true" onHide={handleClose} data-testid="dialog-modal">
      <Modal.Header>
        <Modal.Title data-testid="dialog-title">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body data-testid="dialog-text">
        {children}
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