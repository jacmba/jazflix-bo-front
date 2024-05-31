import { useEffect, useState } from "react"
import { deleteUser, retrieveUsers } from "../../../services/users-service"
import { Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Dialog from '../../common/Dialog'
import AlertMessage from '../../common/AlertMessage'

const Users = () => {
  const [users, setUsers] = useState([])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setDeleteUser] = useState({})

  const [alertMsg, setAlertMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const [hasErrors, setHasErrors] = useState(false)

  const navigate = useNavigate()

  const loadUsers = async () => {
    try {
      const result = await retrieveUsers()
      setUsers(result)
      setHasErrors(false)
    } catch (e) {
      console.error(e)
      setHasErrors(true)
      displayAlert('There was an error loading users list. Check logs and try again')
    }
  }

  const handleClose = () => setShowDeleteModal(false)
  const handleOpen = user => {
    setDeleteUser(user)
    setShowDeleteModal(true)
  }

  const hideAlert = () => setShowAlert(false)
  const displayAlert = msg => {
    setShowAlert(true)
    setAlertMsg(msg)
  }

  const requestUserDelete = async () => {
    const user = userToDelete
    handleClose()
    const deleted = await deleteUser(user.id)
    if (deleted) {
      setHasErrors(false)
      displayAlert(`User ${user.name} successfully deleted`)
      setUsers(
        users.filter(u => u.id !== user.id)
      )
    } else {
      setHasErrors(true)
      displayAlert(`Error deleting user ${user.name}. Check the logs and try again`)
    }
  }

  const addUser = () => navigate('/users/new')

  const editUser = id => navigate(`/users/${id}`)

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className="container" data-testid="users-list-container">
      <h1>List of app users</h1>
      <table className="mt-5 table table-stripped">
        <thead>
          <tr>
            <th>User name (email account)</th>
            <th>Is enabled?</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => <tr key={u.id}>
            <td data-testid="user-name-cell">{u.name}</td>
            <td>
              <input className="form-checck-input"
                data-testid="user-enabled"
                type="checkbox" disabled 
                checked={u.enabled !== false} />
            </td>
            <td>
              <button data-testid="user-edit" 
                className="btn btn-info"
                onClick={() => editUser(u.id)}>
                Edit
              </button>
            </td>
            <td>
              <button className="btn btn-danger" data-bs-toggle="modal"
                data-testid='user-delete'
                data-bs-target="#deleteModal" onClick={() => handleOpen(u)}>
                Delete
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
      
      {
        showAlert &&
        <AlertMessage
          variant={hasErrors ? 'danger' : 'success'}
          closeCallback={hideAlert}>
            {alertMsg}
        </AlertMessage>
      }

      {
        showDeleteModal && <Dialog
          title="Delete user"
          acceptCaption="Delete"
          acceptClass="danger"
          acceptCallback={requestUserDelete}
          cancelCallback={handleClose}>
            Are you sure you want to delete {userToDelete.name}?
        </Dialog>
      }

      <div className="mt-5">
        <button className="btn btn-success" onClick={addUser}>
          Add new user
        </button>
      </div>
    </div>
  )
}

export default Users