import { useState } from "react";
import { supabase } from "../supabase";

function PersonalRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ email, role: "personal" }]);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Registration Successful");
    window.location.href = "/personal-login";
  };

  return (
    <div className="container p-4">
      <h1>📝 Personal Register</h1>

      <input
        className="form-control mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button className="btn btn-success" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default PersonalRegister;