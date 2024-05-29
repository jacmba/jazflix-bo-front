import UserForm from "./UserForm"

const NewUser = () => {
  return (
    <div className="container" data-testid="new-user-container">
      New user
      <UserForm></UserForm>
    </div>
  )
}

export default NewUser