function NiKiUpdates() {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(255,182,193,0.3)"
    }}>
      <h2 style={{color:"#ff4da6", marginBottom:"15px"}}>Update Ni-Ki Updates</h2>
      <textarea
        rows="4"
        placeholder="Write latest update..."
        style={{width:"100%", padding:"10px", borderRadius:"8px", border:"1px solid #ffc0cb"}}
      ></textarea>
      <button style={{
        marginTop:"10px",
        padding:"8px 12px",
        background:"#ff4da6",
        color:"white",
        border:"none",
        borderRadius:"8px",
        cursor:"pointer"
      }}>Save</button>
    </div>
  )
}

export default NiKiUpdates