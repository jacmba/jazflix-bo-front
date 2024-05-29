import { useParams } from "react-router-dom"
import UserForm from "./UserForm"
import { useEffect, useState } from "react"
import { retrieveUser, updateUser } from "../../../services/users-service"

const EditUser = () => {

  const {id} = useParams()
  const [user, setUser] = useState({})
  const [loaded, setLodaded] = useState(false)

  const loadUser = async () => {
    const userData = await retrieveUser(id)
    setUser(userData)
    setLodaded(true)
  }

  useEffect(() => {
    loadUser()
  }, [loaded])

  const handleSubmit = (name, enabled) => {
    updateUser({id, name, enabled})
  }

  return (
    <div className="container mt-5" data-testid="edit-user-container">
      <h1>Edit user</h1>
      {loaded && <UserForm
        defaultName={user.name}
        defaultEnabled={user.enabled !== false ? 'true': 'false'}
        submitLabel="Update user"
        cb={handleSubmit} />
      }
    </div>
  )
}

export default EditUser