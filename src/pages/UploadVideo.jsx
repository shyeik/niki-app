function UploadVideo() {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(255,182,193,0.3)"
    }}>
      <h2 style={{color:"#ff4da6", marginBottom:"15px"}}>Upload Video</h2>
      <input type="file" />
      <button style={{
        marginTop:"10px",
        padding:"8px 12px",
        background:"#ff4da6",
        color:"white",
        border:"none",
        borderRadius:"8px",
        cursor:"pointer"
      }}>Upload</button>
    </div>
  )
}

export default UploadVideo