import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { retrieveAllMovies } from "../../../services/movies-service"
import MovieCard from "./MovieCard"

const Movies = () => {

  const [movies, setMovies] = useState([])

  const loadMovies = async () => {
    const data = await retrieveAllMovies()
    if (data) {
      setMovies(data)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <div className="container mt-5" data-testid="movies-list-container">
      <h1>List of movies</h1>

      <Container data-testid="movies-grid" fluid>
        <Row>
          {
            movies.map(m => (
              <Col sm={6}>
                <MovieCard
                  id={m.id}
                  title={m.title}
                  description={m.description}
                  imgSrc={m.image} />
              </Col>
            ))
          }
        </Row>
      </Container>

      <Button variant="success">
        Add new movie
      </Button>
    </div>
  )
}

export default Movies