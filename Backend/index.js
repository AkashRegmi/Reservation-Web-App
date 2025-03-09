const express = require("express");
const connectdb=require("./config/database")
const app = express();
const port= 5001;
connectdb();


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

app.all("*",(req,res)=>{
  res.status(402).json({
    message:"Route not Found"
  })
});

 app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  })

