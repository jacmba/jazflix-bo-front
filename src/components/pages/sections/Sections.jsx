import { useEffect, useState } from "react"
import { retrieveAllSections } from "../../../services/sections-service"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Sections = () => {

  const [sections, setSections] = useState([])

  const loadSections = async () => {
    const data = await retrieveAllSections()
    if (data) {
      setSections(data)
    }
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
                      variant="info">
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      data-testid="btn-delete-section"
                      variant="danger">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>

      <div className="mt-5">
        <Button variant="success">
          Add new section
        </Button>
      </div>
    </div>
  )
}

export default Sections