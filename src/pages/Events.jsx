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


  // ✅ ADD THIS HERE (VERY IMPORTANT)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );


  return (
    <div>
      <h1 className="event-title">SCHEDULE EVENTS</h1>
      <p>Manage and schedule your events using the calendar below.</p>

      <div className="event-container">
        
  <h2>Upcoming Events</h2>

{sortedActivities.length === 0 ? (
  <p className="empty-text">No events yet.</p>
) : (
  <div className="events-grid">

    {sortedActivities.map((event) => {
      const eventDate = new Date(event.date);
      const today = new Date();

      const isUpcoming = eventDate >= today;

      return (
        <div key={event._id} className="event-card">

          <h3 className="event-name">{event.title}</h3>

          <p className="event-date">
            📅 {eventDate.toLocaleDateString()}
          </p>

          {event.description && (
          <p className="event-desc" title={event.description}>
  {event.description?.length > 30
    ? event.description.slice(0, 60) + "..."
    : event.description}
</p>
          )}

          {/* 🔥 Highlight upcoming */}
          {isUpcoming && (
            <span className="event-badge">Upcoming</span>
          )}

        </div>
      );
    })}

  </div>
)}

        {/* CALENDAR */}
        <h2>Calendar</h2>
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