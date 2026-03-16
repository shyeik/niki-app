import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <Navbar />

        <div style={{ padding: "30px", background: "#fff0f6", flex: 1 }}>
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default AdminLayout