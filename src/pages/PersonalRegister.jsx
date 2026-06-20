import { useState } from "react";
import { supabase } from "../supabase";

function PersonalRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const { error } = await supabase
      .from("personal_users")
      .insert([
        {
          name,
          email,
          password,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Registration Successful");
      window.location.href = "/personal-login";
    }
  };

  return (
    <div className="container p-4">
      <h1>📝 Personal Register</h1>

      <input
        className="form-control mb-3"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

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
        className="btn btn-success"
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}

export default PersonalRegister;