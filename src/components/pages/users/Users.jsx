import { useEffect, useState } from "react"
import { API_URL } from "../../../config"
import { retrieveUsers } from "../../../services/users-service"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loaded, setLoaded] = useState(false)

  const loadUsers = async () => {
    const result = await retrieveUsers()
    setUsers(result)
    setLoaded(true)
  }

  useEffect(() => {
    loadUsers()
  }, [loaded])

  return (
    <div className="container">
      <h1>List of app users</h1>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>User name (email account)</th>
            <th>Is enabled?</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.enabled ? 'YES' : 'NO'}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users