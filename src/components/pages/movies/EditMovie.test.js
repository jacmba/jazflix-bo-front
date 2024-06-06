import { useNavigate, useParams } from "react-router-dom"
import { retrieveSingleMovie, updateMovie } from "../../../services/movies-service"
import { fireEvent, render, screen } from "@testing-library/react"
import EditMovie from "./EditMovie"

jest.mock('react-router-dom')
const navigate = jest.fn()

jest.mock('../../../services/movies-service')

describe('Edit Movie', () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)
    useParams.mockReturnValue({id: 'abc123'})
    updateMovie.mockImplementation(jest.fn())
    retrieveSingleMovie.mockResolvedValue({
      id: 'abc123',
      image: 'http://foo.bar/test.png',
      title: 'Test Movie',
      description: 'A mocked test movie',
      extra: 'lorem,ipsum',
      video: 'test_movie.mp4'
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render container with header and form', async () => {
    render(<EditMovie />)

    const container = screen.queryByTestId('edit-movie-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')

    const {firstChild} = container
    expect(firstChild.innerHTML).toBe('Edit movie')

    expect(retrieveSingleMovie).toHaveBeenCalledWith('abc123')
    expect(retrieveSingleMovie).toHaveBeenCalledTimes(1)

    const form = await screen.findByTestId('movie-form-container')

    const {children} = container
    expect(children).toHaveLength(2)

    const [headerChild, formChild] = children
    expect(headerChild).toStrictEqual(firstChild)
    expect(formChild).toStrictEqual(form)

    const titleInput = screen.getByTestId('movie-form-title-input')
    expect(titleInput).toHaveValue('Test Movie')

    const imgInput = screen.getByTestId('movie-form-image-input')
    expect(imgInput).toHaveValue('http://foo.bar/test.png')

    const img = screen.getByTestId('movie-form-image')
    expect(img).toHaveAttribute('src', 'http://foo.bar/test.png')

    const descInput = screen.getByTestId('movie-form-description-input')
    expect(descInput).toHaveValue('A mocked test movie')

    const extraInput = screen.getByTestId('movie-form-extra-input')
    expect(extraInput).toHaveValue('lorem,ipsum')

    const videoInput = screen.getByTestId('movie-form-video-input')
    expect(videoInput).toHaveValue('test_movie.mp4')

    const button = screen.getByTestId('submit-button')
    expect(button.innerHTML).toBe('Update movie')
  })

  it('should update movie and navigate to movies list on success', async () => {
    render(<EditMovie />)

    await screen.findByTestId('movie-form-container')

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(updateMovie).toHaveBeenCalledWith({
      id: 'abc123',
      image: 'http://foo.bar/test.png',
      title: 'Test Movie',
      description: 'A mocked test movie',
      extra: 'lorem,ipsum',
      video: 'test_movie.mp4'
    })

    expect(navigate).toHaveBeenCalledWith('/movies')
  })

  it('should not take actions on failed form submission', async () => {
    render(<EditMovie />)

    await screen.findByTestId('movie-form-container')

    const titleInput = screen.getByTestId('movie-form-title-input')
    fireEvent.change(titleInput, {target: {value: ''}})

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(updateMovie).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})