const express = require("express");
const connectdb = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();
const port = 5001;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
connectdb();
const authRoute = require("./Routes/authRoute");
const login= require("./Routes/authRoute");
const bookingRoutes=require("./Routes/ReservationRoute")
// console.log(process.env)

app.use("/api/auth", authRoute);
app.use("/api/auth", login)
app.use('/api/reservation', bookingRoutes);
app.all("*", (req, res) => {
  res.status(402).json({
    message: "Route not Found",
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
