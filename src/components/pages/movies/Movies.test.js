import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Movies from "./Movies"
import { deleteMovie, retrieveAllMovies } from "../../../services/movies-service"
import { useNavigate } from "react-router-dom"

jest.mock('../../../services/movies-service')

jest.mock('react-router-dom')
const navigate = jest.fn()

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
        "image": "http://foo.bar/test2.jpg",
        "video": "test2.mp4",
        "extra": "movies,awesome"
      }
    ])

    deleteMovie.mockResolvedValue(true)

    useNavigate.mockImplementation(() => navigate)
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
    expect(grid).toHaveClass('container-fluid')
    expect(button).toHaveClass('btn-success')
    expect(button.innerHTML).toBe('Add new movie')

    expect(retrieveAllMovies).toHaveBeenCalledTimes(1)
  })

  it('should have 2 movie cards', async () => {
    render(<Movies />)

    const cards = await screen.findAllByTestId('movie-card')
    expect(cards).toHaveLength(2)

    const [title1, title2] = screen.getAllByTestId('movie-card-title')
    expect(title1.innerHTML).toBe('Mi test movie')
    expect(title2.innerHTML).toBe('Mi test movie 2')

    const [desc1, desc2] = screen.getAllByTestId('movie-card-description')
    expect(desc1.innerHTML).toBe('a test movie')
    expect(desc2.innerHTML).toBe('another test movie')

    const [img1, img2] = screen.getAllByTestId('movie-card-image')
    expect(img1).toHaveAttribute('src', 'http://foo.bar/test.jpg')
    expect(img2).toHaveAttribute('src', 'http://foo.bar/test2.jpg')
  })

  it('should remove card for deleted movie', async () => {
    render(<Movies />)

    const initialCards = await screen.findAllByTestId('movie-card')
    expect(initialCards).toHaveLength(2)

    const [deleteBtn] = screen.getAllByTestId('movie-card-delete-btn')
    fireEvent.click(deleteBtn)

    await screen.findByTestId('dialog-modal')
    const confirmBtn = screen.getByTestId('dialog-accept-btn')
    fireEvent.click(confirmBtn)

    await expect(deleteMovie).toHaveReturned()

    await waitFor(() => {
      expect(screen.getAllByTestId('movie-card')).toHaveLength(1)
    })
  })

  it('should navigate to new movie screen when clicking button', () => {
    render(<Movies />)

    const addBtn = screen.getByTestId('add-movie-btn')
    fireEvent.click(addBtn)

    expect(navigate).toHaveBeenCalledWith('/movies/new')
  })
})