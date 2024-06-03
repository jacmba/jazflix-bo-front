import SectionForm from "./SectionForm"

const NewSection = () => {

  return (
    <div className="container mt-5" data-testid="new-section-container">
      <h1>Enter section data</h1>
      <SectionForm />
    </div>
  )
}

export default NewSection