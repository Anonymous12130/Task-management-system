import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [userEmail, setUserEmail] =
    useState("");

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserEmail(user.email);
      fetchTasks(user.email);
    }
  };

  const fetchTasks = async (
    email
  ) => {
    const { data, error } =
      await supabase
        .from("tasks")
        .select("*")
        .eq(
          "assigned_to",
          email
        );

    if (!error) {
      setTasks(data || []);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    await supabase
      .from("tasks")
      .update({
        status,
      })
      .eq("id", id);

    fetchTasks(userEmail);
  };

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  return (
    <div
     className="container-fluid p-3 p-md-4"
      style={{
        background: "#f4f7fc",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h1>
          👨‍💻 Employee Dashboard
        </h1>

        <button
  className="btn btn-danger w-100 w-md-auto"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="card p-4 shadow mb-4">
        <h4>
          👤 Employee Profile
        </h4>
        <img
  src={`https://ui-avatars.com/api/?name=${userEmail}`}
  style={{
    width: "80px",
    height: "80px",
    objectFit: "cover",
  }}
  className="rounded-circle mb-3"
/>

        <p>
          <strong>Email:</strong>{" "}
          {userEmail}
        </p>

        <p>
          <strong>Role:</strong>
          Employee
        </p>

        <p>
          <strong>Total Tasks:</strong>{" "}
          {tasks.length}
        </p>
      </div>

      
<div className="card p-4 shadow mb-4">
  <h4>📊 My Progress</h4>

  <div className="progress">
    <div
      className="progress-bar bg-success"
      style={{
        width: `${
          tasks.length
            ? (completedTasks / tasks.length) * 100
            : 0
        }%`,
      }}
    >
      {tasks.length
        ? Math.round(
            (completedTasks / tasks.length) * 100
          )
        : 0}
      %
    </div>
  </div>
</div>
<div className="card p-4 shadow mb-4">
  <h4>📢 Recent Activity</h4>

  <ul className="list-group">
    {tasks.slice(0, 5).map((task) => (
      <li
        key={task.id}
        className="list-group-item"
      >
        {task.title} - {task.status}
      </li>
    ))}
  </ul>
</div>
      <div className="card p-4 shadow">
        <h4>
          📋 My Assigned Tasks
        </h4>
           
<div className="row mb-3">
  <div className="col-12 col-md-6 mb-2">
    <input
      className="form-control"
      placeholder="Search Task..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  </div>

  <div className="col-12 col-md-6">
    <select
      className="form-select"
      value={filter}
      onChange={(e) =>
        setFilter(e.target.value)
      }
    >
      <option>All</option>
      <option>Pending</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>
  </div>
</div>

        <div className="table-responsive">
  <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No tasks assigned yet.
                </td>
              </tr>
            ) : (
              tasks
  .filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((task) =>
    filter === "All"
      ? true
      : task.status === filter
  )
  .map((task) => (
                <tr key={task.id}>
                  <td>
                    {task.title}
                  </td>

                  <td>
                    {
                      task.description
                    }
                  </td>

                  <td>
  <span
    className={
      task.priority === "High"
        ? "badge bg-danger"
        : task.priority === "Medium"
        ? "badge bg-warning text-dark"
        : "badge bg-success"
    }
  >
    {task.priority}
  </span>
</td>

                  <td>
  {task.deadline}

  {task.deadline &&
    new Date(task.deadline) < new Date() && (
      <span className="badge bg-danger ms-2">
        Overdue
      </span>
    )}
</td>

                  <td>
                    <span
                      className={
                        task.status ===
                        "Completed"
                          ? "badge bg-success"
                          : task.status ===
                            "In Progress"
                          ? "badge bg-primary"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>
                    <select
                      className="form-select"
                      value={
                        task.status
                      }
                      onChange={(
                        e
                      ) =>
                        updateStatus(
                          task.id,
                          e.target
                            .value
                        )
                      }
                    >
                      <option>
                        Pending
                      </option>

                      <option>
                        In Progress
                      </option>

                      <option>
                        Completed
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
</div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;