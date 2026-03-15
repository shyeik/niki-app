import Sidebar from "../components/Sidebar"

function AdminLayout({ children }) {
  return (
    <div style={{display:"flex"}}>
      <Sidebar />
      <div style={{padding:"20px", width:"100%"}}>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
