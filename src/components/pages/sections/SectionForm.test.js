import { fireEvent, render, screen } from "@testing-library/react"
import SectionForm from "./SectionForm"
import { useNavigate } from "react-router-dom"

jest.mock('react-router-dom')
const navigate = jest.fn()

describe('Section Form', () => {

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render form container and have default values', () => {
    render(<SectionForm />)

    const container = screen.queryByTestId('section-form-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')

    const iconGroup = screen.queryByTestId('form-icon')
    expect(iconGroup).toBeInTheDocument()

    const titleGroup = screen.queryByTestId('form-title')
    expect(titleGroup).toBeInTheDocument()

    const linkGroup = screen.queryByTestId('form-link')
    expect(linkGroup).toBeInTheDocument()

    const orderGroup = screen.queryByTestId('form-order')
    expect(orderGroup).toBeInTheDocument()

    const iconInput = screen.queryByTestId('section-icon-input')
    expect(iconInput).toBeInTheDocument()
    expect(iconInput).toHaveValue('')
    expect(iconInput).toHaveAttribute('type', 'text')
    expect(iconInput).toHaveAttribute('required')
    expect(iconInput).toHaveAttribute('placeholder', 'Enter icon reference')

    const titleInput = screen.queryByTestId('section-title-input')
    expect(titleInput).toBeInTheDocument()
    expect(titleInput).toHaveValue('')
    expect(titleInput).toHaveAttribute('type', 'text')
    expect(titleInput).toHaveAttribute('required')
    expect(titleInput).toHaveAttribute('placeholder', 'Enter section title')

    const linkInput = screen.queryByTestId('section-link-input')
    expect(linkInput).toBeInTheDocument()
    expect(linkInput).toHaveValue('')
    expect(linkInput).toHaveAttribute('type', 'text')
    expect(linkInput).toHaveAttribute('required')
    expect(linkInput).toHaveAttribute('placeholder', 'Enter relative link')

    const orderInput = screen.queryByTestId('section-order-input')
    expect(orderInput).toBeInTheDocument()
    expect(orderInput).toHaveValue(999)
    expect(orderInput).toHaveAttribute('type', 'number')
    expect(orderInput).toHaveAttribute('required')
    expect(orderInput).not.toHaveAttribute('placeholder')

    const submitBtn = screen.queryByTestId('submit-button')
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn.innerHTML).toBe('Submit')

    const iconFeedback = screen.queryByTestId('section-icon-feedback')
    expect(iconFeedback).toBeInTheDocument()
    expect(iconFeedback.innerHTML).toBe('Please provide a section icon reference')

    const titleFeedback = screen.queryByTestId('section-title-feedback')
    expect(titleFeedback).toBeInTheDocument()
    expect(titleFeedback.innerHTML).toBe('Please provide a title')

    const linkFeedback = screen.queryByTestId('section-link-feedback')
    expect(linkFeedback).toBeInTheDocument()
    expect(linkFeedback.innerHTML).toBe('Please provide a relative link')

    const orderFeedback = screen.queryByTestId('section-order-feedback')
    expect(orderFeedback).toBeInTheDocument()
    expect(orderFeedback.innerHTML).toBe('Please set the order')
  })

  it('should render form with provided values', () => {
    render(<SectionForm
      defaultIcon="test-icon"
      defaultTitle="Test Form"
      defaultLinkTo="/sections/test"
      submitLabel="Save section"
      defaultOrder="1" />)

    const iconInput = screen.getByTestId('section-icon-input')
    expect(iconInput).toHaveValue('test-icon')

    const titleInput = screen.getByTestId('section-title-input')
    expect(titleInput).toHaveValue('Test Form')

    const linkInput = screen.getByTestId('section-link-input')
    expect(linkInput).toHaveValue('/sections/test')

    const orderInput = screen.getByTestId('section-order-input')
    expect(orderInput).toHaveValue(1)

    const submitBtn = screen.getByTestId('submit-button')
    expect(submitBtn.innerHTML).toBe('Save section')
  })

  it('should navigate to sections list screen on valid submit', () => {
    const callback = jest.fn()

    render(<SectionForm
      defaultIcon="test-icon"
      defaultTitle="Test Form"
      defaultLinkTo="/sections/test"
      defaultOrder="1"
      submitCallback={callback} />)

    const submitBtn = screen.getByTestId('submit-button')
    fireEvent.click(submitBtn)

    expect(callback).toHaveBeenCalledWith({
      icon: 'test-icon',
      title: 'Test Form',
      to: '/sections/test',
      order: 1
    })

    expect(navigate).toHaveBeenCalledWith('/sections')
  })

  it('should not navigate out on invalid submit', () => {
    const callback = jest.fn()

    render(<SectionForm
      submitCallback={callback} />
    )

    const submitBtn = screen.getByTestId('submit-button')
    fireEvent.click(submitBtn)

    expect(callback).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})