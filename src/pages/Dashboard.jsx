import AdminLayout from "../layout/AdminLayout"
import TodoList from "../components/TodoList"
import UploadVideo from "../components/UploadVideo"
import NikiUpdates from "../components/NikiUpdates"

function Dashboard() {
  return (
    <AdminLayout>
      <h1 style={{color:"#ff4da6", marginBottom:"20px"}}>Welcome, Admin!</h1>
      <p style={{marginBottom:"30px"}}>Manage Todo, upload videos, and update Ni-Ki content.</p>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
        gap:"20px"
      }}>
        <TodoList />
        <UploadVideo />
        <NikiUpdates />
      </div>
    </AdminLayout>
  )
}

export default Dashboard