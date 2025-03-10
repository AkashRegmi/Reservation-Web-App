const express= require("express");
const { signup } = require( "../controller/authController");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const signUpValidator = [
    body("email").notEmpty().isEmail().withMessage("invalid email"),
    body("name")
      .isLength({ min: 3, max: 20 })
      .notEmpty()
      .withMessage("please entre the name betn 3 and 20 characers"),
    body("password").notEmpty(),
    
  ];

  router.post("/sign-up",signUpValidator, signup);

  module.exports=router;

