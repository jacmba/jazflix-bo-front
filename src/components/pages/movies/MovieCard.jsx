import { Button, Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { deleteMovie } from "../../../services/movies-service"
import AlertMessage from "../../common/AlertMessage"
import Dialog from "../../common/Dialog"
import { useState } from "react"

const MovieCard = ({
  id,
  imgSrc,
  title,
  description,
  onDelete
}) => {

  const [showError, setShowError] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const navigate = useNavigate()

  const handleEdit = () => {
    navigate('/movies/' + id)
  }

  const confirmDelete = async () => {
    setShowDialog(false)
    const result = await deleteMovie(id)
    if (result) {
      onDelete(id)
    } else {
      setShowError(true)
    }
  }

  const handleDelete = () => {
    setShowDialog(true)
  }

  const closeDialog = () => setShowDialog(false)

  const handleCloseAlert = () => setShowError(false)

  return (
    <Card data-testid="movie-card">
      <Card.Img
        variant="top"
        src={imgSrc}
        height="600px"
        data-testid="movie-card-image" />
      <Card.Body>
        <Card.Title data-testid="movie-card-title">
          {title}
        </Card.Title>
        <Card.Text data-testid="movie-card-description">
          {description}
        </Card.Text>
        <Row>
          <Col>
            <Button
              variant="info"
              data-testid="movie-card-edit-btn"
              onClick={handleEdit}>
              Edit
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              data-testid="movie-card-delete-btn"
              onClick={handleDelete}>
              Delete
            </Button>
          </Col>
        </Row>

        {
          showDialog &&
          <Dialog
            title="Delete movie"
            acceptCaption="Delete"
            acceptClass="danger"
            acceptCallback={confirmDelete}
            cancelCallback={closeDialog}>
            Are you sure you want to delete {title}?
            </Dialog>
        }

        {
          showError &&
          <AlertMessage 
            variant="danger"
            closeCallback={handleCloseAlert} >
            Error deleting movie
          </AlertMessage>
        }
      </Card.Body>
    </Card>
  )
}

export default MovieCard