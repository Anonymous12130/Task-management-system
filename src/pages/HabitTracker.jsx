import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function HabitTracker() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  const userEmail =
    localStorage.getItem("personalUser");

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const { data, error } =
      await supabase
        .from("habits")
        .select("*")
        .eq("user_email", userEmail);

    if (!error) {
      setHabits(data || []);
    }
  };

  const addHabit = async () => {
    if (!habit) return;

    const { error } =
      await supabase
        .from("habits")
        .insert([
          {
            user_email: userEmail,
            habit,
            completed: false,
          },
        ]);

    if (!error) {
      setHabit("");
      fetchHabits();
    }
  };

  const toggleHabit = async (
    id,
    completed
  ) => {
    await supabase
      .from("habits")
      .update({
        completed: !completed,
      })
      .eq("id", id);

    fetchHabits();
  };

  const deleteHabit = async (id) => {
    await supabase
      .from("habits")
      .delete()
      .eq("id", id);

    fetchHabits();
  };

  return (
    <div className="container-fluid p-3 p-md-4">

      <h1>✅ Habit Tracker</h1>

      <div className="card p-4 mb-4">

        <input
          className="form-control mb-3"
          placeholder="Enter Habit"
          value={habit}
          onChange={(e) =>
            setHabit(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={addHabit}
        >
          Add Habit
        </button>

      </div>

      {habits.map((h) => (
        <div
          key={h.id}
          className="card p-3 mb-3"
        >
          <h4>{h.habit}</h4>

          <p>
            Status:
            <span
              className={
                h.completed
                  ? "badge bg-success ms-2"
                  : "badge bg-warning text-dark ms-2"
              }
            >
              {h.completed
                ? "Completed"
                : "Pending"}
            </span>
          </p>

          <button
            className="btn btn-success me-2"
            onClick={() =>
              toggleHabit(
                h.id,
                h.completed
              )
            }
          >
            Toggle
          </button>

          <button
            className="btn btn-danger"
            onClick={() =>
              deleteHabit(h.id)
            }
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default HabitTracker; 