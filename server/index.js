const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const inventory = [];

app.post("/api/addItem", (req, res) => {
  try {
    const newItem = req.body;

    // Basic validation
    if (
      !newItem.name ||
      !newItem.category ||
      !newItem.quantity ||
      !newItem.price
    ) {
      throw new Error("Name, quantity, and price are required fields.");
    }

    inventory.push(newItem);
    res.json(newItem);
  } catch (error) {
    console.error("Error adding item:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/api/getAllItems", (req, res) => {
  try {
    res.json(inventory);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
