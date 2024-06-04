import { fireEvent, render, screen } from "@testing-library/react"
import NewSection from "./NewSection"
import { useNavigate } from "react-router-dom"
import { createSection } from "../../../services/sections-service"

jest.mock('react-router-dom')
const navigate = jest.fn()

jest.mock('../../../services/sections-service')

describe('New Section', () => {

  beforeEach(() => {
    createSection.mockResolvedValue({
      id: 'abc123'
    })
    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render New Section screen with form', () => {
    render(<NewSection />)

    const container = screen.queryByTestId('new-section-container')
    expect(container).toBeInTheDocument()

    const {children} = container
    expect(children).toHaveLength(2)

    const [header] = children
    
    expect(header.innerHTML).toBe('Enter section data')
    
    const submitBtn = screen.queryByTestId('submit-button')
    expect(submitBtn.innerHTML).toBe('Create section')
  })

  it('should invoke update section when clicking on submit button', () => {
    render(<NewSection />)

    const iconInput = screen.getByTestId('section-icon-input')
    fireEvent.change(iconInput, {target: {value: 'test-icon'}})

    const titleInput = screen.getByTestId('section-title-input')
    fireEvent.change(titleInput, {target: {value: 'Test Section'}})

    const linkInput = screen.getByTestId('section-link-input')
    fireEvent.change(linkInput, {target: {value: '/sections/test'}})

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(createSection).toHaveBeenCalledWith({
      icon: 'test-icon',
      title: 'Test Section',
      to: '/sections/test',
      order: 999
    })

    expect(navigate).toHaveBeenCalledWith('/sections')
  })

  it('should not create section on invalid input', () => {
    render(<NewSection />)

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(createSection).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})