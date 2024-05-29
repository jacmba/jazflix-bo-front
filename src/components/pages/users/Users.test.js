import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { retrieveUsers, deleteUser } from "../../../services/users-service"
import Users from "./Users"
import { useNavigate } from "react-router-dom"

jest.mock('../../../services/users-service')
jest.mock('react-router-dom')

const navigate = jest.fn()

describe('Test Users component', () => {
  beforeEach(() => {
    retrieveUsers.mockResolvedValue([
      {id: '1', name: 'john@foo.bar', enabled: true},
      {id: '2', name: 'jane@foo.bar', enabled: null}
    ])

    deleteUser.mockImplementation(async id => {
      return id === '1'
    })

    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Should render list with 2 users', async () => {
    render(<Users />)

    const addButton = screen.queryByText('Add new user')
    expect(addButton).toBeInTheDocument()

    const userCells = await screen.findAllByTestId('user-name-cell')
    const [userCell1, userCell2] = userCells

    expect(userCells.length).toBe(2)
    expect(userCell1).toBeInTheDocument()
    expect(userCell2).toBeInTheDocument()
    expect(userCell1.innerHTML).toBe('john@foo.bar')
    expect(userCell2.innerHTML).toBe('jane@foo.bar')

    const userEnabled = await screen.findAllByTestId('user-enabled')
    const [userEnabled1, userEnabled2] = userEnabled

    expect(userEnabled.length).toBe(2)
    expect(userEnabled1).toBeInTheDocument()
    expect(userEnabled2).toBeInTheDocument()
    expect(userEnabled1).toBeDisabled()
    expect(userEnabled2).toBeDisabled()
    expect(userEnabled1).toBeChecked()
    expect(userEnabled2).toBeChecked()

    const editButtons = await screen.findAllByTestId('user-edit')
    const [editButton1, editButton2] = editButtons

    expect(editButton1).toBeInTheDocument()
    expect(editButton2).toBeInTheDocument()
    expect(editButtons.length).toBe(2)

    const deleteButtons = await screen.findAllByTestId('user-delete')
    const [deleteButton1, deleteButton2] = deleteButtons

    expect(deleteButtons.length).toBe(2)
    expect(deleteButton1).toBeInTheDocument()
    expect(deleteButton2).toBeInTheDocument()
    expect(deleteButton1.innerHTML).toBe('Delete')
    expect(deleteButton2.innerHTML).toBe('Delete')

    expect(retrieveUsers).toHaveBeenCalled()
  })

  it('Should display modal window when click on delete user', async () => {
    render(<Users />)

    const [deleteButton1, deleteButton2] = 
      await screen.findAllByTestId('user-delete')

    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument()
    
    fireEvent.click(deleteButton1)

    const modal1 = await screen.findByTestId('delete-modal')
    expect(modal1).toBeInTheDocument()

    const cancel1 = await screen.findByTestId('delete-close-btn')
    fireEvent.click(cancel1)
    await waitFor(() => {
      expect(modal1).not.toBeInTheDocument()
    })
    expect(cancel1).not.toBeInTheDocument()

    fireEvent.click(deleteButton2)

    const modal2 = await screen.findByTestId('delete-modal')
    expect(modal2).toBeInTheDocument()

    const cancel2 = await screen.findByTestId('delete-close-btn')
    fireEvent.click(cancel2)
    await waitFor(() => {
      expect(modal2).not.toBeInTheDocument()
    })
    expect(cancel2).not.toBeInTheDocument()
  })

  it('Delete user 1 should display success alert', async () => {
    render(<Users />)

    const [deleteBtn,] = await screen.findAllByTestId('user-delete')

    expect(screen.queryByTestId('success-alert')).not.toBeInTheDocument()

    fireEvent.click(deleteBtn)
    const modal = await screen.findByTestId('delete-modal')
    const confirm = screen.queryByTestId('delete-confirm-btn')

    fireEvent.click(confirm)
    const alertWin = await screen.findByTestId('success-alert')

    await waitFor(() => {
      expect(modal).not.toBeInTheDocument()
    })
    
    expect(alertWin).toHaveClass('alert-success')
    expect(alertWin.innerHTML).toContain('User john@foo.bar successfully deleted')
  })

  it('Delete user 2 should display error alert', async() => {
    render(<Users />)

    const [, deleteBtn] = await screen.findAllByTestId('user-delete')

    expect(screen.queryByTestId('error-alert')).not.toBeInTheDocument()

    fireEvent.click(deleteBtn)
    const modal = await screen.findByTestId('delete-modal')
    const confirm = screen.queryByTestId('delete-confirm-btn')

    fireEvent.click(confirm)
    const alertWin = await screen.findByTestId('error-alert')

    await waitFor(() => {
      expect(modal).not.toBeInTheDocument()
    })

    expect(alertWin).toHaveClass('alert-danger')
    expect(alertWin.innerHTML).toContain('Error deleting user jane@foo.bar')
  })

  it('Add new user should navigate to new user route', async () => {
    render(<Users />)

    const addButton = screen.queryByText('Add new user')
    const container = screen.queryByTestId('users-list-container')
    
    expect(addButton).toBeInTheDocument()
    expect(container).toBeInTheDocument()

    fireEvent.click(addButton)

    expect(navigate).toHaveBeenCalledWith('/users/new')
  })

  it('Edit user should navigate to edit user route', async () => {
    render(<Users />)

    const [editButton1, editButton2] = await screen.findAllByTestId('user-edit')

    fireEvent.click(editButton1)
    expect(navigate).toHaveBeenCalledWith('/users/1')

    fireEvent.click(editButton2)
    expect(navigate).toHaveBeenCalledWith('/users/2')
  })
})