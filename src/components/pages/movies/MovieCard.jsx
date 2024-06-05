import { Button, Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { deleteMovie } from "../../../services/movies-service"
import AlertMessage from "../../common/AlertMessage"
import { useState } from "react"

const MovieCard = ({
  id,
  imgSrc,
  title,
  description,
  onDelete
}) => {

  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const handleEdit = () => {
    navigate('/movies/' + id)
  }

  const handleDelete = async () => {
    const result = await deleteMovie(id)
    if (result) {
      onDelete(id)
    } else {
      setShowError(true)
    }
  }

  const handleCloseAlert = () => setShowError(false)

  return (
    <Card>
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