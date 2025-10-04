import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:8084/api/v4/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Signup successful! Please log in.");
      navigate("/customer-login");
    } else {
      alert("Signup failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Customer Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        <input type="text" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <input type="text" placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => navigate("/customer-login")}>Back to Login</button>
    </div>
  );
}
