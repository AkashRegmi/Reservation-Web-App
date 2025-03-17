const jwt = require("jsonwebtoken")
const {JWT_SECRET}=require("../config/constant")

const checkAuth = (req, res, next) => {
    
    
    try {
        const token  =  req.cookies?.token || req.headers.tokens; //const token=req.headers.token they both are same .
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
      const user = jwt.verify(token, JWT_SECRET);
      console.log(user)
      req.authUser = user;
    //   console.log(user);
      next();
    } catch (error) {
      res.status(401).json({ message: "unauthorize token" });
    }
  };


  const checkAuthAdmin = (req, res, next) => {
    const token  =  req.cookies?.token || req.headers.tokens;
    // const { token } = req.headers; //const token=req.headers.token they both are same .
    try {
      const user = jwt.verify(token, JWT_SECRET_KEY);
      // console.log("Verified user:", user); 
      if (!user.roles.includes("admin")) {
        res
          .status(401)
          .json({ message: "Only Admin can access(Unauthorize Action)" });
        return;
      }
      req.authUser = user;
      // console.log(user);
      next();
    } catch (error) {
      
      res.status(401).json({ message: "unauthorize token" });
  
    }
  };
  
  module.exports={
    checkAuth,
    checkAuthAdmin,
  }
  