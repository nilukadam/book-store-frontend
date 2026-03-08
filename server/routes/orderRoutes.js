const express = require("express");

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();



/*
---------------------------------------
Create Order
POST /api/orders
---------------------------------------
*/
router.post("/", protect, createOrder);



/*
---------------------------------------
Get Logged In User Orders
GET /api/orders/user
---------------------------------------
*/
router.get("/user", protect, getUserOrders);



/*
---------------------------------------
Get All Orders (Admin)
GET /api/orders
---------------------------------------
*/
router.get("/", protect, requireAdmin, getAllOrders);



/*
---------------------------------------
Update Order Status (Admin)
PUT /api/orders/:id
---------------------------------------
*/
router.put("/:id", protect, requireAdmin, updateOrderStatus);



module.exports = router;