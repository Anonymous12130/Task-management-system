import AdminSidebar from "../components/AdminSidebar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const logout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/";
};

  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [department, setDepartment] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskDescription, setTaskDescription] =
  useState("");

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("*");

    if (!error) {
      setEmployees(data || []);
    }
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*");

    if (!error) {
      setTasks(data || []);
    }
  };

  const addEmployee = async () => {
  if (
    !employeeName ||
    !employeeEmail ||
    !department
  ) {
    alert("Fill all fields");
    return;
  }

  const { data, error } = await supabase
    .from("employees")
    .insert([
      {
        name: employeeName,
        email: employeeEmail,
        department: department,
      },
    ])
    .select();

  console.log("EMPLOYEE DATA:", data);
  console.log("EMPLOYEE ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Employee Added Successfully");

  setEmployeeName("");
  setEmployeeEmail("");
  setDepartment("");

  fetchEmployees();
};
const deleteEmployee = async (id) => {
  await supabase
    .from("employees")
    .delete()
    .eq("id", id);

  fetchEmployees();
};

  const addTask = async () => {
  if (!taskTitle || !assignedTo) {
    alert("Fill all fields");
    return;
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
  title: taskTitle,
  description: taskDescription,
  assigned_to: assignedTo,
  completed: false,
  status: "Pending",
}
    ])
    .select();

  console.log("TASK DATA:", data);
  console.log("TASK ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Task Assigned Successfully");

  setTaskTitle("");
setTaskDescription("");
setAssignedTo("");

  fetchTasks();
};

 return (
<div className="d-flex">
  <AdminSidebar logout={logout} />

  <div
    className="container-fluid p-3 p-md-4"
    style={{
      marginLeft: "270px",
      background: "#f4f7fc",
      minHeight: "100vh",
    }}
  >
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
  <div className="d-flex justify-content-between align-items-center">
  <div>
    <h1>Admin Dashboard</h1>
    <p className="text-muted">
      Manage employees and tasks
    </p>
  </div>

  <img
    src="https://ui-avatars.com/api/?name=Admin"
    width="60"
    className="rounded-circle"
  />
</div>

  <button
    className="btn btn-danger"
    onClick={logout}
  >
    Logout
  </button>
</div>

      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 col-12 mb-3">
  <motion.div
    className="card bg-primary text-white p-4 shadow"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <FaUsers size={30} />
    <h5 className="mt-2">Employees</h5>
    <h2>{employees.length}</h2>
  </motion.div>
</div>

        <div className="col-lg-3 col-md-6 col-12 mb-3">
          <div className="card bg-success text-white p-4 shadow">
            <FaTasks size={30} />
            <h5 className="mt-2">Tasks</h5>
            <h2>{tasks.length}</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 mb-3">
          <div className="card bg-warning text-dark p-4 shadow">
            <FaClock size={30} />
            <h5 className="mt-2">Pending</h5>
            <h2>
              {
                tasks.filter(
  (t) => t.status !== "Completed"
).length
              }
            </h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 mb-3">
          <div className="card bg-info text-white p-4 shadow">
            <FaCheckCircle size={30} />
            <h5 className="mt-2">Completed</h5>
            <h2>
              {
                tasks.filter(
                  (t) => t.completed
                ).length
              }
            </h2>
          </div>
        </div>
      </div>
<div
  id="overview"
  className="card p-4 shadow"
>
  <h4>📊 Task Completion</h4>

  <div className="progress">
    <div
      className="progress-bar bg-success"
      style={{
        width: `${
          tasks.length
            ? (
                tasks.filter(
                  (t) =>
                    t.status ===
                    "Completed"
                ).length /
                tasks.length
              ) * 100
            : 0
        }%`,
      }}
    >
      {tasks.length
        ? Math.round(
            (tasks.filter(
              (t) =>
                t.status ===
                "Completed"
            ).length /
              tasks.length) *
              100
          )
        : 0}
      %
    </div>
  </div>
</div>
      <div
  id="stats"
  className="card p-4 mb-4 shadow"
>
  <h4>🚀 Business Overview</h4>
  <div className="row mt-3">

    <div className="col-md-4">
      <div className="card bg-primary text-white p-3">
        <h5>Total Employees</h5>
        <h2>{employees.length}</h2>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card bg-success text-white p-3">
        <h5>Total Tasks</h5>
        <h2>{tasks.length}</h2>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card bg-warning text-white p-3">
        <h5>Completion Rate</h5>
        <h2>
          {tasks.length
            ? Math.round(
                (tasks.filter(
                  (t) =>
                    t.status === "Completed"
                ).length /
                  tasks.length) *
                  100
              )
            : 0}
          %
        </h2>
      </div>
    </div>

  </div>
</div>

      <div
  id="assign-task"
  className="card p-4 mb-4 shadow"
>
  <h4>📋 Assign Task</h4>

        <input
          className="form-control mb-3"
          placeholder="Task Title"
          
          value={taskTitle}
          onChange={(e) =>
            setTaskTitle(e.target.value)
          }
        />
        <textarea
  className="form-control mb-3"
  placeholder="Task Description"
  value={taskDescription}
  onChange={(e) =>
    setTaskDescription(e.target.value)
  }
/>

        <select
          className="form-select mb-3"
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value)
          }
        >
          <option value="">
            Select Employee
          </option>

          {employees
  .filter((emp) =>
    emp.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((emp) => (

  <option
    key={emp.id}
    value={emp.email}
  >
    {emp.name} ({emp.email})
  </option>
))}
        </select>

        <button
          className="btn btn-success"
          onClick={addTask}
        >
          Assign Task
        </button>
      </div>

     <div
  id="team"
  className="card p-4 shadow"
>
  <h4>👨‍💼 Team Directory</h4>

  <div className="row">
    {employees.map((emp) => (
      <div
        className="col-md-4 mb-3"
        key={emp.id}
      >
        <div className="card p-3 shadow-sm">
          <h5>{emp.name}</h5>

          <p className="text-muted">
            {emp.email}
          </p>

          <span className="badge bg-primary">
            {emp.department}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
      <div
  id="tasks"
  className="card p-4 shadow mt-4"
>
  <h4>📋 Assigned Tasks</h4>

  <div className="table-responsive">
  <table className="table">
    <thead>
      <tr>
        <th>Task</th>
<th>Description</th>
<th>Employee</th>
<th>Status</th>
      </tr>
    </thead>

    <tbody>
      {tasks.map((task) => (
        <tr key={task.id}>
         <td>{task.title}</td>
<td>{task.description}</td>
<td>{task.assigned_to}</td>
<td>
  <span
    className={
      task.status === "Completed"
        ? "badge bg-success"
        : "badge bg-warning text-dark"
    }
  >
    {task.status}
  </span>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    </div>
    </div>
  );
}

export default AdminDashboard;