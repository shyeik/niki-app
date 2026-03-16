import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div
      style={{
        height: "60px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #f3c6d3",
      }}
    >
      <h3 style={{ color: "#ff4da6" }}>Ni-Ki Admin Dashboard</h3>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ color: "#555" }}>Admin</span>

        <button
          onClick={handleLogout}
          style={{
            background: "#ff4da6",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar