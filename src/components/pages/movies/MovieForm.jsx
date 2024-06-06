import { useState } from "react"
import { Button, Col, Form, FormGroup, Image, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const MovieForm = ({
  defaultImg,
  defaultTitle,
  defaultDescription,
  defaultExtra,
  defaultVideo,
  submitClass,
  submitLabel,
  submitCallback
}) => {

  const [image, setImage] = useState(defaultImg || '')
  const [title, setTitle] = useState(defaultTitle || '')
  const [description, setDescription] = useState(defaultDescription || '')
  const [extra, setExtra] = useState(defaultExtra || '')
  const [validated, setValidated] = useState(false)
  const [video, setVideo] = useState(defaultVideo || '')

  const navigate = useNavigate()

  const handleImgChange = evt => setImage(evt.target.value)
  const handleTitleChange = evt => setTitle(evt.target.value)
  const handleDescriptionChange = evt => setDescription(evt.target.value)
  const handleExtraChange = evt => setExtra(evt.target.value)
  const handleVideoChange = evt => setVideo(evt.target.value)

  const handleSubmit = evt => {
    const form = evt.currentTarget
    if (!form.checkValidity()) {
      evt.preventDefault()
      evt.stopPropagation()
      setValidated(true)
    } else {
      submitCallback({
        image,
        title,
        description,
        extra,
        video
      })

      navigate('/movies')
    }
  }

  return (
    <div className="container mt-5" data-testid="movie-form-container">
      <Form validated={validated} onSubmit={handleSubmit} noValidate>
        <Row>
          <Col>
            <Image
              src={image}
              width={300}
              data-testid="movie-form-image" />
          </Col>
          <FormGroup as={Col}>
            <Form.Label>
              Image
            </Form.Label>
            <Form.Control
              type="text"
              value={image}
              placeholder="http://yourimage.url"
              required
              onChange={handleImgChange}
              data-testid="movie-form-image-input" />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col}>
            <Form.Label>
              Title
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Your movie title"
              required
              onChange={handleTitleChange}
              data-testid="movie-form-title-input" />
          </FormGroup>
          <FormGroup as={Col}>
            <Form.Label>
              Description
            </Form.Label>
            <Form.Control
              type="textarea"
              value={description}
              rows={3}
              placeholder="Some optional description"
              onChange={handleDescriptionChange}
              data-testid="movie-form-description-input" />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col}>
            <Form.Label>
              Extra information
            </Form.Label>
            <Form.Control
              type="text"
              value={extra}
              placeholder="tag1,tag2..."
              onChange={handleExtraChange}
              data-testid="movie-form-extra-input" />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup as={Col}>
            <Form.Label>
              Video file
            </Form.Label>
            <Form.Control
              type="text"
              value={video}
              placeholder="your_movie.mp4"
              required
              onChange={handleVideoChange}
              data-testid="movie-form-video-input" />
          </FormGroup>
        </Row>
        <Button
          type="submit"
          variant={submitClass || 'primary'}
          data-testid="submit-button">
          {submitLabel || 'Submit'}
        </Button>
      </Form>
    </div>
  )
}

export default MovieForm