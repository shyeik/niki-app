import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarModals from "../modals/CalendarModals";
import "../design/components/calendar.css";

const CalendarComponent = ({ activities, setActivities }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);

  // 📅 Click empty date → ADD MODE
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setCurrentEvent(null);
    setModalOpen(true);
  };

  // 📌 Click event → EDIT MODE
  const handleEventClick = (info) => {
    const clicked = activities.find((a) => a._id === info.event.id);
    setCurrentEvent(clicked);
    setModalOpen(true);
  };

  // ✅ Format events safely
  const formattedEvents = activities.map((act) => ({
    id: act._id,
    title: act.title,
    start: new Date(act.date), // 🔥 FIX
    allDay: true,
    backgroundColor: "#ec4899",
    borderColor: "#ec4899",
  }));

  return (
    <div className="calendar-container">

      <FullCalendar
        key={activities.length} // 🔥 FORCE REFRESH
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />

      <CalendarModals
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventData={currentEvent}
        activities={activities}
        setActivities={setActivities}
        selectedDate={selectedDate}
      />

    </div>
  );
};

export default CalendarComponent;