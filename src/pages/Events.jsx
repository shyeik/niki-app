import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarComponent from "../components/Calendar";
import "../design/pages/event.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function EventPage() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${API}api/events`);
      setActivities(res.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return (
    <div className="event-page-root">
      {/* ── Page Header ── */}
      <h1 className="event-page-title">Schedule Events</h1>
      <p className="event-page-subtitle">
        Manage and schedule your events. Browse upcoming activities or add new
        ones using the calendar below.
      </p>
      <header className="event-page-header"></header>

      <hr className="event-page-divider" />

      <div className="event-container">
        {/* ── Upcoming Events ── */}
        <div className="section-header">
          <h2 className="section-title">Upcoming Events</h2>
          {sortedActivities.length > 0 && (
            <span className="section-count">
              {sortedActivities.length} total
            </span>
          )}
        </div>

        <div className="events-grid">
          {sortedActivities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p className="empty-state-text">No events scheduled yet.</p>
            </div>
          ) : (
            sortedActivities.map((event) => {
              const eventDate = new Date(event.date);
              const today = new Date();
              const isUpcoming = eventDate >= today;

              return (
                <div key={event._id} className="event-card">
                  <div className="event-card-top">
                    <h3 className="event-name">{event.title}</h3>
                  </div>

                  <p className="event-date">
                    <span className="event-date-icon">📅</span>
                    {eventDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  {event.description && (
                    <p className="event-desc" title={event.description}>
                      {event.description.length > 90
                        ? event.description.slice(0, 90) + "…"
                        : event.description}
                    </p>
                  )}

                  {isUpcoming && <span className="event-badge">Upcoming</span>}
                </div>
              );
            })
          )}
        </div>

        {/* ── Calendar ── */}
        <h2 className="calendar-section-title">Calendar</h2>
        <div className="calendar-box">
          <CalendarComponent
            activities={activities}
            setActivities={setActivities}
          />
        </div>
      </div>
    </div>
  );
}
