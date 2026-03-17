import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Tutorials from "./pages/Tutorial";
import TodoList from "./pages/TodoList";
import Updates from "./pages/Updates";
import Mainpage from "./client/pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
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
          <Route path="events" element={<Events />} />
          <Route path="todo" element={<TodoList />} />
          <Route path="tutorials" element={<Tutorials />} />
          <Route path="updates" element={<Updates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
