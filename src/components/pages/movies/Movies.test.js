import { render, screen } from "@testing-library/react"
import Movies from "./Movies"
import { retrieveAllMovies } from "../../../services/movies-service"

jest.mock('../../../services/movies-service')

describe('Movies List', () => {

  beforeEach(() => {
    retrieveAllMovies.mockResolvedValue([
      {
        "id": "61e81",
        "title": "Mi test movie",
        "description": "a test movie",
        "image": "http://foo.bar/test.jpg",
        "video": "test.mp4",
        "extra": "movies,awesome"
      },
      {
        "id": "61e82",
        "title": "Mi test movie 2",
        "description": "another test movie",
        "image": "http://foo.bar/test.jpg",
        "video": "test.mp4",
        "extra": "movies,awesome"
      }
    ])
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render movies list container with header and button', () => {
    render(<Movies />)

    const container = screen.queryByTestId('movies-list-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')

    const {children} = container
    expect(children).toHaveLength(3)

    const [header, grid, button] = children

    expect(header.innerHTML).toBe('List of movies')
    expect(button.innerHTML).toBe('Add new movie')
    expect(button).toHaveClass('btn-success')

    expect(retrieveAllMovies).toHaveBeenCalledTimes(1)
  })
})