import { fireEvent, render, screen } from "@testing-library/react"
import EditSection from "./EditSection"
import { retrieveSingleSection, updateSection } from "../../../services/sections-service"
import { useNavigate, useParams } from "react-router-dom"

jest.mock('react-router-dom')
const navigate = jest.fn()

jest.mock('../../../services/sections-service')

describe('Edit Section', () => {

  beforeEach(() => {
    retrieveSingleSection.mockResolvedValue({
      id: 'abc123',
      icon: 'test-icon',
      title: 'Test Section',
      to: '/sections/to',
      order: 1
    })

    updateSection.mockResolvedValue(true)

    useNavigate.mockImplementation(() => navigate)

    useParams.mockReturnValue({id: 'abc123'})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render component with header and form', async () => {
    render(<EditSection />)

    const container = screen.queryByTestId('edit-section-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')

    const {children} = container
    const [header] = children

    expect(children).toHaveLength(1)
    expect(header.innerHTML).toBe('Edit section')

    expect(retrieveSingleSection).toHaveBeenCalledWith('abc123')
    expect(retrieveSingleSection).toHaveBeenCalledTimes(1)

    await screen.findByTestId('section-form-container')

    const iconInput = screen.getByTestId('section-icon-input')
    expect(iconInput).toHaveValue('test-icon')

    const titleInput = screen.getByTestId('section-title-input')
    expect(titleInput).toHaveValue('Test Section')

    const linkInput = screen.getByTestId('section-link-input')
    expect(linkInput).toHaveValue('/sections/to')

    const orderInput = screen.getByTestId('section-order-input')
    expect(orderInput).toHaveValue(1)

    const button = screen.getByTestId('submit-button')
    expect(button.innerHTML).toBe('Update section')
  })

  it('should save section on valid submit', async () => {
    render(<EditSection />)

    await screen.findByTestId('section-form-container')

    const iconInput = screen.getByTestId('section-icon-input')
    fireEvent.change(iconInput, {target: {value: 'changed-icon'}})

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(updateSection).toHaveBeenCalledWith({
      id: 'abc123',
      icon: 'changed-icon',
      title: 'Test Section',
      to: '/sections/to',
      order: 1
    })

    expect(navigate).toHaveBeenCalledWith('/sections')
  })

  it('should not save section on invalid submit', async () => {
    render(<EditSection />)

    await screen.findByTestId('section-form-container')

    const iconInput = screen.getByTestId('section-icon-input')
    fireEvent.change(iconInput, {target: {value: ''}})

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(updateSection).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})