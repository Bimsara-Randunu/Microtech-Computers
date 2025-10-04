import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Card, CardContent, Grid } from "@mui/material";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8084/api/v4/signup", {
        email,
        password,
        firstName,
        lastName,
        phone,
      });

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "80px" }}>
      <Card elevation={6} style={{ padding: "30px", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: "bold", color: "#1976d2" }}>
            Sign Up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                margin="dense"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{ style: { borderRadius: "8px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                margin="dense"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{ style: { borderRadius: "8px" } }}
              />
            </Grid>
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
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                margin="dense"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{ style: { borderRadius: "8px" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSignup} style={{ padding: "10px", borderRadius: "8px" }}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
