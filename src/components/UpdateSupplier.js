import React, { useState, useEffect } from "react";
import {
    Container, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField
} from "@mui/material";

export default function UpdateSupplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    // Fetch all suppliers from the backend
    const fetchSuppliers = async () => {
        try {
            const response = await fetch("http://localhost:8085/api/v1/suppliers/all");
            if (!response.ok) throw new Error("Failed to fetch suppliers");
            const data = await response.json();
            setSuppliers(data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    // Open dialog and set supplier details
    const handleOpen = (supplier) => {
        setSelectedSupplier({ ...supplier });
        setOpen(true);
    };

    // Close dialog
    const handleClose = () => {
        setOpen(false);
        setSelectedSupplier(null);
    };

    // Handle input field changes
    const handleChange = (e) => {
        setSelectedSupplier({ ...selectedSupplier, [e.target.name]: e.target.value });
    };

    // Handle update submission
    const handleSubmit = async () => {
        if (!selectedSupplier) return;

        try {
            const response = await fetch(`http://localhost:8085/api/v1/suppliers/update/${selectedSupplier.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedSupplier),
            });

            if (!response.ok) {
                alert("Failed to update supplier");
                return;
            }

            alert("Supplier updated successfully!");
            fetchSuppliers(); // Refresh the supplier list
            handleClose();
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    return (
        <Container>
            <h1>Supplier List</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.name}</TableCell>
                                <TableCell>{supplier.email}</TableCell>
                                <TableCell>{supplier.contactNumber}</TableCell>
                                <TableCell>{supplier.address}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpen(supplier)}
                                    >
                                        Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Update Supplier Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Supplier</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={selectedSupplier?.name || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={selectedSupplier?.email || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Contact Number"
                        name="contactNumber"
                        value={selectedSupplier?.contactNumber || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={selectedSupplier?.address || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
