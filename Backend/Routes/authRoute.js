const express = require("express");
const { signup, signin } = require("../controller/authController");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  validateSignin,
  validateSignup,
} = require("../middleware/authMiddleware");

router.post("/signup", validateSignup, signup);

router.post("/signin", validateSignin, signin);

module.exports = router;
