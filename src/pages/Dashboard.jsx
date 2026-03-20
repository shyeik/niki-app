import { useEffect, useState } from "react";
import axios from "axios";
import "../design/pages/dashboard.css";

const API = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [tutorials, setTutorials] = useState([]);

  const fetchData = async () => {
    try {
      const [tasksRes, eventsRes, updatesRes, tutorialsRes] = await Promise.all(
        [
          axios.get(`${API}api/tasks`),
          axios.get(`${API}api/events`),
          axios.get(`${API}api/posts`),
          axios.get(`${API}api/tutorials`),
        ],
      );
      setTasks(tasksRes.data);
      setEvents(eventsRes.data);
      setUpdates(updatesRes.data);
      setTutorials(tutorialsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Derived stats ──
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "inprogress").length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const upcomingEvents = [...events]
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentUpdates = [...updates].slice(0, 6);
  const recentTutorials = [...tutorials].slice(0, 3);

  const pct = (n) =>
    totalTasks === 0 ? 0 : Math.round((n / totalTasks) * 100);

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <p className="dashboard-eyebrow">Overview</p>
      <h1 className="dashboard-title">Welcome back, Admin 👋</h1>
      <p className="dashboard-subtitle">Here's what's happening today.</p>

      {/* ── Stat Cards ── */}
      <div className="dashboard-cards">
        <div className="stat-card pink">
          <span className="stat-icon"></span>
          <p className="stat-label">Total Tasks</p>
          <p className="stat-value">{totalTasks}</p>
        </div>

        <div className="stat-card green">
          <span className="stat-icon"></span>
          <p className="stat-label">Completed</p>
          <p className="stat-value">{completedTasks}</p>
        </div>

        <div className="stat-card amber">
          <span className="stat-icon"></span>
          <p className="stat-label">Upcoming Events</p>
          <p className="stat-value">{upcomingEvents.length}</p>
        </div>

        <div className="stat-card indigo">
          <span className="stat-icon"></span>
          <p className="stat-label">Artist Updates</p>
          <p className="stat-value">{updates.length}</p>
        </div>

        <div className="stat-card rose">
          <span className="stat-icon"></span>
          <p className="stat-label">Tutorials</p>
          <p className="stat-value">{tutorials.length}</p>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div className="bento-grid">
        {/* 1. Task Progress */}
        <div className="bento-cell">
          <h2 className="bento-cell-title">
            <span>📊</span> Task Progress
          </h2>
          <div className="progress-meta">
            <span className="progress-pct">{progress}%</span>
            <span className="progress-detail">
              {completedTasks} / {totalTasks} done
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* 2. Task Breakdown */}
        <div className="bento-cell">
          <h2 className="bento-cell-title">
            <span>🗂</span> Breakdown
          </h2>
          <div className="task-breakdown">
            <div className="breakdown-row">
              <div className="breakdown-meta">
                <span>To Do</span>
                <span>{todoTasks}</span>
              </div>
              <div className="breakdown-bar">
                <div
                  className="breakdown-fill todo"
                  style={{ width: `${pct(todoTasks)}%` }}
                />
              </div>
            </div>
            <div className="breakdown-row">
              <div className="breakdown-meta">
                <span>In Progress</span>
                <span>{inProgress}</span>
              </div>
              <div className="breakdown-bar">
                <div
                  className="breakdown-fill progress"
                  style={{ width: `${pct(inProgress)}%` }}
                />
              </div>
            </div>
            <div className="breakdown-row">
              <div className="breakdown-meta">
                <span>Done</span>
                <span>{completedTasks}</span>
              </div>
              <div className="breakdown-bar">
                <div
                  className="breakdown-fill done"
                  style={{ width: `${pct(completedTasks)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Upcoming Events */}
        <div className="bento-cell">
          <h2 className="bento-cell-title">
            <span>📅</span> Next Events
          </h2>
          {upcomingEvents.length === 0 ? (
            <p className="empty-note">No upcoming events.</p>
          ) : (
            <div className="event-list">
              {upcomingEvents.map((event) => (
                <div key={event._id} className="event-item">
                  <div className="event-dot" />
                  <div className="event-info">
                    <strong>{event.title}</strong>
                    <p>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Niki Updates — spans 2 columns */}
        <div className="bento-cell">
          <h2 className="bento-cell-title">
            <span>📸</span> Artist Updates
          </h2>
          <span className="update-count-badge">
            📌 {updates.length} post{updates.length !== 1 ? "s" : ""}
          </span>
          {recentUpdates.length === 0 ? (
            <p className="empty-note">No updates yet.</p>
          ) : (
            <div className="updates-preview-grid">
              {recentUpdates.map((post) => (
                <div key={post._id} className="update-thumb">
                  {post.image ? (
                    <>
                      <img src={post.image} alt={post.caption || "update"} />
                      <div className="update-thumb-overlay">👁</div>
                    </>
                  ) : post.video ? (
                    <>
                      <video src={post.video} />
                      <div className="update-thumb-overlay">▶</div>
                    </>
                  ) : (
                    <div className="update-thumb-placeholder">📝</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. Tutorials */}
        <div className="bento-cell">
          <h2 className="bento-cell-title">
            <span>🎥</span> Tutorials
          </h2>
          {recentTutorials.length === 0 ? (
            <p className="empty-note">No tutorials yet.</p>
          ) : (
            <div className="tutorials-list">
              {recentTutorials.map((tut) => (
                <div key={tut._id} className="tutorial-item">
                  <div className="tutorial-icon">🎬</div>
                  <div className="tutorial-info">
                    <strong>{tut.title}</strong>
                    <p>
                      {tut.description
                        ? tut.description.slice(0, 40) +
                          (tut.description.length > 40 ? "…" : "")
                        : "No description"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
