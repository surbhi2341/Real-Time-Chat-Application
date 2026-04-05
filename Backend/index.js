//const express = require('express')// method-1 
import express from "express"; //method 2 isko react ki trah use krne ke liye package.json me module add krna prta h 
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoute.js"
//import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";



dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/user",userRoute);
// http://localhost:8080/api/v1/user/register
app.use("/api/v1/message",messageRoute);



app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});

