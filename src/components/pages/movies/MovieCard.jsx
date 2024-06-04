import { Button, Card, Col, Row } from "react-bootstrap"

const MovieCard = ({
  id,
  imgSrc,
  title,
  description
}) => {

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
              data-testid="movie-card-edit-btn">
              Edit
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              data-testid="movie-card-delete-btn">
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default MovieCard