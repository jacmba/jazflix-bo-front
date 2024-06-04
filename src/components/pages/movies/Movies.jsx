import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { retrieveAllMovies } from "../../../services/movies-service"

const Movies = () => {

  const [movies, setMovies] = useState([])
  const [loaded, setLoaded] = useState(false)

  const loadMovies = async () => {
    const data = await retrieveAllMovies()
    if (data) {
      setMovies(data)
      setLoaded(true)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <div className="container mt-5" data-testid="movies-list-container">
      <h1>List of movies</h1>

      <div data-testid="movies-grid"></div>

      <Button variant="success">
        Add new movie
      </Button>
    </div>
  )
}

export default Movies