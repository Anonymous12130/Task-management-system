import { useState } from "react";
import {
  FaPlus,
  FaCalendarAlt,
  FaUser
} from "react-icons/fa";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [employee, setEmployee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !employee
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    addTask(
      title,
      priority,
      deadline,
      employee
    );

    setTitle("");
    setPriority("Medium");
    setDeadline("");
    setEmployee("");
  };

  return (
    <div className="card shadow-lg border-0 p-4 mb-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">
          ➕ Create New Task
        </h3>

        <span className="badge bg-primary">
          Task Assignment
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">

          <div className="col-md-4">
            <label className="form-label fw-bold">
              Task Title
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">
              Assign Employee
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="employee@gmail.com"
                value={employee}
                onChange={(e) =>
                  setEmployee(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="col-md-2">
            <label className="form-label fw-bold">
              Priority
            </label>

            <select
              className="form-select"
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
            >
              <option value="High">
                🔴 High
              </option>

              <option value="Medium">
                🟡 Medium
              </option>

              <option value="Low">
                🟢 Low
              </option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label fw-bold">
              Deadline
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <FaCalendarAlt />
              </span>

              <input
                type="date"
                className="form-control"
                value={deadline}
                onChange={(e) =>
                  setDeadline(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="col-md-1 d-flex align-items-end">
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              <FaPlus />
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default TaskForm;