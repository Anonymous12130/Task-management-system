import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function PersonalDashboard() {
  const [email, setEmail] = useState("");
  const [goalsCount, setGoalsCount] = useState(0);
const [completedGoals, setCompletedGoals] = useState(0);

const [habitsCount, setHabitsCount] = useState(0);
const [completedHabits, setCompletedHabits] = useState(0);

const [studyHours, setStudyHours] = useState(0);

const [notesCount, setNotesCount] = useState(0);

const [recentGoals, setRecentGoals] = useState([]);
const [recentNotes, setRecentNotes] = useState([]);


  useEffect(() => {
  loadData();
}, []);

  const loadData = async () => {
  const userEmail =
    localStorage.getItem("personalUser");

  if (!userEmail) return;

  setEmail(userEmail);

  const { data: goals } = await supabase
    .from("personal_goals")
    .select("*")
    .eq("user_email", userEmail);

  const { data: habits } = await supabase
    .from("habits")
    .select("*")
    .eq("user_email", userEmail);

  const { data: study } = await supabase
    .from("study_tracker")
    .select("*")
    .eq("user_email", userEmail);

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .eq("user_email", userEmail);

  setGoalsCount(goals?.length || 0);

  setCompletedGoals(
    goals?.filter(
      (g) => g.status === "Completed"
    ).length || 0
  );

  setHabitsCount(habits?.length || 0);

  setCompletedHabits(
    habits?.filter(
      (h) => h.completed
    ).length || 0
  );

  setNotesCount(notes?.length || 0);

  const totalHours =
    study?.reduce(
      (sum, item) =>
        sum + Number(item.hours || 0),
      0
    ) || 0;

  setStudyHours(totalHours);

  setRecentGoals(
    goals?.slice(0, 3) || []
  );

  setRecentNotes(
    notes?.slice(0, 3) || []
  );
};
const logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("personalUser");
  window.location.href = "/";
};

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f7fc",
      }}
    >
      <Sidebar logout={logout} />

      <div
  className="container-fluid p-3 p-md-4"
  style={{
    flex: 1,
  }}
>
        <h1 className="mb-4">
          🚀 Personal Productivity Dashboard
        </h1>

        <div className="card shadow border-0 p-4 mb-4">
          <div className="d-flex flex-column flex-md-row align-items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${email}`}
style={{
  width: "90px",
  height: "90px",
  objectFit: "cover",
}}              className="rounded-circle me-3"
              alt="profile"
            />

            <div>
              <h4>Welcome Back 👋</h4>

              <p className="mb-1">
                <strong>Email:</strong> {email}
              </p>

              <p className="text-muted">
                Personal Productivity User
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div className="row mb-4">

<div className="col-lg-3 col-md-6 col-12 mb-3">            
  <div className="card bg-primary text-white p-4 shadow">
              <h5>🎯 Goals</h5>
             <h2>{goalsCount}</h2>
<small>{completedGoals} Completed</small>
            </div>
          </div>

<div className="col-lg-3 col-md-6 col-12 mb-3">            
  <div className="card bg-success text-white p-4 shadow">
              <h5>✅ Habits</h5>
             <h2>{habitsCount}</h2>
<small>{completedHabits} Completed</small>
            </div>
          </div>

<div className="col-lg-3 col-md-6 col-12 mb-3">            
  <div className="card bg-warning text-dark p-4 shadow">
              <h5>📚 Study Hours</h5>
              <h2>{studyHours}</h2>
            </div>
          </div>

<div className="col-lg-3 col-md-6 col-12 mb-3">           
   <div className="card bg-dark text-white p-4 shadow">
              <h5>📝 Notes</h5>
              <h2>{notesCount}</h2>
            </div>
          </div>

        </div>
        <div className="card p-4 shadow mb-4">
  <h4>🏆 Productivity Score</h4>

  <h2>
    {Math.round(
      (
        (completedGoals +
          completedHabits) /
        Math.max(
          goalsCount +
            habitsCount,
          1
        )
      ) * 100
    )}
    %
  </h2>
</div>
<div className="card p-4 shadow mb-4">
  <h4>🎯 Recent Goals</h4>

  {recentGoals.length === 0 ? (
    <p>No Goals Added</p>
  ) : (
    recentGoals.map((goal) => (
      <div
        key={goal.id}
        className="border-bottom py-2"
      >
        <strong>{goal.title}</strong>

        <br />

        <span
          className={
            goal.status === "Completed"
              ? "badge bg-success"
              : "badge bg-warning text-dark"
          }
        >
          {goal.status}
        </span>
      </div>
    ))
  )}
</div>

        {/* Features */}


        <div className="row g-3">

<div className="col-lg-3 col-md-6 col-12 mb-3">            <Link
              to="/progress"
              style={{ textDecoration: "none" }}
            >
              <div className="card bg-primary text-white p-4 shadow">
                <h4>📈 Progress</h4>
              </div>
            </Link>
          </div>

<div className="col-lg-3 col-md-6 col-12 mb-3">            <Link
              to="/goals"
              style={{ textDecoration: "none" }}
            >
              <div className="card bg-success text-white p-4 shadow">
                <h4>🎯 Goals</h4>
              </div>
            </Link>
          </div>

<div className="col-lg-3 col-md-6 col-12 mb-3">            <Link
              to="/study"
              style={{ textDecoration: "none" }}
            >
              <div className="card bg-warning text-dark p-4 shadow">
                <h4>📚 Study Tracker</h4>
              </div>
            </Link>
          </div>

<div className="col-lg-3 col-md-6 col-12 mb-3">            <Link
              to="/habits"
              style={{ textDecoration: "none" }}
            >
              <div className="card bg-danger text-white p-4 shadow">
                <h4>✅ Habits</h4>
              </div>
            </Link>
          </div>

        </div>
<div className="card p-4 shadow mb-4">
  <h4>📝 Recent Notes</h4>

  {recentNotes.length === 0 ? (
    <p>No Notes Added</p>
  ) : (
    recentNotes.map((note) => (
      <div
        key={note.id}
        className="border-bottom py-2"
      >
        {note.note}
      </div>
    ))
  )}
</div>
        <div className="row mt-3">

          <div className="col-md-4 mb-3">
            <Link
              to="/notes"
              style={{ textDecoration: "none" }}
            >
              <div className="card p-4 shadow">
                <h4>📝 Notes</h4>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-3">
            <Link
              to="/analytics"
              style={{ textDecoration: "none" }}
            >
              <div className="card p-4 shadow">
                <h4>📊 Analytics</h4>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-3">
            <Link
              to="/calendar"
              style={{ textDecoration: "none" }}
            >
              <div className="card p-4 shadow">
                <h4>📅 Calendar</h4>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PersonalDashboard;