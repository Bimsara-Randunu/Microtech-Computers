import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8084/api/v4/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();
      console.log("Response Status:", response.status);
      console.log("Response Body:", data);

      if (response.ok) {
        console.log("Navigating to /products...");
        localStorage.setItem("userToken", "customer-token");
        localStorage.setItem("userRole", "customer");

        setTimeout(() => {
          navigate("/products");
        }, 100);
      } else {
        setError(data || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Check console logs.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#f4f6f8" }} // Light background
    >
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 5, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Customer Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            {error && (
              <Typography color="error" textAlign="center" marginBottom={2}>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button color="secondary" onClick={() => navigate("/customer-signup")}>
              Sign Up
            </Button>
            <Button color="secondary" onClick={() => navigate("/company-login")}>
              Company Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
