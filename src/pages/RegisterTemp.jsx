import { useState } from "react";
import { supabase } from "../supabase";
import {
FaEnvelope,
FaLock,
FaUserTag
} from "react-icons/fa";

function Register() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("employee");

const registerUser = async () => {
if (!email || !password) {
alert("Please fill all fields");
return;
}

const { data, error } =
  await supabase.auth.signUp({
    email,
    password,
  });

if (error) {
  alert(error.message);
  return;
}

// Save role in profiles table
const { error: profileError } =
  await supabase
    .from("profiles")
    .insert([
      {
        email: email,
        role: role,
      },
    ]);

if (profileError) {
  alert(profileError.message);
  return;
}

// Automatically create employee record
if (role === "employee") {
  const { error: employeeError } =
    await supabase
      .from("employees")
      .insert([
        {
          name: email.split("@")[0],
          email: email,
          department: "General",
        },
      ]);

  if (employeeError) {
    alert(employeeError.message);
    return;
  }
}

alert("Registration Successful");
window.location.href = "/";

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
width: "450px",
borderRadius: "20px",
}}
>
<h2 className="text-center mb-2">
📝 Create Account
</h2>

    <p className="text-center text-muted mb-4">
      Register to start managing tasks
    </p>

    <div className="mb-3">
      <label className="form-label">
        Email Address
      </label>

      <div className="input-group">
        <span className="input-group-text">
          <FaEnvelope />
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

    <div className="mb-3">
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
          placeholder="Create Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="form-label">
        Account Type
      </label>

      <div className="input-group">
        <span className="input-group-text">
          <FaUserTag />
        </span>

        <select
          className="form-select"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="employee">
            Employee
          </option>

          <option value="admin">
            Admin
          </option>

          <option value="personal">
            Personal
          </option>
        </select>
      </div>
    </div>

    <button
      className="btn btn-primary w-100"
      onClick={registerUser}
    >
      Create Account
    </button>

    <p className="text-center mt-4">
      Already have an account?
      <a
        href="/"
        className="ms-2 text-decoration-none"
      >
        Login
      </a>
    </p>
  </div>
</div>

);
}

export default Register;