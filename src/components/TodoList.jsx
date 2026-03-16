function TodoList() {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(255,182,193,0.3)"
    }}>
      <h2 style={{color:"#ff4da6", marginBottom:"15px"}}>Todo List</h2>
      <ul>
        <li>Check new votes</li>
        <li>Approve fan submissions</li>
        <li>Update Ni-Ki profile</li>
      </ul>
    </div>
  )
}

export default TodoList