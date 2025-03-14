const jwt = require("jsonwebtoken")
const {JWT_SECRET}=require("../config/constant")

const checkAuth = (req, res, next) => {
    console.log(req.cookies);
    const token  = req.cookies.token ?? req.headers.token; //const token=req.headers.token they both are same .
    try {
      const user = jwt.verify(token, JWT_SECRET_KEY);
      req.authUser = user;
      // console.log(user);
      next();
    } catch (error) {
      res.status(401).json({ message: "unauthorize token" });
    }
  };