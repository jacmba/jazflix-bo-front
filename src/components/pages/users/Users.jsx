import { useEffect, useState } from "react"
import { deleteUser, retrieveUsers } from "../../../services/users-service"
import { Alert, Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Users = () => {
  const [users, setUsers] = useState([])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setDeleteUser] = useState({})

  const [successAlertMsg, setSuccessAlertMsg] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const [errorAlertMsg, setErrorAlertMsg] = useState('')
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const navigate = useNavigate()

  const loadUsers = async () => {
    try {
      const result = await retrieveUsers()
      setUsers(result)
    } catch (e) {
      console.error(e)
      displayErrorAlert('There was an error loading users list. Check logs and try again')
    }
  }

  const handleClose = () => setShowDeleteModal(false)
  const handleOpen = user => {
    setDeleteUser(user)
    setShowDeleteModal(true)
  }

  const hideSuccessAlert = () => setShowSuccessAlert(false)
  const displaySuccessAlert = msg => {
    setSuccessAlertMsg(msg)
    setShowSuccessAlert(true)
  }

  const hideErrorAlert = () => setShowErrorAlert(false)
  const displayErrorAlert = msg => {
    setErrorAlertMsg(msg)
    setShowErrorAlert(true)
  }

  const requestUserDelete = async () => {
    const user = userToDelete
    handleClose()
    const deleted = await deleteUser(user.id)
    if (deleted) {
      displaySuccessAlert(`User ${user.name} successfully deleted`)
      setUsers(
        users.filter(u => u.id !== user.id)
      )
    } else {
      displayErrorAlert(`Error deleting user ${user.name}. Check the logs and try again`)
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
      <Alert key={'successAlert'} variant="success" show={showSuccessAlert} 
        onClose={hideSuccessAlert} dismissible data-testid="success-alert">
        {successAlertMsg}
      </Alert>
      <Alert key={'errorAlert'} variant="danger" show={showErrorAlert} 
        onClose={hideErrorAlert} dismissible data-testid="error-alert">
        {errorAlertMsg}
      </Alert>
      <Modal show={showDeleteModal} onHide={handleClose} data-testid="delete-modal">
        <Modal.Header>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {userToDelete.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} data-testid="delete-close-btn">
            Close
          </Button>
          <Button variant="danger" onClick={requestUserDelete} data-testid="delete-confirm-btn">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-5">
        <button className="btn btn-success" onClick={addUser}>
          Add new user
        </button>
      </div>
    </div>
  )
}

export default Users