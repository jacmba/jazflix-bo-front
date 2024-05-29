import UserForm from "./UserForm"

const EditUser = () => {

  const handleSubmit = (username, isEnabled) => {
    console.log({username, isEnabled})
  }

  return (
    <div className="container" data-testid="edit-user-container">
      Edit user
      <UserForm cb={handleSubmit}></UserForm>
    </div>
  )
}

export default EditUser