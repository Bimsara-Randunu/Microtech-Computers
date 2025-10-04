import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Appbar() {
  const [userMenu, setUserMenu] = React.useState(null);
  const [productMenu, setProductMenu] = React.useState(null);
  const [supplierMenu, setSupplierMenu] = React.useState(null);

  const handleUserMenuOpen = (event) => setUserMenu(event.currentTarget);
  const handleUserMenuClose = () => setUserMenu(null);

  const handleProductMenuOpen = (event) => setProductMenu(event.currentTarget);
  const handleProductMenuClose = () => setProductMenu(null);

  const handleSupplierMenuOpen = (event) => setSupplierMenu(event.currentTarget);
  const handleSupplierMenuClose = () => setSupplierMenu(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #0d47a1 30%, #1976d2 90%)",
          padding: "8px 0",
        }}
      >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* User Management Dropdown */}
          <Button
            color="inherit"
            onClick={handleUserMenuOpen}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            User
          </Button>
          <Menu anchorEl={userMenu} open={Boolean(userMenu)} onClose={handleUserMenuClose}>
            <MenuItem component={Link} to="/users" onClick={handleUserMenuClose}>
              Add User
            </MenuItem>
            <MenuItem component={Link} to="/update-user" onClick={handleUserMenuClose}>
              Update User
            </MenuItem>
            <MenuItem component={Link} to="/delete-user" onClick={handleUserMenuClose}>
              Delete User
            </MenuItem>
          </Menu>

          {/* Supplier Management Dropdown */}
          <Button
            color="inherit"
            onClick={handleSupplierMenuOpen}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Supplier
          </Button>
          <Menu anchorEl={supplierMenu} open={Boolean(supplierMenu)} onClose={handleSupplierMenuClose}>
            <MenuItem component={Link} to="/add-supplier" onClick={handleSupplierMenuClose}>
              Add Supplier
            </MenuItem>
            <MenuItem component={Link} to="/update-supplier" onClick={handleSupplierMenuClose}>
              Update Supplier
            </MenuItem>
            <MenuItem component={Link} to="/delete-supplier" onClick={handleSupplierMenuClose}>
              Delete Supplier
            </MenuItem>
          </Menu>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            MICROTECH COMPUTERS SOLUTIONS
          </Typography>

          {/* Products Dropdown */}
          <Button
            color="inherit"
            onClick={handleProductMenuOpen}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Products
          </Button>
          <Menu anchorEl={productMenu} open={Boolean(productMenu)} onClose={handleProductMenuClose}>
            <MenuItem component={Link} to="/products" onClick={handleProductMenuClose}>
              Product List
            </MenuItem>
            <MenuItem component={Link} to="/add-product" onClick={handleProductMenuClose}>
              Add Product
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
