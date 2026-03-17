import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Modal from "../modals/Modals";
import "../design/tutorial.css";

function SkeletonGrid() {
  return (
    <div className="loading-grid">
      {[1, 2, 3].map((n) => (
        <div className="skeleton" key={n} style={{ height: "200px" }} />
      ))}
    </div>
  );
}

export default function Tutorials() {
  const { data: tutorials, loading, error } = useFetch("api/tutorials");
  const [modal, setModal] = useState(null);

  return (
    <section id="tutorials">
      <div className="section-inner">
        <p className="section-label">Learn</p>
        <h2 className="section-title">
          Voting <em>Tutorials</em>
        </h2>
        <div className="divider" />

        {error && <div className="error-banner">Could not load tutorials.</div>}

        {loading ? (
          <SkeletonGrid />
        ) : tutorials.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <p>No tutorials yet — coming soon.</p>
          </div>
        ) : (
          <div className="tutorials-grid">
            {tutorials.map((tut) => (
              <div
                key={tut._id}
                className="tutorial-card"
                onClick={() =>
                  setModal({
                    meta: "Tutorial",
                    title: tut.title || "Tutorial",
                    body: tut.description || "No description available.",
                    video: tut.video, // ✅ IMPORTANT
                  })
                }
              >
                <span className="tut-badge">🎬 Tutorial</span>

                <div className="tut-title">
                  {tut.title || "Untitled Tutorial"}
                </div>

                <div className="tut-desc">
                  {tut.description
                    ? tut.description.slice(0, 100) +
                      (tut.description.length > 100 ? "…" : "")
                    : "No description available."}
                </div>

                <div className="tut-footer">
                  <div className="tut-icon">▶</div>
                  <span className="tut-play">Watch now</span>
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
        video={modal?.video} // ✅ PASS VIDEO
      />
    </section>
  );
}
