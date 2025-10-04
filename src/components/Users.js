import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, MenuItem } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

export default function Users() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch all users
    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/getUser');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Search users by ID or Name
    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            fetchUsers(); // If search is empty, show all users
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/getUser/${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : [data]); // Ensure data is in array format
            } else {
                setUsers([]);
                alert('User not found');
            }
        } catch (error) {
            console.error('Error searching user:', error);
        }
    };

    // Add a new user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, address, email, password, role, phone };

        try {
            await fetch('http://localhost:8080/api/v1/addUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            alert('User added successfully!');
            setUsername('');
            setAddress('');
            setEmail('');
            setPassword('');
            setRole('');
            setPhone('');
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred while adding the user');
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: 'blue' }}><u><center>Add Users</center></u></h1>

                {/* Search Bar */}
                <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                    <TextField
                        label="Search by ID or Name"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </Box>

                {/* Add User Form */}
                <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
                    <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="User Address" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                    <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField
                        select
                        label="Role"
                        variant="outlined"
                        fullWidth
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                    </TextField>
                    <TextField label="Phone" variant="outlined" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Button variant="contained" onClick={handleSubmit}>Add User</Button>
                </Box>

                {/* Display User List */}
                <h2>User List</h2>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Paper key={user.id} elevation={2} style={{ padding: 10, margin: 10 }}>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Name:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                        </Paper>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </Paper>
        </Container>
    );
}
