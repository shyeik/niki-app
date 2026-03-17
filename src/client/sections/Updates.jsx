import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Modal from "../modals/Modals";
import "../design/update.css";

function fmt(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function SkeletonGrid() {
  return (
    <div className="loading-grid">
      {[1, 2, 3].map((n) => (
        <div className="skeleton" key={n}>
          <div className="skel-block" style={{ aspectRatio: "4/5" }} />
        </div>
      ))}
    </div>
  );
}

export default function Updates() {
  const { data: posts, loading, error } = useFetch("api/posts");
  const [modal, setModal] = useState(null);

  return (
    <section id="updates">
      <div className="section-inner">
        <p className="section-label">Latest</p>
        <h2 className="section-title">
          Niki <em>Updates</em>
        </h2>
        <div className="divider" />

        {error && (
          <div className="error-banner">
            Could not load updates. Make sure the API server is running.
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌸</div>
            <p>No updates yet — check back soon.</p>
          </div>
        ) : (
          <div className="updates-grid">
            {posts.map((post) => (
              <div
                key={post._id}
                className="update-card"
                onClick={() =>
                  setModal({
                    meta: fmt(post.createdAt || post.date),
                    title: post.caption || "Update",
                    body: post.description || post.caption || "",
                  })
                }
              >
                {post.image ? (
                  <img
                    className="update-thumb-img"
                    src={post.image}
                    alt={post.caption || "update"}
                    loading="lazy"
                  />
                ) : post.video ? (
                  <div className="update-thumb-placeholder">▶</div>
                ) : (
                  <div className="update-thumb-placeholder">📸</div>
                )}

                <div className="update-overlay">
                  <div className="update-caption">
                    {post.caption || "View update"}
                  </div>
                </div>

                <div className="update-date">
                  {fmt(post.createdAt || post.date) || "Recent update"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        meta={modal?.meta}
        title={modal?.title}
        body={modal?.body}
      />
    </section>
  );
}
