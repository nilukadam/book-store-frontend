const Order = require("../models/Order");

/*
------------------------------------------------
Create Order (Simulated Payment)
POST /api/orders
Access: User
------------------------------------------------
*/
const createOrder = async (req, res) => {
  try {

    const { products, totalAmount } = req.body;

    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      paymentStatus: "paid",
      orderStatus: "pending"
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);

  } catch (error) {

    res.status(500).json({
      message: "Server error while creating order"
    });

  }
};



/*
------------------------------------------------
Get Logged In User Orders
GET /api/orders/user
Access: User
------------------------------------------------
*/
const getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id
    });

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Server error while fetching user orders"
    });

  }
};



/*
------------------------------------------------
Get All Orders (Admin)
GET /api/orders
Access: Admin
------------------------------------------------
*/
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email");

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Server error while fetching orders"
    });

  }
};



/*
------------------------------------------------
Update Order Status (Admin)
PUT /api/orders/:id
Access: Admin
------------------------------------------------
*/
const updateOrderStatus = async (req, res) => {
  try {

    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.orderStatus = orderStatus;

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);

  } catch (error) {

    res.status(500).json({
      message: "Server error while updating order"
    });

  }
};


module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};