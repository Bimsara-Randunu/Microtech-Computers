import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AppbarCus({ userRole, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole(null);
    navigate("/"); // Redirect to home
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #0d47a1 30%, #1976d2 90%)",
        padding: "8px 0",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          <center>MICROTECH COMPUTERS</center>
        </Typography>
        {userRole ? (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={() => navigate("/login")}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
