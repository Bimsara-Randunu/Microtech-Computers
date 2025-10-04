import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Sending username & password to /register (as per your backend)
    const response = await fetch("http://localhost:8080/api/v1/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      localStorage.setItem("userToken", "company-token"); // Save token
      localStorage.setItem("userRole", "company"); // Identify as company user
      navigate("/products"); // Redirect after login
    } else {
      alert("Invalid credentials or registration failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Company Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/customer-login")}>Customer Login</button>
    </div>
  );
}
