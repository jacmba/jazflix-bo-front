import { createUser } from "../../../services/users-service"
import UserForm from "./UserForm"

const handleSubmit = (name, enabled) => {
  createUser({name, enabled})
}

const NewUser = () => {
  return (
    <div className="container mt-5" data-testid="new-user-container">
      <h1>Enter user data</h1>
      <UserForm
        defaultEnabled="true"
        submitLabel="Create user"
        cb={handleSubmit} />
    </div>
  )
}

export default NewUser