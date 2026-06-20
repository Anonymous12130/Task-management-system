import {
  FaChartLine,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaTasks,
} from "react-icons/fa";

function AdminSidebar({ logout }) {
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background:
          "linear-gradient(180deg,#4f46e5,#7c3aed)",
        color: "white",
        padding: "25px",
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        overflowY: "auto",
      }}
    >
      <div className="text-center mb-5">
        <FaTasks size={50} />

        <h3 className="mt-3">
          TaskPro CRM
        </h3>

        <p
          style={{
            opacity: 0.8,
          }}
        >
          Admin Control Panel
        </p>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        <li
          className="sidebar-item"
          onClick={() =>
            document
              .getElementById("overview")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          <FaChartLine /> Overview
        </li>

        <li
          className="sidebar-item"
          onClick={() =>
            document
              .getElementById("assign-task")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          <FaClipboardList /> Assign Task
        </li>

        <li
          className="sidebar-item"
          onClick={() =>
            document
              .getElementById("team")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          <FaUsers /> Team Directory
        </li>

        <li
          className="sidebar-item"
          onClick={() =>
            document
              .getElementById("tasks")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          <FaTasks /> Assigned Tasks
        </li>

        <li
          onClick={logout}
          className="sidebar-item"
          style={{
            color: "#ffb4b4",
            marginTop: "30px",
          }}
        >
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;