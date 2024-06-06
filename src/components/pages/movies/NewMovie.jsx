import { createMovie } from "../../../services/movies-service"
import MovieForm from "./MovieForm"

const NewMovie = () => {

  const handleSubmit = async movie => {
    const result = await createMovie(movie)
    if (result) {
      console.log(result)
    }
  }

  return (
    <div className="container mt-5" data-testid="new-movie-container">
      <h1>Enter movie data</h1>
      <MovieForm
        submitLabel="Create movie"
        submitCallback={handleSubmit} />
    </div>
  )
}

export default NewMovie