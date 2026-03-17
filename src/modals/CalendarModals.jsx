import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../design/modals/addevent.css";

const API = import.meta.env.VITE_API_BASE_URL;

Modal.setAppElement("#root");

const CalendarModals = ({
  isOpen,
  onClose,
  eventData,
  setActivities,
  activities,
  selectedDate,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (eventData && eventData._id) {
      setFormData({
        title: eventData.title || "",
        description: eventData.description || "",
      });
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [eventData]);

  // ✅ ADD + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (eventData && eventData._id) {
        // UPDATE
        const res = await axios.put(
          `${API}api/events/${eventData._id}`,
          formData
        );

        setActivities((prev) =>
          prev.map((act) =>
            act._id === eventData._id ? res.data : act
          )
        );

      } else {
        // CREATE
        const res = await axios.post(`${API}api/events`, {
          ...formData,
          date: selectedDate,
        });

        // 🔥 IMPORTANT FIX (ensures calendar sees it)
        const newEvent = {
          ...res.data,
          date: res.data.date || selectedDate,
        };

        setActivities((prev) => [...prev, newEvent]);
      }

      onClose();

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE
  const handleDelete = async () => {
    if (!eventData || !eventData._id) return;

    try {
      await axios.delete(`${API}api/events/${eventData._id}`);

      setActivities((prev) =>
        prev.filter((act) => act._id !== eventData._id)
      );

      onClose();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-card">

        <h2 className="modal-heading">
          {eventData && eventData._id ? "UPDATE" : "ADD EVENT"}
        </h2>

        <p className="modal-date">
          Date: {eventData ? eventData.date?.split("T")[0] : selectedDate}
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="modal-input"
            type="text"
            placeholder="Event title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <textarea
            className="modal-input"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className="modal-actions">

            {eventData && eventData._id && (
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}

            <button type="submit" className="btn-update">
              {eventData ? "Update" : "Add"}
            </button>

          </div>

        </form>
      </div>
    </Modal>
  );
};

export default CalendarModals;