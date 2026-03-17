import { useEffect } from "react";
import "../design/modal.css";

export default function Modal({
  isOpen,
  onClose,
  meta,
  title,
  body,
  video, // ✅ NEW
}) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <p className="modal-meta">{meta}</p>
        <h2 className="modal-title">{title}</h2>

        {/* 🎥 VIDEO PLAYER */}
        {video && (
          <div className="modal-video">
            <video
              src={video}
              controls
              autoPlay
              playsInline
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            />
          </div>
        )}

        <div className="modal-body">{body}</div>
      </div>
    </div>
  );
}
