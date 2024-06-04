import { useEffect, useState } from "react"
import SectionForm from "./SectionForm"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveSingleSection, updateSection } from "../../../services/sections-service"

const EditSection = () => {

  const [section, setSection] = useState({})
  const [loaded, setLoaded] = useState(false)

  const {id} = useParams()

  const navigate = useNavigate()

  const loadSection = async () => {
    const result = await retrieveSingleSection(id)
    if (result) {
      setSection(result)
      setLoaded(true)
    }
  }

  const handleSubmit = s => {
    updateSection({id, ...s})
    navigate('/sections')
  }

  useEffect(() => {
    loadSection()
  }, [])

  return (
    <div className="container mt-5" data-testid="edit-section-container">
      <h1>Edit section</h1>

      {
        loaded &&
        <SectionForm
          defaultIcon={section.icon}
          defaultTitle={section.title}
          defaultLinkTo={section.to}
          defaultOrder={section.order}
          submitLabel="Update section"
          submitCallback={handleSubmit} />
      }
    </div>
  )
}

export default EditSection