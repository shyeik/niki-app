import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div style={{
      width:"200px",
      height:"100vh",
      background:"#111",
      color:"#fff",
      padding:"20px"
    }}>
      <h2>Admin</h2>

      <ul style={{listStyle:"none", padding:0}}>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/users">Users</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar