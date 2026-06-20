import { useState } from "react";
import { supabase } from "../supabase";

function PersonalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { data } = await supabase
      .from("personal_users")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (data.length > 0) {
      localStorage.setItem(
        "personalUser",
        email
      );

      window.location.href = "/personal-dashboard";
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container p-4">
      <h1>🔐 Personal Login</h1>

      <input
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
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