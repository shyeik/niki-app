import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./layout/AdminLayout"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Login from "./pages/Login"
import ProtectedRoute from "./utils/ProtectedRoute"
import Register from "./pages/Register"
import TodoList from "./components/TodoList"
import UploadVideo from "./components/UploadVideo"
import NikiUpdates from "./components/NikiUpdates"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
           <Route path="todo" element={<TodoList />} />
           <Route path="upload-video" element={<UploadVideo />} />
           <Route path="updates" element={<NikiUpdates  />} />
        
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App