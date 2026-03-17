import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import AddTaskModal from "../modals/AddTaskModal";

const API = import.meta.env.VITE_API_BASE_URL;

const COLUMNS = [
  { id: "todo", label: "To Do" },
  { id: "inprogress", label: "In Progress" },
  { id: "done", label: "Done" },
];

const PRIORITY_COLORS = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
};

export default function TodoList() {
  const [columns, setColumns] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });
  const [showModal, setShowModal] = useState(false);

  const fetchActivities = useCallback(async () => {
    try {
      const res = await axios.get(`${API}api/tasks`);
      const cols = { todo: [], inprogress: [], done: [] };
      res.data.forEach((task) => {
        const s = task.status || "todo";
        if (cols[s]) cols[s].push(task);
      });
      setColumns(cols);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = async (task) => {
    try {
      await axios.delete(`${API}api/tasks/${task._id}`);
      fetchActivities();
    } catch (err) {
      console.error(err);
    }
  };

  const moveTask = async (task, newStatus) => {
    try {
      await axios.patch(`${API}api/tasks/${task._id}/status`, {
        status: newStatus,
      });
      fetchActivities();
    } catch (err) {
      console.error(err);
    }
  };

  const totalDone = columns.done.length;
  const totalAll = Object.values(columns).reduce((a, c) => a + c.length, 0);
  const progress =
    totalAll === 0 ? 0 : Math.round((totalDone / totalAll) * 100);

  return (
    <div className="todo-page-root">
      {/* ── Page Heading ── */}
      <h1 className="page-title">Task Board</h1>
      <p className="page-subtitle">
        Manage your tasks and track progress with this interactive board.
      </p>

      <div className="todo-page">
        {/* ── Header Row ── */}
        <div className="todo-header">
          <div>
            <h2 className="todo-title">All Tasks</h2>
            <p className="todo-subtitle">
              {totalDone} of {totalAll} completed &mdash; {progress}%
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button className="add-task-btn" onClick={() => setShowModal(true)}>
            + Add Task
          </button>
        </div>

        {/* ── Kanban Board ── */}
        <div className="board">
          {COLUMNS.map((col) => (
            <div key={col.id} className="column" data-col={col.id}>
              <div className="column-header">
                <h3>{col.label}</h3>
                <span className="task-count">{columns[col.id].length}</span>
              </div>

              <div className="task-list">
                {columns[col.id].map((task) => (
                  <div key={task._id} className="task-card">
                    <div className="task-title">
                      <span
                        className={`priority-dot ${PRIORITY_COLORS[task.priority] || ""}`}
                      />
                      {task.title}
                    </div>

                    {task.description && (
                      <p className="task-desc">{task.description}</p>
                    )}

                    <div className="task-footer">
                      {task.dueDate && (
                        <span className="task-date">
                          Due{" "}
                          {new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}

                      <div className="task-actions">
                        {col.id !== "todo" && (
                          <button
                            className="btn move-btn"
                            title="Move back"
                            onClick={() => moveTask(task, "todo")}
                          >
                            ←
                          </button>
                        )}

                        {col.id === "todo" && (
                          <button
                            className="btn move-btn"
                            title="Start"
                            onClick={() => moveTask(task, "inprogress")}
                          >
                            →
                          </button>
                        )}

                        {col.id === "inprogress" && (
                          <button
                            className="btn done-btn"
                            title="Mark done"
                            onClick={() => moveTask(task, "done")}
                          >
                            ✓
                          </button>
                        )}

                        <button
                          className="btn delete-btn"
                          title="Delete"
                          onClick={() => handleDelete(task)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <AddTaskModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onTaskAdded={fetchActivities}
        />
      </div>
    </div>
  );
}
