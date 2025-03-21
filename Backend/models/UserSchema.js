
const mongoose = require("mongoose");

//This is  the schema for the User 

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    roles: {
    type: String, enum:['customer','admin'],
    default: "customer" , 
  },
},{
    timestamps:true,
}
);

const User= mongoose.model("User",userSchema);
module.exports= User;
