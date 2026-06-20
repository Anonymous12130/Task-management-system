import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView() {
  return (
    <div className="container p-4">
      <h1>📅 Calendar</h1>
      <Calendar />
    </div>
  );
}

export default CalendarView;