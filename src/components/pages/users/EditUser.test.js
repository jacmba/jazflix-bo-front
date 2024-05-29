import { useNavigate, useParams } from "react-router-dom"
import { retrieveUser, updateUser } from "../../../services/users-service"
import { fireEvent, render, screen } from "@testing-library/react"
import EditUser from "./EditUser"

jest.mock('react-router-dom')
const navigate = jest.fn()

jest.mock('../../../services/users-service')

describe('EditUser', () => {
  
  beforeEach(() => {
    useNavigate.mockImplementation(() => navigate)
    useParams.mockReturnValue({id: 'abc123'})
    updateUser.mockImplementation(jest.fn())
    retrieveUser.mockResolvedValue({
      id: 'abc123',
      name: 'test@foo.bar',
      enabled: null
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should display main container', () => {
    render(<EditUser />)

    const container = screen.queryByTestId('edit-user-container')
    expect(container).toBeInTheDocument()
  })

  it('should read path params', () => {
    render(<EditUser />)

    expect(useParams).toHaveBeenCalled()
  })

  it('should retrieve user info', () => {
    render(<EditUser />)

    expect(retrieveUser).toHaveBeenCalledWith('abc123')
  })

  it('submit button should have lavel "Update user"', async () => {
    render(<EditUser />)

    const button = await screen.findByTestId('submit-button')
    expect(button.innerHTML).toBe('Update user')
  })

  it('name input should have default value "test@foo.bar"', async () => {
    render(<EditUser />)

    const input = await screen.findByTestId('user-name-input')
    expect(input).toHaveValue('test@foo.bar')
  })

  it('enabled switch should be checked', async () => {
    render(<EditUser />)

    const slider = await screen.findByTestId('user-enabled-input')
    expect(slider).toBeChecked()
  })

  it('should call update user on valid submit', async () => {
    render(<EditUser />)

    const input = await screen.findByTestId('user-name-input')
    const button = screen.getByTestId('submit-button')

    fireEvent.change(input, {target: {value: 'john.doe@lorem.ips'}})
    fireEvent.click(button)

    expect(updateUser).toHaveBeenCalledWith({
      id: 'abc123',
      name: 'john.doe@lorem.ips',
      enabled: true
    })
    expect(navigate).toHaveBeenCalledWith('/users')
  })
})