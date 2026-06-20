import { useState } from "react";
import { supabase } from "../supabase";

function PersonalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("personalUser", email);
    window.location.href = "/personal-dashboard";
  };

  return (
    <div className="container p-4">
      <h1>🔐 Personal Login</h1>

      <input
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}

export default PersonalLogin;