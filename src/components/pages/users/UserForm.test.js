import { fireEvent, render, screen } from "@testing-library/react"
import UserForm from "./UserForm"
import { useNavigate } from "react-router-dom"

jest.mock('react-router-dom')
const navigate = jest.fn()

describe('UserForm', () => {

  beforeEach(()=> {
    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should display main container', () => {
    render(<UserForm />)

    const container = screen.getByTestId('user-form-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')
  })

  it('should display form inputs and submit button', () => {
    render(<UserForm />)

    const usernameInput = screen.queryByTestId('user-name-input')
    const enabledInput = screen.queryByTestId('user-enabled-input')
    const button = screen.queryByTestId('submit-button')

    expect(usernameInput).toBeInTheDocument()
    expect(enabledInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    expect(usernameInput).toHaveProperty('placeholder', 'Enter your email address')
    expect(usernameInput).toHaveProperty('required', true)
    expect(enabledInput).not.toBeChecked()
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('btn-primary')
    expect(button.innerHTML).toBe('Submit')
    expect(button).toHaveProperty('type', 'submit')
  })

  it('should have default value John Doe for username input', () => {
    render(<UserForm defaultName="John Doe" />)

    const input = screen.queryByTestId('user-name-input')
    expect(input).toHaveValue('John Doe')
  })

  it('user should be enabled by default', () => {
    render(<UserForm defaultEnabled="true" />)

    const input = screen.queryByTestId('user-enabled-input')
    expect(input).toBeChecked()
  })

  it('user validation feedback should be present', () => {
    render(<UserForm />)

    const feedback = screen.queryByTestId('user-name-feedback')
    expect(feedback).toBeInTheDocument()
    expect(feedback).toHaveClass('invalid-feedback')
    expect(feedback.innerHTML).toBe('Enter a valid email address')
  })
  
  it('submit button label should be "Test"', () => {
    render(<UserForm submitLabel="Test" />)

    const button = screen.queryByTestId('submit-button')
    expect(button.innerHTML).toBe('Test')
  })

  it('should update value on username input change', () => {
    render(<UserForm />)

    const input = screen.getByTestId('user-name-input')
    fireEvent.change(input, {target: {value: 'test@foo.bar'}})
    expect(input).toHaveValue('test@foo.bar')
  })

  it('should invoke callback and navigate to users list', () => {
    const callback = jest.fn()

    render(<UserForm cb={callback} />)

    const input = screen.getByTestId('user-name-input')
    const slider = screen.getByTestId('user-enabled-input')
    const button = screen.getByTestId('submit-button')

    fireEvent.change(input, {target: {value: 'test@foo.bar'}})
    fireEvent.click(slider)
    fireEvent.click(button)

    expect(callback).toHaveBeenCalledWith('test@foo.bar', true)
    expect(navigate).toHaveBeenCalledWith('/users')
  })

  it('invalid form should not perform actions', () => {
    const callback = jest.fn()

    render(<UserForm defaultName="wrong-address" cb={callback} />)

    const button = screen.getByTestId('submit-button')
    fireEvent.click(button)

    expect(callback).not.toHaveBeenCalled()
    expect(navigate).not.toHaveBeenCalled()
  })
})