import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Goals() {
  const [goal, setGoal] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [goals, setGoals] = useState([]);

  const userEmail =
    localStorage.getItem("personalUser");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const { data, error } =
      await supabase
        .from("personal_goals")
        .select("*")
        .eq("user_email", userEmail)
        .order("id", {
          ascending: false,
        });

    if (!error) {
      setGoals(data || []);
    }
  };

  const addGoal = async () => {
    if (!goal) {
      alert("Enter Goal");
      return;
    }

    const { error } =
      await supabase
        .from("personal_goals")
        .insert([
          {
            user_email:
              userEmail,
            title: goal,
            progress: 0,
            status: "Pending",
            due_date: dueDate,
          },
        ]);

    if (error) {
      alert(error.message);
      return;
    }

    setGoal("");
    setDueDate("");

    fetchGoals();
  };

  const deleteGoal = async (
    id
  ) => {
    await supabase
      .from("personal_goals")
      .delete()
      .eq("id", id);

    fetchGoals();
  };

  const completeGoal =
    async (id) => {
      await supabase
        .from("personal_goals")
        .update({
          progress: 100,
          status:
            "Completed",
        })
        .eq("id", id);

      fetchGoals();
    };

  return (
    <div className="container-fluid p-3 p-md-4">

      <h1 className="mb-4">
        🎯 Goals Planner
      </h1>

      <div className="card p-4 shadow mb-4">

        <h4>
          Add New Goal
        </h4>

        <input
          className="form-control mb-3"
          placeholder="Goal Title"
          value={goal}
          onChange={(e) =>
            setGoal(
              e.target.value
            )
          }
        />

        <input
          type="date"
          className="form-control mb-3"
          value={dueDate}
          onChange={(e) =>
            setDueDate(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-primary"
          onClick={addGoal}
        >
          Add Goal
        </button>

      </div>

      <div className="card p-4 shadow">

        <h3>
          My Goals
        </h3>

        {goals.length === 0 ? (
          <p>
            No Goals Added
          </p>
        ) : (
          goals.map((g) => (
            <div
              key={g.id}
              className="card p-3 mb-3"
            >
              <h4>
                {g.title}
              </h4>

              <p>
                📅 Due Date:
                {" "}
                {g.due_date}
              </p>

              <p>
                Status:
                <span
                  className={
                    g.status ===
                    "Completed"
                      ? "badge bg-success ms-2"
                      : "badge bg-warning text-dark ms-2"
                  }
                >
                  {g.status}
                </span>
              </p>

              <div className="progress mb-3">

                <div
                  className="progress-bar bg-success"
                  style={{
                    width:
                      `${g.progress}%`,
                  }}
                >
                  {g.progress}%
                </div>

              </div>

              <button
                className="btn btn-success me-2"
                onClick={() =>
                  completeGoal(
                    g.id
                  )
                }
              >
                Complete
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteGoal(
                    g.id
                  )
                }
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Goals;