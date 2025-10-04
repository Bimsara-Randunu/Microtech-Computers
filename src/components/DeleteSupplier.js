import React, { useState } from "react";
import { Container, Paper, Button, TextField } from "@mui/material";

export default function DeleteSupplier() {
    const [id, setId] = useState("");

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8085/api/v1/suppliers/delete/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Supplier deleted successfully!");
                setId("");
            } else {
                alert("Failed to delete supplier");
            }
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: "50px 20px", width: 600, margin: "20px auto" }}>
                <h1 style={{ color: "red" }}><u><center>Delete Supplier</center></u></h1>
                <TextField label="Enter Supplier ID" fullWidth value={id} onChange={(e) => setId(e.target.value)} />
                <Button variant="contained" color="error" onClick={handleDelete}>Delete Supplier</Button>
            </Paper>
        </Container>
    );
}
