import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { retrieveSingleMovie, updateMovie } from "../../../services/movies-service"
import MovieForm from "./MovieForm"

const EditMovie = () => {

  const {id} = useParams()

  const [movie, setMovie] = useState({})
  const [loaded, setLoaded] = useState(false)

  const loadMovie = async () => {
    const result = await retrieveSingleMovie(id)
    if (result) {
      setLoaded(true)
      setMovie(result)
    }
  }

  const handleSubmit = movie => {
    updateMovie({id, ...movie})
  }

  useEffect(() => {
    loadMovie()
  }, [])

  return (
    <div className="container mt-5" data-testid="edit-movie-container">
      <h1>Edit movie</h1>

      {
        loaded &&
        <MovieForm
          defaultTitle={movie.title}
          defaultImg={movie.image}
          defaultDescription={movie.description}
          defaultExtra={movie.extra}
          defaultVideo={movie.video}
          submitLabel="Update movie"
          submitCallback={handleSubmit} />
      }
    </div>
  )
}

export default EditMovie