import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";

// Keep these normal (important UI - above the fold)
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../sections/Footer";

// Lazy load heavy sections
const Updates = React.lazy(() => import("../sections/Updates"));
const Events = React.lazy(() => import("../sections/Events"));
const Tutorials = React.lazy(() => import("../sections/Tutorials"));
const Tasks = React.lazy(() => import("../sections/Tasks"));

import Loader from "../components/Loader"; // reuse your loader
import "../../client/design/mainpage.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

export default function Mainpage() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(false);

      const [postsRes, eventsRes, tutorialsRes, tasksRes] = await Promise.all([
        axios.get(`${API}api/posts`),
        axios.get(`${API}api/events`),
        axios.get(`${API}api/tutorials`),
        axios.get(`${API}api/tasks`),
      ]);

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

  useEffect(() => {
    fetchAll();
  }, []);

  // ⏳ Loading UI
  if (loading) return <Loader />;

  // ❌ Error UI
  if (error) {
    return (
      <div className="page-state error">
        <div className="error-icon">⚠️</div>
        <p className="state-text">Failed to load data</p>
        <button onClick={fetchAll}>Retry</button>
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

      {/* Lazy sections */}
      <Suspense fallback={<Loader />}>
        <Updates posts={posts} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Events events={events} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Tasks tasks={tasks} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Tutorials tutorials={tutorials} />
      </Suspense>

      <Footer />
    </div>
  );
}
