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
    console.log("Login success:", res.data)
    localStorage.setItem("token", res.data.token)
    navigate("/admin/dashboard")
  } catch (err) {
    setError(err.response?.data?.message || "Login failed")
  }
}
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        {error && <p style={{color:"red"}}>{error}</p>}
        <button type="submit" style={{padding:"10px 20px"}}>Login</button>
      </form>
    </div>
  )
}

export default Login