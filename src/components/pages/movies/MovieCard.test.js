import { render, screen } from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import MovieCard from "./MovieCard"

jest.mock('react-router-dom')
const navigate = jest.fn()

describe('Movie Card', () => {

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render card component', () => {
    render(<MovieCard
      title="Test Movie"
      description="An awesome test movie"
      imgSrc="http://foo.bar/movie.png" />)

    const title = screen.queryByTestId('movie-card-title')
    const description = screen.queryByTestId('movie-card-description')
    const img = screen.queryByTestId('movie-card-image')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(img).toBeInTheDocument()

    expect(title.innerHTML).toBe('Test Movie')
    expect(description.innerHTML).toBe('An awesome test movie')
    expect(img).toHaveAttribute('src', 'http://foo.bar/movie.png')

    const editBtn = screen.queryByTestId('movie-card-edit-btn')
    const deleteBtn = screen.queryByTestId('movie-card-delete-btn')

    expect(editBtn).toBeInTheDocument()
    expect(deleteBtn).toBeInTheDocument()

    expect(editBtn.innerHTML).toBe('Edit')
    expect(deleteBtn.innerHTML).toBe('Delete')

    expect(editBtn).toHaveClass('btn-info')
    expect(deleteBtn).toHaveClass('btn-danger')
  })
})