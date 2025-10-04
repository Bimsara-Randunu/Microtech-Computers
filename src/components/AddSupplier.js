import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

export default function Suppliers() {
    const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null); // Store supplier to update

    const API_URL = "http://localhost:8085/api/v1/suppliers"; // Base API URL

    // Fetch all suppliers
    const fetchSuppliers = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/all`);
            if (!response.ok) throw new Error("Failed to fetch suppliers");
            const data = await response.json();
            setSuppliers(data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    }, []);

    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    // Search supplier by ID
    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            fetchSuppliers();
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setSuppliers([data]); // Show only the searched supplier
            } else {
                setSuppliers([]);
                alert("Supplier not found");
            }
        } catch (error) {
            console.error("Error searching supplier:", error);
        }
    };

    // Add a new supplier
    const handleSubmit = async (e) => {
        e.preventDefault();
        const supplierData = { name, contactNumber, email, address };

        try {
            await fetch(`${API_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(supplierData),
            });

            alert("Supplier added successfully!");
            setName("");
            setContactNumber("");
            setEmail("");
            setAddress("");
            fetchSuppliers();
        } catch (error) {
            console.error("Error adding supplier:", error);
            alert("An error occurred while adding the supplier");
        }
    };

    // Update an existing supplier
    const handleUpdate = async () => {
        if (!selectedSupplier) {
            alert("Select a supplier to update");
            return;
        }

        const updatedSupplier = {
            name,
            contactNumber,
            email,
            address,
        };

        try {
            const response = await fetch(`${API_URL}/update/${selectedSupplier.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedSupplier),
            });

            if (!response.ok) throw new Error("Failed to update supplier");

            alert("Supplier updated successfully!");
            setName("");
            setContactNumber("");
            setEmail("");
            setAddress("");
            setSelectedSupplier(null);
            fetchSuppliers(); // Refresh list after update
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    // Select a supplier for editing
    const handleEdit = (supplier) => {
        setSelectedSupplier(supplier);
        setName(supplier.name);
        setContactNumber(supplier.contactNumber);
        setEmail(supplier.email);
        setAddress(supplier.address);
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>
                    <u>
                        <center>Supplier Management</center>
                    </u>
                </h1>

                {/* Search Bar */}
                <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
                    <TextField
                        label="Search by Supplier ID"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                </Box>

                {/* Add / Update Supplier Form */}
                <Box component="form" sx={{ "& > :not(style)": { m: 1 } }} noValidate autoComplete="off">
                    <TextField label="Supplier Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="Contact Number" variant="outlined" fullWidth value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Address" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                    {selectedSupplier ? (
                        <Button variant="contained" color="warning" onClick={handleUpdate}>
                            Update Supplier
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleSubmit}>
                            Add Supplier
                        </Button>
                    )}
                </Box>

                {/* Display Supplier List */}
                <h2>Supplier List</h2>
                {suppliers.length > 0 ? (
                    suppliers.map((supplier) => (
                        <Paper key={supplier.id} elevation={2} style={{ padding: 10, margin: 10 }}>
                            <p><strong>ID:</strong> {supplier.id}</p>
                            <p><strong>Name:</strong> {supplier.name}</p>
                            <p><strong>Contact:</strong> {supplier.contactNumber}</p>
                            <p><strong>Email:</strong> {supplier.email}</p>
                            <p><strong>Address:</strong> {supplier.address}</p>
                            <Button variant="contained" color="primary" onClick={() => handleEdit(supplier)}>
                                Edit
                            </Button>
                        </Paper>
                    ))
                ) : (
                    <p>No suppliers found</p>
                )}
            </Paper>
        </Container>
    );
}
