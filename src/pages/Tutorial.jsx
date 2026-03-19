import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../design/pages/tutorial.css";

const API = import.meta.env.VITE_API_BASE_URL;

function Tutorials() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchTutorials = async () => {
    try {
      const res = await axios.get(`${API}api/tutorials`);
      setTutorials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!video || !title) {
      alert("Video and title are required");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("video", video);
      formData.append("title", title);
      formData.append("description", description);
      const res = await axios.post(`${API}api/tutorials`, formData);
      setTutorials((prev) => [res.data, ...prev]);
      setVideo(null);
      setPreview(null);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ── Modal helpers ──
  const openModal = (tut) => {
    setSelected(tut);
    setIsEditing(false);
    setConfirmDelete(false);
    setEditTitle(tut.title);
    setEditDesc(tut.description || "");
  };

  const closeModal = () => {
    setSelected(null);
    setIsEditing(false);
    setConfirmDelete(false);
    setEditTitle("");
    setEditDesc("");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setConfirmDelete(false);
  };

  const handleSave = async () => {
    if (!selected) return;

    try {
      setSaving(true);

      const res = await axios.put(
        `${API}api/tutorials/${selected._id}`, // ✅ FIXED (PUT not PATCH)
        {
          title: editTitle,
          description: editDesc,
        },
      );

      setTutorials((prev) =>
        prev.map((t) => (t._id === res.data._id ? res.data : t)),
      );

      setSelected(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;

    try {
      setSaving(true);

      await axios.delete(`${API}api/tutorials/${selected._id}`);

      setTutorials((prev) => prev.filter((t) => t._id !== selected._id));

      closeModal();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Voting Tutorials</h1>
      <p className="page-subtitle">Upload and manage tutorials 🎥</p>

      <div className="updates-page">
        {/* ── LEFT: Upload ── */}
        <div className="update-card">
          <h2 className="update-title">✦ Upload Tutorial</h2>

          <label className="upload-box">
            {preview ? (
              <video src={preview} controls />
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">🎥</span>
                <span>Click to upload video</span>
              </div>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              hidden
            />
          </label>

          <input
            type="text"
            placeholder="Tutorial title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />

          <textarea
            placeholder="Write description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows={3}
            style={{ resize: "vertical" }}
          />

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-dots">
                Uploading<span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              "Upload Tutorial"
            )}
          </button>
        </div>

        {/* ── RIGHT: Tutorial grid ── */}
        <div className="posts-section">
          <h2 className="posts-title">Tutorial List</h2>

          {tutorials.length === 0 ? (
            <p className="empty-text">No tutorials yet.</p>
          ) : (
            <div className="posts-grid">
              {tutorials.map((tut) => (
                <div
                  key={tut._id}
                  className="post-card"
                  onClick={() => openModal(tut)}
                >
                  {/* Video thumbnail */}
                  <div className="post-img-wrap">
                    <video src={tut.video} />
                    <div className="post-overlay">
                      <span>▶ View</span>
                    </div>
                  </div>

                  <div className="post-caption">
                    <strong>{tut.title}</strong>
                    {tut.description && <p>{tut.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-inner">
              {/* Left: video */}
              <div className="modal-image-side">
                <video
                  src={selected.video}
                  controls
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Right: info + actions */}
              <div className="modal-caption-side">
                {selected.createdAt && (
                  <p className="modal-date">
                    {new Date(selected.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="input-field"
                      placeholder="Tutorial title..."
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="input-field"
                      placeholder="Description..."
                      rows={5}
                      style={{ resize: "vertical" }}
                    />
                  </>
                ) : (
                  <div className="modal-caption-text">
                    <h2>{selected.title}</h2>
                    {selected.description && <p>{selected.description}</p>}
                  </div>
                )}

                {/* Action buttons */}
                <div className="modal-actions">
                  {confirmDelete ? (
                    <div className="delete-confirm">
                      <span>Delete this tutorial?</span>
                      <button
                        className="action-btn confirm-yes"
                        onClick={handleDelete}
                      >
                        Yes, delete
                      </button>
                      <button
                        className="action-btn confirm-no"
                        onClick={() => setConfirmDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : isEditing ? (
                    <>
                      <button
                        className="action-btn save-btn"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        className="action-btn cancel-btn"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action-btn edit-btn"
                        onClick={handleEdit}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => setConfirmDelete(true)}
                      >
                        🗑 Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tutorials;
