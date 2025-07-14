import React from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");

  const startDay = startOfMonth.day(); // 0 = Sunday
  const daysInMonth = today.daysInMonth();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null); // Blank spaces before month starts
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="calendar">
    <h2>{today.format("MMMM YYYY")}</h2>
    <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
        ))}
        </div>
        <div className="days">
            {days.map((day, idx) => (
                <div
                    key={idx}
                    className={`day-box ${day === today.date() ? "today" : ""}`}
                >
                {day || ""}
            </div>
            ))}
        </div>
    </div>
  );
};

export default Calendar;
