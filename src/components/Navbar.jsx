import { useNavigate } from "react-router-dom";
import "../design/components/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h3 className="navbar-title">CONTENT MANAGEMENT SYSTEM</h3>

      <div className="navbar-user">
        <span>
          Hello <b>{username}</b>
        </span>

        <button className="navbar-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
