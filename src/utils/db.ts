import mongoose from "mongoose";
import dotenv from 'dotenv'
import Banner from "../models/Banner";

dotenv.config();

 
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL as string
       await mongoose.connect(uri)
        console.log("Connection to Databse is successful")
    } catch (error) {
        console.log("Connection to Database is unsuccessful")   
    }
}



export default connectDB;