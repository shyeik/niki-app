import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Modal from "../modals/Modals";
import "../design/event.css";

function fmt(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function fmtShort(dateStr) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
  };
}

function isUpcoming(dateStr) {
  return new Date(dateStr) >= new Date();
}

function SkeletonList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {[1, 2, 3].map((n) => (
        <div className="skeleton" key={n} style={{ height: "88px" }} />
      ))}
    </div>
  );
}

export default function Events() {
  const { data: events, loading, error } = useFetch("api/events");
  const [modal, setModal] = useState(null);

  const sorted = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return (
    <section id="events" className="events-section">
      <div className="section-inner">
        <p className="section-label">Schedule</p>
        <h2 className="section-title">
          Upcoming <em>Events</em>
        </h2>
        <div className="divider" />

        {error && (
          <div className="error-banner">
            Could not load events. Make sure the API server is running.
          </div>
        )}

        {loading ? (
          <SkeletonList />
        ) : sorted.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <p>No events scheduled yet.</p>
          </div>
        ) : (
          <div className="events-list">
            {sorted.map((ev, i) => {
              const { month, day } = fmtShort(ev.date);
              const upcoming = isUpcoming(ev.date);
              return (
                <div
                  key={ev._id}
                  className="event-item"
                  onClick={() =>
                    setModal({
                      meta: fmt(ev.date),
                      title: ev.title || "Event",
                      body: ev.description || ev.location || "",
                    })
                  }
                >
                  <span className="event-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="event-date-col">
                    <div className="event-month-txt">{month}</div>
                    <div className="event-day-txt">{day}</div>
                  </div>

                  <div className="event-body">
                    <div className="event-title-txt">
                      {ev.title || "Untitled Event"}
                    </div>
                  </div>

                  <span
                    className={`event-status ${upcoming ? "upcoming" : "past"}`}
                  >
                    {upcoming ? "Upcoming" : "Past"}
                  </span>
                </div>
              );
            })}
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
