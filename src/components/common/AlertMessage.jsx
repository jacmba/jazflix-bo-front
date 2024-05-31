import { Alert } from "react-bootstrap"

const AlertMessage = ({
  variant,
  closeCallback,
  children
}) => {

  const finalVariant = variant || 'primary'

  return (
    <Alert variant={finalVariant} show={true} 
      onClose={closeCallback} dismissible data-testid="message-alert">
      {children}
    </Alert>
  )
}

export default AlertMessage