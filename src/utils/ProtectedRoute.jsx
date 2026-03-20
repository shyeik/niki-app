import { Navigate } from "react-router-dom";

function getSession() {
  const session = JSON.parse(localStorage.getItem("session"));

  if (!session) return null;

  // ⏰ check expiry
  if (Date.now() > session.expiry) {
    localStorage.removeItem("session"); // auto logout
    return null;
  }

  return session;
}

function ProtectedRoute({ children }) {
  const session = getSession();

  if (!session) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
