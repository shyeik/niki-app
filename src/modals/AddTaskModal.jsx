import React, { useState } from "react";
import axios from "axios";
import "../design/modals/addtaskmodal.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

export default function AddTaskModal({ show, onClose, onTaskAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(`${API}api/tasks`, formData);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: ""
      });

      onTaskAdded();
      onClose();

    } catch (err) {

      console.error(err);

    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Add Task</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <div className="modal-actions">

            <button type="submit" className="save-btn">
              Add Task
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}