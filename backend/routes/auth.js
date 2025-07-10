// backend/routes/auth.js
const express = require("express");
const router = express.Router();

// Dummy login route
router.post("/login", (req, res) => {
  res.json({ message: "Login successful" });
});

// Dummy signup route
router.post("/signup", (req, res) => {
  res.json({ message: "Signup successful" });
});

module.exports = router;
