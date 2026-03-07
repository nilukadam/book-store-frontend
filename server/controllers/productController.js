const Product = require("../models/Product");


// ================= GET ALL PRODUCTS =================
// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= GET SINGLE PRODUCT =================
// GET /api/products/:id
const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= CREATE PRODUCT =================
// POST /api/products (Admin only)
const createProduct = async (req, res) => {
  try {

    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= UPDATE PRODUCT =================
// PUT /api/products/:id (Admin only)
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= DELETE PRODUCT =================
// DELETE /api/products/:id (Admin only)
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= EXPORT CONTROLLERS =================
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};