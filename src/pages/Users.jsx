import { useEffect, useState } from "react"
import axios from "axios"

function Users() {

  const [users, setUsers] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:5000/api/users")
    .then(res=>{
      setUsers(res.data)
    })

  },[])

  return (
    <div>
      <h1>Users</h1>

      {users.map(user=>(
        <div key={user._id}>
          {user.name} - {user.email}
        </div>
      ))}

    </div>
  )
}

export default Users