import { useNavigate } from "react-router-dom"
import { createMovie } from "../../../services/movies-service"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import NewMovie from "./NewMovie"

jest.mock('react-router-dom')
const navigate = jest.fn()

jest.mock('../../../services/movies-service')

describe('New Movie', () => {

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)

    createMovie.mockResolvedValue({
      id: 'abc123',
      title: 'Test Movie',
      description: 'A mocked test movie',
      extra: 'lorem,ipsum',
      video: 'test_movie.mp4'
    })

    jest.spyOn(console, 'log')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render container with header and form', () => {
    render(<NewMovie />)

    const container = screen.queryByTestId('new-movie-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')

    const {children} = container
    expect(children).toHaveLength(2)

    const [header, form] = children

    expect(header.innerHTML).toBe('Enter movie data')

    const formRef = screen.queryByTestId('movie-form-container')
    expect(formRef).toBeInTheDocument()
    expect(formRef).toStrictEqual(form)

    const createBtn = screen.queryByTestId('submit-button')
    expect(createBtn).toBeInTheDocument()
    expect(createBtn.innerHTML).toBe('Create movie')
    expect(createBtn).toHaveClass('btn-primary')
  })

  it('should save movie and navigate to movies list on success', async () => {
    render(<NewMovie />)

    const titleInput = screen.getByTestId('movie-form-title-input')
    fireEvent.change(titleInput, {target: {value: 'Test movie'}})

    const imageInput = screen.getByTestId('movie-form-image-input')
    fireEvent.change(imageInput, {target: {value: 'http://foo.bar/test.png'}})

    const videoInput = screen.getByTestId('movie-form-video-input')
    fireEvent.change(videoInput, {target: {value: 'test.mp4'}})

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(createMovie).toHaveBeenCalledWith({
      title: 'Test movie',
      image: 'http://foo.bar/test.png',
      description: '',
      extra: '',
      video: 'test.mp4'
    })

    expect(navigate).toHaveBeenCalledWith('/movies')

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith({
        id: 'abc123',
        title: 'Test Movie',
        description: 'A mocked test movie',
        extra: 'lorem,ipsum',
        video: 'test_movie.mp4'
      })
    })
  })
})