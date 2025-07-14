import React, { useState } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const daysInMonth = today.daysInMonth();
  const startDay = startOfMonth.day(); // 0 = Sunday

  const previousMonth = today.subtract(1, "month");
  const daysInPrevMonth = previousMonth.daysInMonth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState("");
  const [notesMap, setNotesMap] = useState({});

  const days = [];

  // Add last days from previous month
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }

  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  const handleDayClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    const dateStr = today.date(day).format("YYYY-MM-DD");
    setSelectedDate(dateStr);
    setNote(notesMap[dateStr] || "");
  };

  const handleSaveNote = () => {
    setNotesMap((prev) => ({ ...prev, [selectedDate]: note }));
    setSelectedDate(null);
    setNote("");
  };

  return (
    <div className="calendar">
      <h2>{today.format("MMMM YYYY")}</h2>
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="days">
        {days.map((dayObj, idx) => {
          const { day, isCurrentMonth } = dayObj;
          const isToday = isCurrentMonth && day === today.date();
          const dateKey = today.date(day).format("YYYY-MM-DD");
          const hasNote = notesMap[dateKey];

          return (
            <div
              key={idx}
              className={`day-box ${isToday ? "today" : ""} ${
                !isCurrentMonth ? "text-gray-400" : ""
              } ${hasNote ? "has-note" : ""}`}
              onClick={() => handleDayClick(day, isCurrentMonth)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className="modal">
          <h3>Add Note for {selectedDate}</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
            placeholder="What do you have planned?"
          />
          <div className="buttons">
            <button className="save" onClick={handleSaveNote}>
              Save
            </button>
            <button className="cancel" onClick={() => setSelectedDate(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
