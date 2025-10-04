import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Card, CardContent, Grid } from "@mui/material";

export default function Login({ setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Try logging in as a company user (Admin/Manager) on port 8080
      const companyResponse = await axios.post("http://localhost:8080/api/v1/signin", {
        email,
        password,
      });

      if (companyResponse.data === "Login successful!") {
        setUserRole("company");
        navigate("/users"); // Redirect company users to Users.js
        return;
      }
    } catch (error) {
      console.log("Company login failed, trying customer login...");
    }

    try {
      // Try logging in as a customer on port 8084
      const customerResponse = await axios.post("http://localhost:8084/api/v4/signin", {
        email,
        password,
      });

      if (customerResponse.data === "Login successful!") {
        setUserRole("customer");
        navigate("/"); // Redirect customers to ProductsCus
        return;
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "80px" }}>
      <Card elevation={6} style={{ padding: "30px", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: "bold", color: "#1976d2" }}>
            Login
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                margin="dense"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ style: { borderRadius: "8px" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ style: { borderRadius: "8px" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ padding: "10px", borderRadius: "8px" }}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
              <Typography>
                Don't have an account?{" "}
                <Button color="secondary" onClick={() => navigate("/signup")} style={{ textTransform: "none" }}>
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
