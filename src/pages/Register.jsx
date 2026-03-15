import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const API = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/api/auth/register`, { name, email, password })
      setSuccess(res.data.message)
      setError("")
      // Redirect to login after registration
      setTimeout(()=>navigate("/login"), 1500)
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed")
      setSuccess("")
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Admin Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
        {success && <p style={{color:"green"}}>{success}</p>}
        <button type="submit" style={{padding:"10px 20px"}}>Register</button>
      </form>
    </div>
  )
}

export default Register