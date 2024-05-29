import { fireEvent, render, screen } from "@testing-library/react"
import NewUser from "./NewUser"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../../services/users-service"

jest.mock('react-router-dom')
const navigate = jest.fn()

jest.mock('../../../services/users-service')

describe('NewUser', () => {

  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)

    createUser.mockImplementation(jest.fn())
  })

  it('should display main container', () => {
    render(<NewUser />)

    const container = screen.queryByTestId('new-user-container')
    expect(container).toBeInTheDocument()
  })

  it('should have empty input and checked slider by default', () => {
    render(<NewUser />)

    const input = screen.getByTestId('user-name-input')
    const slider = screen.getByTestId('user-enabled-input')

    expect(input).toHaveDisplayValue('')
    expect(slider).toBeChecked()
  })

  it('submit button should have lavel "Create user"', () => {
    render(<NewUser />)

    const button = screen.getByTestId('submit-button')
    expect(button.innerHTML).toBe('Create user')
  })

  it('should call create user endpoint on valid submit', () => {
    render(<NewUser />)

    const input = screen.getByTestId('user-name-input')
    const button = screen.getByTestId('submit-button')

    fireEvent.change(input, {target: {value: 'test@foo.bar'}})
    fireEvent.click(button)

    expect(createUser).toHaveBeenCalledWith({
      name: 'test@foo.bar',
      enabled: true
    })

    expect(navigate).toHaveBeenCalledWith('/users')
  })
})