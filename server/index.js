const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes");
const mongoose = require("mongoose")

const User = require("./models/User");



// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// usr Route

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// app.get("/debug-users", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

app.get("/debug-db", (req, res) => {
  res.json({
    dbName: mongoose.connection.name,
    host: mongoose.connection.host
  });
});