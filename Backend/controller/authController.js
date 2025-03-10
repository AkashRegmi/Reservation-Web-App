const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/UserSchema");

 const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for the user is already there.

    const existingUser = User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User Already Exist",
      });
      return;
    }

    //hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    //Savinfg the user in the Mongodb
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.Save();
    //Generating the token

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports={
    signup,
}