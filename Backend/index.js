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
// console.log(process.env)

app.use("api/auth", authRoute);

app.all("*", (req, res) => {
  res.status(402).json({
    message: "Route not Found",
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
