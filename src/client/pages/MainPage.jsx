import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Updates from "../sections/Updates";
import Events from "../sections/Events";
import Tutorials from "../sections/Tutorials";
import Footer from "../sections/Footer";
import Tasks from "../sections/Tasks";
import "../../client/design/mainpage.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

export default function Mainpage() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(false);

        const [postsRes, eventsRes, tutorialsRes, tasksRes] = await Promise.all(
          [
            axios.get(`${API}api/posts`),
            axios.get(`${API}api/events`),
            axios.get(`${API}api/tutorials`),
            axios.get(`${API}api/tasks`),
          ],
        );

        setPosts(postsRes.data);
        setEvents(eventsRes.data);
        setTutorials(tutorialsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="page-state">
        <div className="loader"></div>
        <p className="state-text">Loading...</p>
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="page-state error">
        <div className="error-icon">⚠️</div>
        <p className="state-text">Failed to load data</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="main-page">
      <Navbar />

      <Hero />

      <About
        updateCount={posts.length}
        eventCount={events.length}
        tutorialCount={tutorials.length}
      />

      <Updates posts={posts} />
      <Events events={events} />
      <Tasks tasks={tasks} />
      <Tutorials tutorials={tutorials} />

      <Footer />
    </div>
  );
}
