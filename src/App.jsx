import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./utils/ProtectedRoute";

// Lazy load pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Users = React.lazy(() => import("./pages/Users"));
const Login = React.lazy(() => import("./pages/Login"));
const Events = React.lazy(() => import("./pages/Events"));
const Tutorials = React.lazy(() => import("./pages/Tutorial"));
const TodoList = React.lazy(() => import("./pages/TodoList"));
const Updates = React.lazy(() => import("./pages/Updates"));
const Mainpage = React.lazy(() => import("./client/pages/MainPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
