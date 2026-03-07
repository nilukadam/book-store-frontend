const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");


// ================= PUBLIC ROUTES =================

// Get all products
router.get("/", getProducts);

// Get single product by ID
router.get("/:id", getProductById);


// ================= ADMIN ROUTES =================

// Create new product
router.post("/", protect, requireAdmin, createProduct);

// Update product
router.put("/:id", protect, requireAdmin, updateProduct);

// Delete product
router.delete("/:id", protect, requireAdmin, deleteProduct);


module.exports = router;