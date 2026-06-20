import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import PersonalDashboard from "./pages/PersonalDashboard";
import PersonalLogin from "./pages/PersonalLogin";
import PersonalRegister from "./pages/PersonalRegister";

import PersonalProgress from "./pages/PersonalProgress";
import StudyTracker from "./pages/StudyTracker";
import Goals from "./pages/Goals";
import HabitTracker from "./pages/HabitTracker";
import Notes from "./pages/Notes";
import PersonalAnalytics from "./pages/PersonalAnalytics";
import CalendarView from "./pages/CalenderView";

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
          element={<CalendarView />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;