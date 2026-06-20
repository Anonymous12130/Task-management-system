import {
  FaChartLine,
  FaBullseye,
  FaBook,
  FaCheckCircle,
  FaStickyNote,
  FaCalendar,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar({ logout }) {
  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#2563eb,#4f46e5)",
        color: "white",
        padding: "25px",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="text-center mb-5">
        <h2>🚀 LifeOS</h2>
        <p style={{ opacity: 0.8 }}>
          Personal Productivity
        </p>
      </div>

      <NavLink
        to="/personal-dashboard"
        className="sidebar-link"
      >
        📊 Dashboard
      </NavLink>

      <NavLink
        to="/goals"
        className="sidebar-link"
      >
        <FaBullseye /> Goals
      </NavLink>

      <NavLink
        to="/study"
        className="sidebar-link"
      >
        <FaBook /> Study Tracker
      </NavLink>

      <NavLink
        to="/habits"
        className="sidebar-link"
      >
        <FaCheckCircle /> Habits
      </NavLink>

      <NavLink
        to="/notes"
        className="sidebar-link"
      >
        <FaStickyNote /> Notes
      </NavLink>

      <NavLink
        to="/analytics"
        className="sidebar-link"
      >
        <FaChartLine /> Analytics
      </NavLink>

      <NavLink
        to="/calendar"
        className="sidebar-link"
      >
        <FaCalendar /> Calendar
      </NavLink>

      <button
        className="btn btn-danger w-100 mt-5"
        onClick={logout}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Sidebar;