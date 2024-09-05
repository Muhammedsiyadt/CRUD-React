// import express from 'express' 
require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const database = require('../src/models/connection')

const userRouter = require("./Router/userRouter"); 
const adminRouter = require("./Router/adminRouter");   
  
database()    
   
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));  

app.use(         
  cors({   
    origin: "http://localhost:5173",          
    credentials: true,
  })   
);   


app.use(morgan("tiny"));         
    
app.get("/", (req, res) => { 
  res.send("Server ok");         
});
       
app.use("/user", userRouter);
app.use("/admin", adminRouter);         

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);  
});
