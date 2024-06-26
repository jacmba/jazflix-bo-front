import { useEffect, useState } from "react"
import { deleteSection, retrieveAllSections } from "../../../services/sections-service"
import { Button } from "react-bootstrap"
import './Sections.css'
import AlertMessage from '../../common/AlertMessage'
import Dialog from '../../common/Dialog'
import { useNavigate } from "react-router-dom"

const Sections = () => {

  const [sections, setSections] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [sectionToDelete, setSectionToDelete] = useState({})

  const navigate = useNavigate()

  const loadSections = async () => {
    const data = await retrieveAllSections()
    if (data) {
      setSections(data)
      setHasErrors(false)
      hideAlert()
    } else {
      setHasErrors(true)
      displayAlert('There was an error loading sections. Check your logs and try again')
    }
  }

  const requestDeletesection = async () => {
    const result = await deleteSection(sectionToDelete.id)
    if (result) {
      setHasErrors(false)
      setSections(sections.filter(s => s.id !== sectionToDelete.id))
      displayAlert(`Section ${sectionToDelete.title} successfully deleted`)
    } else {
      setHasErrors(true)
      displayAlert(`Error deleting section ${sectionToDelete.title}`)
    }
  }

  const displayAlert = msg => {
    setAlertMessage(msg)
    setShowAlert(true)
  }

  const hideAlert = () => setShowAlert(false)

  const handleDeleteClik = s => {
    setSectionToDelete(s)
    setShowDeleteDialog(true)
  }

  const handleDeleteCancel = () => setShowDeleteDialog(false)

  const handleDeleteConfirm = () => {
    setShowDeleteDialog(false)
    requestDeletesection()
  }

  const handleNewSection = () => {
    navigate('/sections/new')
  }

  const handleEditSection = id => {
    navigate(`/sections/${id}`)
  }

  useEffect(() => {
    loadSections()
  }, [])

  return (
    <div className="container mt-5" data-testid="sections-list-container">
      <h1>List of Jazflix sections</h1>
      <table className="table table-stripped mt-5">
        <thead>
          <th>Icon</th>
          <th>Title</th>
          <th>Relative link</th>
          <th>Order</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {
            sections
              .map(s => (
                <tr data-testid="section-table-row" key={s.id}>
                  <td>
                    <span class="iconify" data-icon={s.icon} />
                    <span>{s.icon}</span>
                  </td>
                  <td>{s.title}</td>
                  <td>{s.to}</td>
                  <td>{s.order}</td>
                  <td>
                    <Button
                      data-testid="btn-edit-section"
                      variant="info"
                      onClick={() => handleEditSection(s.id)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      data-testid="btn-delete-section"
                      variant="danger"
                      onClick={() => handleDeleteClik(s)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>

      {
        showAlert &&
        <AlertMessage
          variant={hasErrors ? 'danger' : 'success'}
          closeCallback={hideAlert}>
          {alertMessage}
        </AlertMessage>
      }

      {
        showDeleteDialog &&
        <Dialog
          title="Delete section"
          cancelCallback={handleDeleteCancel}
          acceptCaption="Delete"
          acceptClass="danger"
          acceptCallback={handleDeleteConfirm}>
          Are you sure you want to delete section {sectionToDelete.title}?
        </Dialog>
      }

      <div className="mt-5">
        <Button variant="success"
          data-testid="add-section-btn"
          onClick={handleNewSection}>
          Add new section
        </Button>
      </div>
    </div>
  )
}

export default Sections