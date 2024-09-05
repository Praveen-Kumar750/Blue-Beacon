import express, { urlencoded } from "express";
import cors from "cors";
import cookeiParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.jsx";
import bodyParser from "body-parser";
import path from "path";
import userRoute from "./routes/user_routes.js";

dotenv.config({});
const app=express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cookeiParser());


const corsOption={
    origin:'http://localhost:5173',
    
    credentials:true,
}


app.use(cors(corsOption));
const PORT=process.env.PORT;

app.use("/user",userRoute);



//start
//import models
// const User = require('./models/user');
// const Beach = require('./models/beach');
// const OceanicParameters = require('./models/oceanicparameters');
// const MeteorologicalParameters = require('./models/meteorologicalparameters');
// const WaterQuality = require('./models/waterquality');
// const SuitabilityAssessment = require('./models/suitability');
// const Notification = require('./models/notification');
// const APIInteraction = require('./models/apiinteraction');
//const GeospatialVisualization = require('./models/geospatialvisual');


























app.get("/",(req,res)=>{
   return res.status(200).json({
    message:"I'm coming from backend",
    success:true,
   })
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`server listen at port ${PORT}`);
})
