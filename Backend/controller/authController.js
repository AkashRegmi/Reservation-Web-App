const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User  = require("../models/UserSchema");
const {JWT_SECRET}=require("../config/constant")


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
        // Check if all required fields are present
        if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required (name, email, password)" });
        }

    // Check for the user is already there.

    const existingUser =  await User.findOne({ email});
    if (existingUser) {
      console.log(existingUser)
       res.status(400).json({
        message: "User Already Exist",
        
      });
      return;
    }

    //hashing the Password
    const salt =   bcrypt.genSaltSync(10);
    const hashedPassword =  bcrypt.hashSync(password, salt);

    //Savinfg the user in the Mongodb
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    //Generating the token

    // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: "7d",
    // });

    // res.status(201).json({
    //   message: "User created successfully",
    //   token,
    //   userId: newUser._id,
    // });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message || "Unknown error",
    });
  }
};

const signin= async(req,res)=>{
  try {
    const{email,password}=req.body;;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message:"User not Found.Please Sign-Up!"
      })
    }
     
    const isValidPassword= await bcrypt.compare(password,user.password);
    if(!isValidPassword){
      return res.status(400).json({
        message:"Invalid Credential"
      })
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
  );

  // Send response with token
  res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id
  });
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error ",
      error:error.message || "Unknown error"
    })
  }
 

}

module.exports = {
  signup,
  signin,
 
};
