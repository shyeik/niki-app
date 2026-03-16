import Sidebar from "../components/Sidebar"

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      
      <Sidebar />
      
      <div style={{
        flex: 1,
        padding: "30px",
        background: "#fff0f6",
      }}>
        {children}
      </div>
      
    </div>
  )
}

export default AdminLayout