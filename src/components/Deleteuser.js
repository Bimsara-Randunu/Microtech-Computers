import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Paper, Button, TextField } from '@mui/material';

export default function DeleteUser() {
    const [id, setId] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch all users when the component loads
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/getUser")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const handleDelete = async () => {
        if (!id) {
            alert("Please enter a valid user ID");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/deleteUser/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("User deleted successfully!");
                setId(''); // Clear input field
                setUsers(users.filter(user => user.id !== parseInt(id))); // Update user list
            } else {
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting user");
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '50px 20px', width: 600, margin: "20px auto" }}>
                <h1 style={{ color: "red" }}><u><center>Delete User</center></u></h1>
                <TextField 
                    label="Enter User ID" 
                    variant="outlined" 
                    fullWidth 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                />
                <Button variant="contained" color="error" onClick={handleDelete} style={{ marginTop: '10px' }}>
                    Delete User
                </Button>
            </Paper>
        </Container>
    );
}
