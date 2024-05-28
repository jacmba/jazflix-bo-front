import { useEffect, useState } from "react"
import { API_URL } from "../../../config"
import { deleteUser, retrieveUsers } from "../../../services/users-service"
import { Alert, Button, Modal } from "react-bootstrap"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setDeleteUser] = useState({})

  const [successAlertMsg, setSuccessAlertMsg] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const loadUsers = async () => {
    setLoaded(true)
    const result = await retrieveUsers()
    setUsers(result)
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
      console.error('Error deleting user')
    }
  }

  useEffect(() => {
    loadUsers()
  }, [loaded])

  return (
    <div className="container">
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
            <td>{u.name}</td>
            <td><input className="form-checck-input" type="checkbox" disabled checked={u.enabled !== false} /></td>
            <td><button className="btn btn-info">Edit</button></td>
            <td>
              <button className="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#deleteModal" onClick={() => handleOpen(u)}>
                Delete
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
      <Alert key={'successAlert'} variant="success" show={showSuccessAlert} 
        onClose={hideSuccessAlert} dismissible>
        {successAlertMsg}
      </Alert>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {userToDelete.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={requestUserDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-5">
        <button className="btn btn-success">Add new user</button>
      </div>
    </div>
  )
}

export default Users