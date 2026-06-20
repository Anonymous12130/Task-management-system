import TaskChart from "../components/TaskChart";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import TaskForm from "../components/TaskForm";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../dashboard.css";

import {
  FaTasks,
  FaCheck,
  FaTrash,
  FaMoon
} from "react-icons/fa";

import { motion } from "framer-motion";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*");

    if (!error) {
      setTasks(data || []);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (
  title,
  priority,
  deadline,
  employee
) => {
  const { error } = await supabase
    .from("tasks")
    .insert([
      {
        title,
        priority,
        deadline,
        employee_email: employee,
        status: "Pending",
        completed: false,
      },
    ]);

  if (error) {
    alert(error.message);
  } else {
    fetchTasks();
  }
};

  const completeTask = async (id) => {
    await supabase
      .from("tasks")
      .update({
        completed: true,
      })
      .eq("id", id);

    fetchTasks();
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    fetchTasks();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const highPriorityTasks =
    tasks.filter(
      (task) => task.priority === "High"
    ).length;

  return (
    <div
      className={
        darkMode
          ? "app-layout bg-dark text-white"
          : "app-layout"
      }
    >
      <Sidebar logout={logout} />

      <div className="main-content">

        <Navbar />

        <motion.div
          className="container-fluid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>
              <FaTasks /> Task Dashboard
            </h1>

            <button
              className="btn btn-secondary"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              <FaMoon /> Dark Mode
            </button>
          </div>

          <div
            className="card shadow p-4 mb-4 text-white"
            style={{
              background:
                "linear-gradient(135deg,#6366f1,#8b5cf6)"
            }}
          >
            <h2>
  Task Management System
</h2>

<p>
  Employee & Task Tracking
  Platform
</p>

            <p>
              Manage your tasks efficiently.
            </p>

            <p>
              📅 {new Date().toDateString()}
            </p>
          </div>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Search Tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="form-select mb-3"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="all">
              All Tasks
            </option>

            <option value="completed">
              Completed Tasks
            </option>

            <option value="pending">
              Pending Tasks
            </option>
          </select>

          <TaskForm addTask={addTask} />
          <div className="card p-4 shadow mb-4">
  <h4>📊 Task Analytics</h4>

  <TaskChart
    completed={completedTasks}
    pending={pendingTasks}
  />
</div>

          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card bg-primary text-white text-center shadow p-4">
                <h5>Total Tasks</h5>
                <h2>{tasks.length}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-success text-white text-center shadow p-4">
                <h5>Completed</h5>
                <h2>{completedTasks}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning text-dark text-center shadow p-4">
                <h5>Pending</h5>
                <h2>{pendingTasks}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-danger text-white text-center shadow p-4">
                <h5>High Priority</h5>
                <h2>{highPriorityTasks}</h2>
              </div>
            </div>

          </div>

          <div className="card shadow p-3 mb-4">

            <h5>Progress</h5>

            <div className="progress">
              <div
                className="progress-bar bg-success"
                style={{
                  width:
                    tasks.length > 0
                      ? `${(completedTasks / tasks.length) * 100}%`
                      : "0%"
                }}
              >
                {tasks.length > 0
                  ? Math.round(
                      (completedTasks / tasks.length) * 100
                    )
                  : 0}
                %
              </div>
            </div>

            <p className="mt-2 text-center">
              {completedTasks} of {tasks.length} tasks completed 🎯
            </p>
          </div>

          {tasks
            .filter((task) => {
              const matchesSearch =
                task.title
                  .toLowerCase()
                  .includes(search.toLowerCase());

              const matchesFilter =
                filter === "all"
                  ? true
                  : filter === "completed"
                  ? task.completed
                  : !task.completed;

              return (
                matchesSearch &&
                matchesFilter
              );
            })
            .map((task) => (
              <motion.div
                key={task.id}
                className="card shadow p-4 mb-3"
              >
                <h4>
                  {task.title}

                  <span
                    className={
                      task.completed
                        ? "badge bg-success ms-2"
                        : "badge bg-warning text-dark ms-2"
                    }
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>
                </h4>

                <p>
                  <strong>Priority:</strong>

                  <span
                    className={
                      task.priority === "High"
                        ? "badge bg-danger ms-2"
                        : task.priority === "Medium"
                        ? "badge bg-warning text-dark ms-2"
                        : "badge bg-success ms-2"
                    }
                  >
                    {task.priority}
                  </span>
                </p>

               <p>
  <strong>Deadline:</strong>{" "}
  {task.deadline}
</p>

<p>
  <strong>Assigned To:</strong>{" "}
  {task.employee_email}
</p>

<p>
  <strong>Status:</strong>{" "}
  {task.status}
</p>
                <button
                  className="btn btn-success me-2"
                  onClick={() =>
                    completeTask(task.id)
                  }
                >
                  <FaCheck /> Complete
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  <FaTrash /> Delete
                </button>
              </motion.div>
            ))}

        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;