import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../design/pages/nikiupdates.css";

const API = import.meta.env.VITE_API_BASE_URL;

function Updates() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const editorRef = useRef(null);
  const modalEditorRef = useRef(null);

  // ── Fetch all posts ──
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ── Escape key closes modal ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setDeleteConfirm(false);
        setIsEditing(false);
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ── Sync modal editor when entering edit mode ──
  useEffect(() => {
    if (isEditing && modalEditorRef.current && selectedPost) {
      modalEditorRef.current.innerHTML = selectedPost.caption || "";
      modalEditorRef.current.focus();
    }
  }, [isEditing, selectedPost]);

  // ── Upload image preview ──
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ── Rich text toolbar ──
  const execFormat = (command, value = null, ref = editorRef) => {
    document.execCommand(command, false, value);
    ref.current?.focus();
    setCaption(ref.current?.innerHTML || "");
  };

  const execModalFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    modalEditorRef.current?.focus();
  };

  const handleEditorInput = () => {
    setCaption(editorRef.current?.innerHTML || "");
  };

  // ── CREATE post ──
  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      const res = await axios.post(`${API}api/posts`, formData);
      setPosts((prev) => [res.data, ...prev]);

      setImage(null);
      setPreview(null);
      setCaption("");
      if (editorRef.current) editorRef.current.innerHTML = "";
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ── DELETE post ──
  const handleDelete = async () => {
    if (!selectedPost) return;
    try {
      setActionLoading(true);
      await axios.delete(`${API}api/posts/${selectedPost._id}`);
      setPosts((prev) => prev.filter((p) => p._id !== selectedPost._id));
      setSelectedPost(null);
      setDeleteConfirm(false);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ── UPDATE caption ──
  const handleUpdate = async () => {
    if (!selectedPost) return;
    const newCaption = modalEditorRef.current?.innerHTML || "";
    try {
      setActionLoading(true);
      const res = await axios.put(`${API}api/posts/${selectedPost._id}`, {
        caption: newCaption,
      });
      // Update both the posts list and the open modal
      setPosts((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p)),
      );
      setSelectedPost(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsEditing(false);
    setDeleteConfirm(false);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setDeleteConfirm(false);
  };

  return (
    <div>
      <h1 className="page-title">Post Content</h1>
      <p className="page-subtitle">Post an update here!</p>

      <div className="updates-page">
        {/* ── LEFT: Upload ── */}
        <div className="update-card">
          <h2 className="update-title">✦ Post Content</h2>

          <label className="upload-box">
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">🌸</span>
                <span>Click to upload image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          <div className="editor-wrapper">
            <div className="editor-toolbar">
              <button
                type="button"
                onClick={() => execFormat("bold")}
                title="Bold"
              >
                <b>B</b>
              </button>
              <button
                type="button"
                onClick={() => execFormat("italic")}
                title="Italic"
              >
                <i>I</i>
              </button>
              <button
                type="button"
                onClick={() => execFormat("underline")}
                title="Underline"
              >
                <u>U</u>
              </button>
              <div className="toolbar-divider" />
              <button
                type="button"
                onClick={() => execFormat("formatBlock", "h2")}
                title="Heading"
              >
                H
              </button>
              <button
                type="button"
                onClick={() => execFormat("formatBlock", "p")}
                title="Paragraph"
              >
                ¶
              </button>
              <div className="toolbar-divider" />
              <button
                type="button"
                onClick={() => execFormat("insertUnorderedList")}
                title="Bullet list"
              >
                ≡
              </button>
              <button
                type="button"
                onClick={() => execFormat("justifyCenter")}
                title="Center"
              >
                ⊡
              </button>
            </div>
            <div
              className="caption-editor"
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              data-placeholder="Write your story about this update..."
            />
          </div>

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
              "✦ Upload Post"
            )}
          </button>
        </div>

        {/* ── RIGHT: Posts ── */}
        <div className="posts-section">
          <h2 className="posts-title">Recent Updates</h2>
          {posts.length === 0 ? (
            <p className="empty-text">No posts yet — be the first! 🌸</p>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="post-card"
                  onClick={() => openModal(post)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openModal(post)}
                >
                  <div className="post-img-wrap">
                    <img src={post.image} alt="post" />
                    <div className="post-overlay">
                      <span>View</span>
                    </div>
                  </div>
                  <div
                    className="post-caption"
                    dangerouslySetInnerHTML={{
                      __html: post.caption || "<em>No caption</em>",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {selectedPost && (
        <div
          className="modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="modal-content">
            {/* Close */}
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-inner">
              {/* Image */}
              <div className="modal-image-side">
                <img src={selectedPost.image} alt="post" />
              </div>

              {/* Caption side */}
              <div className="modal-caption-side">
                <p className="modal-date">
                  {selectedPost.createdAt
                    ? new Date(selectedPost.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : ""}
                </p>

                {/* ── VIEW mode ── */}
                {!isEditing ? (
                  <>
                    <div
                      className="modal-caption-text"
                      dangerouslySetInnerHTML={{
                        __html: selectedPost.caption || "<em>No caption</em>",
                      }}
                    />

                    {/* Action buttons */}
                    <div className="modal-actions">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => setIsEditing(true)}
                      >
                        ✏️ Edit Caption
                      </button>

                      {!deleteConfirm ? (
                        <button
                          className="action-btn delete-btn"
                          onClick={() => setDeleteConfirm(true)}
                        >
                          🗑️ Delete Post
                        </button>
                      ) : (
                        <div className="delete-confirm">
                          <span>Are you sure?</span>
                          <button
                            className="action-btn confirm-yes"
                            onClick={handleDelete}
                            disabled={actionLoading}
                          >
                            {actionLoading ? "Deleting..." : "Yes, delete"}
                          </button>
                          <button
                            className="action-btn confirm-no"
                            onClick={() => setDeleteConfirm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* ── EDIT mode ── */
                  <>
                    <div className="editor-wrapper modal-editor-wrapper">
                      <div className="editor-toolbar">
                        <button
                          type="button"
                          onClick={() => execModalFormat("bold")}
                        >
                          <b>B</b>
                        </button>
                        <button
                          type="button"
                          onClick={() => execModalFormat("italic")}
                        >
                          <i>I</i>
                        </button>
                        <button
                          type="button"
                          onClick={() => execModalFormat("underline")}
                        >
                          <u>U</u>
                        </button>
                        <div className="toolbar-divider" />
                        <button
                          type="button"
                          onClick={() => execModalFormat("formatBlock", "h2")}
                        >
                          H
                        </button>
                        <button
                          type="button"
                          onClick={() => execModalFormat("formatBlock", "p")}
                        >
                          ¶
                        </button>
                        <div className="toolbar-divider" />
                        <button
                          type="button"
                          onClick={() => execModalFormat("insertUnorderedList")}
                        >
                          ≡
                        </button>
                        <button
                          type="button"
                          onClick={() => execModalFormat("justifyCenter")}
                        >
                          ⊡
                        </button>
                      </div>
                      <div
                        className="caption-editor"
                        ref={modalEditorRef}
                        contentEditable
                        suppressContentEditableWarning
                        data-placeholder="Edit your caption..."
                      />
                    </div>

                    <div className="modal-actions">
                      <button
                        className="action-btn save-btn"
                        onClick={handleUpdate}
                        disabled={actionLoading}
                      >
                        {actionLoading ? "Saving..." : "💾 Save Changes"}
                      </button>
                      <button
                        className="action-btn cancel-btn"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Updates;
