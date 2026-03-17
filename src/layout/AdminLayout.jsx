import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import "../design/adminlayout.css"

function AdminLayout() {
  return (
    <div className="admin-layout">

      <div className="admin-sidebar">
        <Sidebar />
      </div>

      <div className="admin-main">

        <div className="admin-navbar">
          <Navbar />
        </div>

        <div className="admin-content">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default AdminLayout