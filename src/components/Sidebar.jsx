import { NavLink } from "react-router-dom"
import { FaTasks, FaUpload, FaEdit } from "react-icons/fa"

function Sidebar() {
  const links = [
    { name: "Todo List", path: "/admin/todo", icon: <FaTasks /> },
    { name: "Upload Video", path: "/admin/upload-video", icon: <FaUpload /> },
    { name: "Update Ni-Ki Updates", path: "/admin/updates", icon: <FaEdit /> },
  ]

  return (
    <div style={{
      width: "220px",
      backgroundColor: "#ffe6f0",
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      boxShadow: "2px 0 10px rgba(255, 182, 193, 0.4)",
    }}>
      <h2 style={{color: "#ff4da6", marginBottom: "30px", textAlign: "center"}}>Admin Panel</h2>
      
      {links.map(link => (
        <NavLink
          key={link.path}
          to={link.path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 15px",
            marginBottom: "10px",
            borderRadius: "8px",
            color: isActive ? "white" : "#ff4da6",
            backgroundColor: isActive ? "#ff4da6" : "transparent",
            textDecoration: "none",
            fontWeight: "500",
            transition: "all 0.2s",
          })}
        >
          {link.icon} {link.name}
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar