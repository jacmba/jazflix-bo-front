import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import MovieCard from "./MovieCard"
import { deleteMovie } from "../../../services/movies-service"

jest.mock('react-router-dom')
const navigate = jest.fn()

jest.mock('../../../services/movies-service')

describe('Movie Card', () => {

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)

    deleteMovie.mockResolvedValue(true)
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

    const alertMsg = screen.queryByTestId('message-alert')
    expect(alertMsg).not.toBeInTheDocument()

    const dialog = screen.queryByTestId('dialog-modal')
    expect(dialog).not.toBeInTheDocument()
  })

  it('should navigate to movie edit screen when clicking edit button', () => {
    render(<MovieCard id="abc123" />)

    const button = screen.getByTestId('movie-card-edit-btn')
    fireEvent.click(button)

    expect(navigate).toHaveBeenCalledWith('/movies/abc123')
  })

  it('should invoke movie delete and callback when clicking delete button', async () => {
    const handleDelete = jest.fn()

    render(<MovieCard
      id="abc123"
      title="Test Movie"
      onDelete={handleDelete} />)

    const button = screen.getByTestId('movie-card-delete-btn')
    fireEvent.click(button)

    const dialog = await screen.findByTestId('dialog-modal')

    const dlgTitle = screen.getByTestId('dialog-title')
    expect(dlgTitle.innerHTML).toBe('Delete movie')

    const dlgText = screen.getByTestId('dialog-text')
    expect(dlgText.innerHTML).toBe('Are you sure you want to delete Test Movie?')

    const deleteBtn = screen.getByTestId('dialog-accept-btn')
    expect(deleteBtn.innerHTML).toBe('Delete')
    expect(deleteBtn).toHaveClass('btn-danger')
    fireEvent.click(deleteBtn)

    expect(deleteMovie).toHaveBeenCalledWith('abc123')
    await waitFor(() => {
      expect(handleDelete).toHaveBeenCalledWith('abc123')
    })

    expect(dialog).not.toBeInTheDocument()
  })

  it('should show alert on error while deleting movie', async () => {
    deleteMovie.mockResolvedValue(false)

    const handleDelete = jest.fn()

    render(<MovieCard
      id="abc123"
      onDelete={handleDelete}
    />)

    const button = screen.getByTestId('movie-card-delete-btn')
    fireEvent.click(button)

    const dialog = await screen.findByTestId('dialog-modal')

    const deleteBtn = screen.getByTestId('dialog-accept-btn')
    fireEvent.click(deleteBtn)

    expect(deleteMovie).toHaveBeenCalledWith('abc123')

    const alertMsg = await screen.findByTestId('message-alert')
    expect(alertMsg).toHaveClass('alert-danger')
    expect(alertMsg.innerHTML).toContain('Error deleting movie')

    expect(handleDelete).not.toHaveBeenCalled()

    expect(dialog).not.toBeInTheDocument()
  })

  it('should close dialog when cancelling', async () => {
    render(<MovieCard />)

    const deleteBtn = screen.getByTestId('movie-card-delete-btn')
    fireEvent.click(deleteBtn)

    const dialog = await screen.findByTestId('dialog-modal')

    const cancelBtn = screen.getByTestId('dialog-close-btn')
    fireEvent.click(cancelBtn)

    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument()
    })
  })
})