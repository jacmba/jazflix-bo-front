import { createSection } from "../../../services/sections-service"
import SectionForm from "./SectionForm"

const NewSection = () => {

  const handleSubmit = async s => {
    const result = await createSection(s)
    if (result) {
      console.log(result)
    }
  }

  return (
    <div className="container mt-5" data-testid="new-section-container">
      <h1>Enter section data</h1>
      <SectionForm
        submitLabel="Create section"
        submitCallback={handleSubmit} />
    </div>
  )
}

export default NewSection