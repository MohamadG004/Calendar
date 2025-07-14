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
    <div className="p-4 grid gap-2">
      <h2 className="text-center text-2xl font-semibold mb-4">
        {today.format("MMMM YYYY")}
      </h2>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`h-12 flex items-center justify-center rounded ${
              day === today.date() ? "bg-blue-500 text-white font-bold" : "bg-gray-100"
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
