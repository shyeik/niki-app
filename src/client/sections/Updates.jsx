import { useFetch } from "../hooks/useFetch";
import "../design/update.css";

// Strips HTML tags stored in DB fields e.g. "<div><div>text</div></div>" → "text"
function stripHtml(str) {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").trim();
}

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
              <div key={post._id} className="update-card">
                {post.image ? (
                  <img
                    className="update-thumb-img"
                    src={post.image}
                    alt={stripHtml(post.caption) || "update"}
                    loading="lazy"
                  />
                ) : post.video ? (
                  <div className="update-thumb-placeholder">▶</div>
                ) : (
                  <div className="update-thumb-placeholder">📸</div>
                )}

                <div className="update-overlay">
                  <div className="update-caption">
                    {stripHtml(post.caption) || "View update"}
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
    </section>
  );
}
