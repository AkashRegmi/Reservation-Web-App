const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Reservation-Web-App", );
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;