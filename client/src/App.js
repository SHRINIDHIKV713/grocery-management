import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Paper,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Select,InputLabel, FormControl } from "@mui/material";

function App() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: "",
    manDate: "",
  });
  const [inventory, setInventory] = useState([]);
  const [formErrors, setFormErrors] = useState({
    name: false,
    quantity: false,
    price: false,
    expiryDate: false,
    manDate: false,
    category: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getAllItems")
      .then((response) => setInventory(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const addItem = () => {
    const { name, category, quantity, price, expiryDate, manDate } = product;

    // Validation
    if (!name || !category || !quantity || !price || !expiryDate || !manDate) {
      setFormErrors({
        name: !name,
        category: !category,
        quantity: !quantity,
        price: !price,
        expiryDate: !expiryDate,
        manDate: !manDate,
      });
      return;
    }

    axios
      .post("http://localhost:3001/api/addItem", product)
      .then((response) => {
        setInventory([...inventory, { ...response.data }]);
        setProduct({
          name: "",
          category: "",
          quantity: "",
          price: "",
          expiryDate: "",
          manDate: "",
        });
        setFormErrors({
          name: false,
          category: false,
          quantity: false,
          price: false,
          expiryDate: false,
          manDate: false,
        });
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  return (
    <div
      style={{
        backgroundColor: "#87cefa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          maxWidth: 400,
          padding: 20,
          marginTop: "10px",
          textAlign: "center",
          height: "100%",
        }}
      >
        <h4>Grocery Inventory Management</h4>
        <form>
          <TextField
            label="Product Name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
            required
            error={formErrors.name}
          />
          <br />
             
<FormControl fullWidth style={{ marginTop: "7px" }}>
  <InputLabel id="demo-simple-select-label" style={{marginTop:"-7px"}}>Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Grouping"
    name="category"
    value={product.category}
    onChange={handleChange}
    error={formErrors.category}
    size="small"
    
  >
    <MenuItem value={"fruits"}>Fruits</MenuItem>
    <MenuItem value={"vegetables"}>Vegetables</MenuItem>
    <MenuItem value={"dairy"}>Dairy</MenuItem>
    <MenuItem value={"bakery"}>Bakery</MenuItem>
    <MenuItem value={"drygoods"}>Dry Goods</MenuItem>
   
  </Select>
</FormControl>
          <br />
          <TextField
            label="Quantity (kg)"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            size="small"
            error={formErrors.quantity}
          />
          <br />
          <TextField
            label="Price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            required
            error={formErrors.price}
          />
          <br />
          <TextField
            helperText="Manufacturing Date"
            type="date"
            name="manDate"
            value={product.manDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
            required
            error={formErrors.manDate}
          />
          <br />
          <TextField
            helperText="Expiry date"
            type="date"
            name="expiryDate"
            value={product.expiryDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
            required
            error={formErrors.expiryDate}
            inputProps={{
              min: product.manDate, // Set the min attribute to the manufacturing date
            }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addItem}
          >
            Add
          </Button>
        </form>
      </Paper>
      <TableContainer
        component={Paper}
        style={{
          marginTop: 20,
          width: "90%",
          padding: "20px",
          marginBottom: "10px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Manufacturing Date</TableCell>
              <TableCell>Expiry Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}kg</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.manDate}</TableCell>
                <TableCell>{item.expiryDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
