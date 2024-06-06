import { fireEvent, render, screen } from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import MovieForm from "./MovieForm"

jest.mock('react-router-dom')
const navigate = jest.fn()

describe('Movie Form', () => {

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render form', () => {
    render(<MovieForm />)

    const container = screen.queryByTestId('movie-form-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')

    const img = screen.queryByTestId('movie-form-image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '')

    const imgInput = screen.queryByTestId('movie-form-image-input')
    expect(imgInput).toBeInTheDocument()
    expect(imgInput).toHaveValue('')
    expect(imgInput).toHaveAttribute('placeholder', 'http://yourimage.url')
    expect(imgInput).toHaveAttribute('required')

    const titleInput = screen.queryByTestId('movie-form-title-input')
    expect(titleInput).toBeInTheDocument()
    expect(titleInput).toHaveAttribute('type', 'text')
    expect(titleInput).toHaveValue('')
    expect(titleInput).toHaveAttribute('placeholder', 'Your movie title')
    expect(titleInput).toHaveAttribute('required')

    const descriptionInput = screen.queryByTestId('movie-form-description-input')
    expect(descriptionInput).toBeInTheDocument()
    expect(descriptionInput).toHaveValue('')
    expect(descriptionInput).toHaveAttribute('type', 'textarea')
    expect(descriptionInput).toHaveAttribute('placeholder', 'Some optional description')
    expect(descriptionInput).not.toHaveAttribute('required')

    const extraInput = screen.queryByTestId('movie-form-extra-input')
    expect(extraInput).toBeInTheDocument()
    expect(extraInput).toHaveValue('')
    expect(extraInput).toHaveAttribute('type', 'text')
    expect(extraInput).toHaveAttribute('placeholder', 'tag1,tag2...')
    expect(extraInput).not.toHaveAttribute('required')

    const viedeoInput = screen.queryByTestId('movie-form-video-input')
    expect(viedeoInput).toBeInTheDocument()
    expect(viedeoInput).toHaveAttribute('type', 'text')
    expect(viedeoInput).toHaveAttribute('placeholder', 'your_movie.mp4')
    expect(viedeoInput).toHaveAttribute('required')

    const submitBtn = screen.queryByTestId('submit-button')
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute('type', 'submit')
    expect(submitBtn).toHaveClass('btn-primary')
    expect(submitBtn.innerHTML).toBe('Submit')
  })

  it('should render form with provided props', () => {
    render(<MovieForm
      defaultImg="http://foo.bar/test.png"
      defaultTitle="Test Movie"
      defaultDescription="This is an awesome test film"
      defaultExtra="lorem,ipsum"
      defaultVideo="test_movie.mp4"
      submitClass="warning"
      submitLabel="Click here!" />)

    const img = screen.getByTestId('movie-form-image')
    expect(img).toHaveProperty('src', 'http://foo.bar/test.png')

    const imgInput = screen.getByTestId('movie-form-image-input')
    expect(imgInput).toHaveValue('http://foo.bar/test.png')

    const titleInput = screen.getByTestId('movie-form-title-input')
    expect(titleInput).toHaveValue('Test Movie')

    const descriptionInput = screen.getByTestId('movie-form-description-input')
    expect(descriptionInput).toHaveValue('This is an awesome test film')

    const extraInput = screen.getByTestId('movie-form-extra-input')
    expect(extraInput).toHaveValue('lorem,ipsum')

    const videoInput = screen.getByTestId('movie-form-video-input')
    expect(videoInput).toHaveValue('test_movie.mp4')

    const submitBtn = screen.getByTestId('submit-button')
    expect(submitBtn).toHaveClass('btn-warning')
    expect(submitBtn.innerHTML).toBe('Click here!')
  })

  it('should invoke callback and navigate to list on successful submission', () => {
    const callback = jest.fn()

    render(<MovieForm
      defaultImg="http://foo.bar/test.png"
      defaultTitle="Test Movie"
      defaultVideo="test_video.mp4"
      submitCallback={callback} />)

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(callback).toHaveBeenCalledWith({
      image: 'http://foo.bar/test.png',
      title: 'Test Movie',
      description: '',
      extra: '',
      video: 'test_video.mp4'
    })

    expect(navigate).toHaveBeenCalledWith('/movies')
  })

  it('should not trigger actions on invalid submission', () => {
    const callback = jest.fn()

    render(<MovieForm submitCallback={callback} />)

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(callback).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})