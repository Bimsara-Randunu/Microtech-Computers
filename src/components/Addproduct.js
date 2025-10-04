import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [product, setProduct] = useState({ name: "", category: "", price: "", stock: "", image: "" });
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setProduct({ ...product, image: fileName });
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8083/api/v2/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product added successfully!");
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="name"
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          type="number"
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Stock"
          name="stock"
          type="number"
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: "15px 0" }}
        />
        {imagePreview && (
          <Box sx={{ marginBottom: "16px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
    </Container>
  );
}
