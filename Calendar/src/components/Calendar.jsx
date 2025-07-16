import React, { useState } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const daysInMonth = today.daysInMonth();
  const startDay = startOfMonth.day();

  const previousMonth = today.subtract(1, "month");
  const daysInPrevMonth = previousMonth.daysInMonth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const [eventsMap, setEventsMap] = useState({});
  const [editing, setEditing] = useState({ id: null, text: "" });

  const days = [];

  // Fill in empty boxes for previous month
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      dateObj: previousMonth.date(daysInPrevMonth - i),
    });
  }

  // Fill in days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      dateObj: today.date(i),
    });
  }

  const handleDayClick = (dateObj, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    const dateStr = dateObj.format("YYYY-MM-DD");
    setSelectedDate(dateStr);
    setNewEvent("");
    setEditing({ id: null, text: "" });
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
  };

  const handleDeleteEvent = (dateKey, id) => {
    setEventsMap((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((e) => e.id !== id),
    }));
  };

  const handleEditStart = (id, text) => {
    setEditing({ id, text });
  };

  const handleEditConfirm = (dateKey) => {
    setEventsMap((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].map((e) =>
        e.id === editing.id ? { ...e, text: editing.text } : e
      ),
    }));
    setEditing({ id: null, text: "" });
  };

  return (
    <div className="calendar">
      <h2>{today.format("MMMM YYYY")}</h2>

      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-box" style={{ fontWeight: "bold" }}>
            {d}
          </div>
        ))}
      </div>

      <div className="days">
        {days.map((dayObj, idx) => {
          const { day, isCurrentMonth, dateObj } = dayObj;
          const dateKey = dateObj.format("YYYY-MM-DD");
          const isToday = dateObj.isSame(today, "day");
          const events = eventsMap[dateKey] || [];

          return (
            <div
              key={idx}
              className={`day-box ${isToday ? "today" : ""} ${
                events.length ? "has-note" : ""
              }`}
              onClick={() => handleDayClick(dateObj, isCurrentMonth)}
              style={{ color: isCurrentMonth ? "inherit" : "#ccc" }}
            >
              <div>{day}</div>
              {events.map((event) => (
                <div key={event.id} className="note-preview">
                  {editing.id === event.id ? (
                    <>
                      <input
                        value={editing.text}
                        onChange={(e) =>
                          setEditing({ ...editing, text: e.target.value })
                        }
                        style={{
                          width: "80%",
                          fontSize: "12px",
                          borderRadius: "4px",
                          marginBottom: "2px",
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditConfirm(dateKey);
                        }}
                        style={{ fontSize: "10px" }}
                      >
                        ✔
                      </button>
                    </>
                  ) : (
                    <>
                      {event.text}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditStart(event.id, event.text);
                        }}
                        style={{ marginLeft: 5, fontSize: "10px" }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(dateKey, event.id);
                        }}
                        style={{ marginLeft: 3, fontSize: "10px" }}
                      >
                        ❌
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="modal">
          <h3>Events for {selectedDate}</h3>
          <textarea
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
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
    </div>
  );
};

export default Calendar;