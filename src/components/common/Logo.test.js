import { render, screen } from "@testing-library/react"
import Logo from "./Logo"

jest.mock('react-router-dom')

describe('Logo', () => {

  it('Should render jazfliz logo', () => {
    render(<Logo />)
    const container = screen.queryByTestId('logo-container')
    expect(container).toBeInTheDocument()
  })
})