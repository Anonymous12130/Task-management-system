import { useState } from "react";
import { supabase } from "../supabase";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Login User
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    // Get User Role
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (profileError) {
      alert(profileError.message);
      return;
    }

    if (!profile) {
      alert("Role not found");
      return;
    }

    // Redirect According To Role
    if (profile.role === "admin") {
      window.location.href =
        "/admin-dashboard";
    }
    else if (
      profile.role === "employee"
    ) {
      window.location.href =
        "/employee-dashboard";
    }
    else if (
      profile.role === "personal"
    ) {
      localStorage.setItem("personalUser", email);
      window.location.href =
        "/personal-dashboard";
    }
    else {
      alert("Invalid role");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg,#6366f1,#8b5cf6)",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "420px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center mb-2">
          🔐 Welcome Back
        </h2>

        <p className="text-center text-muted mb-4">
          Login to continue
        </p>

        <div className="mb-3">
          <label className="form-label">
            Email Address
          </label>

          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Password
          </label>

          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?
          <a
            href="/register"
            className="ms-2 text-decoration-none"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;