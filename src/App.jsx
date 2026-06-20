import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";

import PersonalDashboard from "./pages/PersonalDashboard.jsx";
import PersonalLogin from "./pages/PersonalLogin.jsx";
import PersonalRegister from "./pages/PersonalRegister.jsx";
import PersonalProgress from "./pages/PersonalProgress.jsx";
import StudyTracker from "./pages/StudyTracker.jsx";
import Goals from "./pages/Goals.jsx";
import HabitTracker from "./pages/HabitTracker.jsx";
import Notes from "./pages/Notes.jsx";
import PersonalAnalytics from "./pages/PersonalAnalytics.jsx";
import CalenderView from "./pages/CalenderView.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/personal-login"
          element={<PersonalLogin />}
        />

        <Route
          path="/personal-register"
          element={<PersonalRegister />}
        />

        {/* Admin */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* Employee */}

        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        />

        {/* Personal Productivity */}

        <Route
          path="/personal-dashboard"
          element={<PersonalDashboard />}
        />

        <Route
          path="/progress"
          element={<PersonalProgress />}
        />

        <Route
          path="/study"
          element={<StudyTracker />}
        />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/habits"
          element={<HabitTracker />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/analytics"
          element={<PersonalAnalytics />}
        />

        <Route
          path="/calendar"
          element={<CalenderView />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;