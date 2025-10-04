import React, { useState, useEffect } from 'react';
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function UpdateUser() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    role: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/getUser");
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Expected an array of users but got:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleOpen = (user) => {
    setUpdatedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/updateUser", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        alert("User updated successfully!");
        handleClose();
        // Refetch the users after update
        const usersResponse = await fetch("http://localhost:8080/api/v1/getUser");
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } else {
        alert("Error updating user");
      }
    } catch (error) {
      console.error("Error submitting update:", error);
    }
  };

  return (
    <Container>
      <h1>Update User</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(user)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for updating user */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            name="username"
            value={updatedUser.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            label="Role"
            name="role"
            value={updatedUser.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={updatedUser.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={updatedUser.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
