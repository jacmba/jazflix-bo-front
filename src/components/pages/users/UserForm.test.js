import { render, screen } from "@testing-library/react"
import UserForm from "./UserForm"

describe('UserForm', () => {

  it('should display main container', () => {
    render(<UserForm />)

    const container = screen.getByTestId('user-form-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')
  })

  it('should display form inputs', () => {
    render(<UserForm />)

    const usernameInput = screen.getByTestId('user-name-input')
    const enabledInput = screen.getByTestId('user-enabled-input')
  })
})