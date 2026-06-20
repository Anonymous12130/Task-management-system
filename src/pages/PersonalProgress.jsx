import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function PersonalProgress() {
  const [goals, setGoals] = useState([]);

  const userEmail = localStorage.getItem("personalUser");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from("personal_goals")
      .select("*")
      .eq("user_email", userEmail)
      .order("id", { ascending: false });

    if (!error) {
      setGoals(data || []);
    }
  };

  return (
    <div className="container p-4">
      <h1>📈 Personal Progress</h1>

      {goals.length === 0 ? (
        <p className="text-muted mt-3">No goals added yet.</p>
      ) : (
        goals.map((goal) => (
          <div key={goal.id} className="card p-3 mb-3">
            <h4>{goal.title}</h4>

            <p>
              Status:{" "}
              <span
                className={
                  goal.status === "Completed"
                    ? "badge bg-success"
                    : "badge bg-warning text-dark"
                }
              >
                {goal.status}
              </span>
            </p>

            <div className="progress">
              <div
                className="progress-bar bg-success"
                style={{ width: `${goal.progress}%` }}
              >
                {goal.progress}%
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PersonalProgress;