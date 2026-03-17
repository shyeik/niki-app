import { useEffect, useState } from "react";
import axios from "axios";
import "../design/pages/dashboard.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  // 📊 Fetch data
  const fetchData = async () => {
    try {
      const [tasksRes, eventsRes] = await Promise.all([
        axios.get(`${API}api/tasks`),
        axios.get(`${API}api/events`),
      ]);

      setTasks(tasksRes.data);
      setEvents(eventsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📈 Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "done").length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // 📅 Upcoming events (next 3)
  const upcomingEvents = [...events]
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">Welcome Admin 👋</h1>
      <p className="dashboard-subtitle">
        Manage your tasks, events, and content in one place.
      </p>

      {/* 🔥 STATS CARDS */}
      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="card">
          <h3>Upcoming Events</h3>
          <p>{upcomingEvents.length}</p>
        </div>

      </div>

      {/* 📊 PROGRESS */}
      <div className="progress-section">
        <h3>Task Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>{progress}% completed</p>
      </div>

      {/* 📅 UPCOMING EVENTS */}
      <div className="upcoming-section">
        <h3>Next Events</h3>

        {upcomingEvents.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          <div className="event-list">
            {upcomingEvents.map((event) => (
              <div key={event._id} className="event-item">
                <div>
                  <strong>{event.title}</strong>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;