import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Admin Components
import Appbar from "./components/Appbar";
import Users from "./components/Users";
import UpdateUser from "./components/Updateuser";
import DeleteUser from "./components/Deleteuser";
import Products from "./components/Products";
import AddProduct from "./components/Addproduct";

// Supplier Components
import AddSupplier from "./components/AddSupplier";
import UpdateSupplier from "./components/UpdateSupplier";
import DeleteSupplier from "./components/DeleteSupplier";

// Customer Components
import AppbarCus from "./components/AppbarCus";
import ProductsCus from "./components/ProductsCus";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Default Route (Customer Product View) */}
        <Route path="/" element={<><AppbarCus userRole={userRole} setUserRole={setUserRole} /><ProductsCus /></>} />
        
        {/* Admin Routes */}
        <Route path="/products" element={<><Appbar /><Products /></>} />
        <Route path="/add-product" element={<><Appbar /><AddProduct /></>} />
        <Route path="/update-user" element={<><Appbar /><UpdateUser /></>} />
        <Route path="/delete-user" element={<><Appbar /><DeleteUser /></>} />
        <Route path="/users" element={<><Appbar /><Users /></>} /> {/* Company Users Page */}

        {/* Supplier Routes */}
        <Route path="/add-supplier" element={<><Appbar /><AddSupplier /></>} />
        <Route path="/update-supplier" element={<><Appbar /><UpdateSupplier /></>} />
        <Route path="/delete-supplier" element={<><Appbar /><DeleteSupplier /></>} />

        {/* Customer Routes */}
        <Route path="/products-cus" element={<><AppbarCus userRole={userRole} setUserRole={setUserRole} /><ProductsCus /></>} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
