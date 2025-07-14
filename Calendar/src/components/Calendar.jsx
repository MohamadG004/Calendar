import React from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const daysInMonth = today.daysInMonth();
  const startDay = startOfMonth.day(); // 0 = Sunday, 6 = Saturday

  const previousMonth = today.subtract(1, "month");
  const daysInPrevMonth = previousMonth.daysInMonth();

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

          return (
            <div
              key={idx}
              className={`day-box 
                ${isToday ? "today" : ""} 
                ${!isCurrentMonth ? "text-gray-400" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
