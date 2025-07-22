import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const [eventsMap, setEventsMap] = useState({});
  const [editingEvent, setEditingEvent] = useState(null);

  const addEventRef = useRef(null);
  const editEventRef = useRef(null);

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day();

  const previousMonth = currentDate.subtract(1, "month");
  const nextMonth = currentDate.add(1, "month");
  const daysInPrevMonth = previousMonth.daysInMonth();

  const days = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      dateObj: previousMonth.date(daysInPrevMonth - i),
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      dateObj: currentDate.date(i),
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      dateObj: nextMonth.date(i),
    });
  }

  const handleDayClick = (dateObj) => {
    const dateStr = dateObj.format("YYYY-MM-DD");
    setSelectedDate(dateStr);
    setNewEvent("");
    setEditingEvent(null);
  };

  const handleSaveEvent = () => {
    if (!newEvent.trim()) return;
    const id = crypto.randomUUID();
    const event = { id, text: newEvent };
    setEventsMap((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), event],
    }));
    setNewEvent("");
    setSelectedDate(null);
  };

  const openEditModal = (dateKey, event) => {
    setEditingEvent({ ...event, dateKey });
  };

  const handleEditChange = (text) => {
    setEditingEvent((prev) => ({ ...prev, text }));
  };

  const handleEditConfirm = () => {
    if (!editingEvent.text.trim()) return;
    setEventsMap((prev) => ({
      ...prev,
      [editingEvent.dateKey]: prev[editingEvent.dateKey].map((e) =>
        e.id === editingEvent.id ? { ...e, text: editingEvent.text } : e
      ),
    }));
    setEditingEvent(null);
  };

  const handleDeleteEvent = () => {
    setEventsMap((prev) => ({
      ...prev,
      [editingEvent.dateKey]: prev[editingEvent.dateKey].filter(
        (e) => e.id !== editingEvent.id
      ),
    }));
    setEditingEvent(null);
  };

  // Focus the Add Event textarea
  useEffect(() => {
    if (selectedDate && addEventRef.current) {
      addEventRef.current.focus();
    }
  }, [selectedDate]);

  // Focus the Edit Event textarea
  useEffect(() => {
    if (editingEvent && editEventRef.current) {
      const textarea = editEventRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [editingEvent]);


  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>
          ←
        </button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>
          →
        </button>
      </div>

      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="weekday-box">
            {d}
          </div>
        ))}
      </div>

      <div className="days">
        {days.map((dayObj, idx) => {
          const { day, isCurrentMonth, dateObj } = dayObj;
          const dateKey = dateObj.format("YYYY-MM-DD");
          const isToday = dateObj.isSame(dayjs(), "day");
          const events = eventsMap[dateKey] || [];

          return (
            <div
              key={idx}
              className={`day-box ${isToday ? "today" : ""} ${
                events.length ? "has-note" : ""
              }`}
              onClick={() => handleDayClick(dateObj)}
            >
              <div>{day}</div>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="note-preview"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(dateKey, event);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {event.text}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Add Event Modal */}
      {selectedDate && !editingEvent && (
        <div className="modal">
          <h3>Add Event for {selectedDate}</h3>
          <textarea
            ref={addEventRef}
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSaveEvent();
              }
            }}
            rows="3"
            placeholder="Add a new event"
          />
          <div className="buttons">
            <button className="save" onClick={handleSaveEvent}>
              Add Event
            </button>
            <button className="cancel" onClick={() => setSelectedDate(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="modal">
          <h3>Edit Event for {editingEvent.dateKey}</h3>
          <textarea
            ref={editEventRef}
            value={editingEvent.text}
            onChange={(e) => handleEditChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleEditConfirm();
              }
            }}
            rows="3"
          />
          <div className="buttons">
            <button className="save" onClick={handleEditConfirm}>
              Save
            </button>
            <button className="cancel" onClick={() => setEditingEvent(null)}>
              Cancel
            </button>
            <button className="delete" onClick={handleDeleteEvent}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;