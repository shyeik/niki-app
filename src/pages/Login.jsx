import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const API = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/api/auth/login`, { name, password })
      localStorage.setItem("token", res.data.token)
      navigate("/admin/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ffe6f0, #ffd9e8)",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(255, 182, 193, 0.5)",
        width: "350px",
        textAlign: "center",
      }}>
        <h2 style={{ marginBottom: "10px", color: "#ff4da6" }}>Admin Login</h2>
        <p style={{ marginBottom: "20px", color: "#ff80bf" }}>Manage K-Pop Voting</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ffc0cb",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ffc0cb",
            }}
          />
          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#ff4da6",
              color: "white",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#ff1a75"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#ff4da6"}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login