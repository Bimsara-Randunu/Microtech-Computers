import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function ProductCard({ product }) {
  const productImage = product.image ? `/images/${product.image}` : "/images/lap.jpg";

  return (
    <Card
      sx={{
        maxWidth: 300,
        minWidth: 250,
        margin: "10px",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
      }}
    >
      <CardMedia component="img" height="160" image={productImage} alt={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h6">
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
    </Card>
  );
}

export default function ProductsCus() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

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

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* Filter Sidebar */}
      <aside
        style={{
          width: "260px",
          padding: "20px",
          background: "linear-gradient(135deg, #0d47a1 30%, #1976d2 90%)",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h6" gutterBottom style={{ fontWeight: "bold", textAlign: "center" }}>
          Filters
        </Typography>
        
        {/* Category Filter */}
        <Typography>Category</Typography>
        <Select
          value={categoryFilter}
          onChange={handleCategoryFilter}
          fullWidth
          style={{
            marginBottom: "15px",
            background: "#fff",
            borderRadius: "5px",
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Mouse">Mouse</MenuItem>
          <MenuItem value="Keyboard">Keyboard</MenuItem>
        </Select>

        {/* Price Range Filter */}
        <Typography>Price Range</Typography>
        <TextField
          label="Min"
          name="min"
          value={priceRange.min}
          onChange={handlePriceChange}
          type="number"
          fullWidth
          style={{ marginBottom: "10px", background: "#fff", borderRadius: "5px" }}
        />
        <TextField
          label="Max"
          name="max"
          value={priceRange.max}
          onChange={handlePriceChange}
          type="number"
          fullWidth
          style={{ marginBottom: "20px", background: "#fff", borderRadius: "5px" }}
        />

        <Button
          variant="contained"
          onClick={fetchProducts}
          fullWidth
          sx={{
            backgroundColor: "#ff9800",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e68900" },
          }}
        >
          Apply Filters
        </Button>
      </aside>

      {/* Products Display */}
      <div style={{ flex: 1, padding: "20px" }}>
        {loading ? (
          <CircularProgress />
        ) : products.length ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Typography style={{ textAlign: "center", fontWeight: "bold", color: "#555" }}>
            No products available.
          </Typography>
        )}
      </div>
    </div>
  );
}
