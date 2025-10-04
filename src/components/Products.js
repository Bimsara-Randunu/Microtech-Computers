import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function ProductCard({ product, onDelete, onUpdate }) {
  const productImage = product.image ? `/images/${product.image}` : "/images/lap.jpg";

  return (
    <Card sx={{ maxWidth: 300, minWidth: 250, margin: "10px", boxShadow: 3, borderRadius: "8px" }}>
      <CardMedia component="img" height="160" image={productImage} alt={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Category:</strong> {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Price:</strong> Rs.{product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Stock:</strong> {product.stock}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="error" onClick={() => onDelete(product.id)}>
          Delete
        </Button>
        <Button size="small" variant="outlined" color="primary" onClick={() => onUpdate(product)}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // State for update popup
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, priceRange]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8083/api/v2/getAllProducts";

      if (categoryFilter && categoryFilter !== "All") {
        url = `http://localhost:8083/api/v2/filter/${categoryFilter}`;
      }

      if (priceRange.min && priceRange.max) {
        url = `http://localhost:8083/api/v2/filterprice/price-range?min=${priceRange.min}&max=${priceRange.max}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8083/api/v2/deleteProduct/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((product) => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Opens the update popup & sets selected product
  const handleOpenUpdateDialog = (product) => {
    setSelectedProduct(product);
    setOpenUpdateDialog(true);
  };

  // ✅ Handles update input changes
  const handleUpdateChange = (e) => {
    setSelectedProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Submits updated product
  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8083/api/v2/updateProduct`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      setOpenUpdateDialog(false);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error("Update Error:", err);
      alert(err.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Filter Sidebar */}
      <aside
        style={{
          width: "250px",
          padding: "20px",
          backgroundColor: "#f4f4f9",
          marginRight: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold" }}>
          Filters
        </Typography>
        <Typography>Category</Typography>
        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} fullWidth>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Mouse">Mouse</MenuItem>
          <MenuItem value="Keyboard">Keyboard</MenuItem>
        </Select>

        <Typography>Price Range</Typography>
        <TextField label="Min" name="min" type="number" fullWidth onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} />
        <TextField label="Max" name="max" type="number" fullWidth onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} />
        <Button variant="contained" color="primary" onClick={fetchProducts} sx={{ marginTop: "10px" }}>
          Apply Filters
        </Button>
      </aside>

      {/* Products Display */}
      <div style={{ flex: 1, padding: "20px" }}>
        {loading ? (
          <CircularProgress />
        ) : products.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "10px" }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={handleDelete} onUpdate={handleOpenUpdateDialog} />
            ))}
          </div>
        ) : (
          <Typography>No products available.</Typography>
        )}
      </div>

      {/* Update Product Popup */}
      <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff" }}>Update Product</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={selectedProduct?.name || ""} fullWidth onChange={handleUpdateChange} />
          <TextField label="Price" name="price" type="number" value={selectedProduct?.price || ""} fullWidth onChange={handleUpdateChange} />
          <TextField label="Stock" name="stock" type="number" value={selectedProduct?.stock || ""} fullWidth onChange={handleUpdateChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)} sx={{ color: "#1976d2" }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
