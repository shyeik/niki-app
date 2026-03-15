import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./layout/AdminLayout"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Login from "./pages/Login"
import ProtectedRoute from "./utils/ProtectedRoute"
import Register from "./pages/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App