const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// Admin only route
router.get("/admin-test", protect, requireAdmin, (req, res) => {
  res.json({
    message: "Admin route accessed"
  });
});

module.exports = router;