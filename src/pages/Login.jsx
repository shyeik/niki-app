import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../design/pages/login.css";

const API = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post(`${API}api/auth/login`, { name, password });
      const session = {
        token: res.data.token,
        username: res.data.name,
        expiry: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
      };

      localStorage.setItem("session", JSON.stringify(session));
      localStorage.setItem("username", res.data.name);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* ── Left decorative panel ── */}
      <div className="login-panel-left">
        <div className="login-panel-brand">
          <div className="login-panel-logo">
            Artist<span>·</span>
          </div>
          <p className="login-panel-tagline">어서 오세요 · Fan Hub</p>
        </div>

        {/* Decorative elements */}
        <div className="login-ring" />
        <div className="login-dots">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="login-panel-right">
        <div className="login-box">
          <p className="login-eyebrow">Admin Portal</p>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to manage the fan hub.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label className="login-field-label">Username</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="login-input"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="login-field-label">Password</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">🔒</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <p className="login-error">
                <span>✕</span> {error}
              </p>
            )}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            Artist Fan Hub &nbsp;·&nbsp; <span>✦</span> &nbsp;Authorized access
            only
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
