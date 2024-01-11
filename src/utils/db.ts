import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

 
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL as string
       await mongoose.connect(uri)
        console.log("Connection to databse is successful")
    } catch (error) {
        console.log("Connection to database is unsuccessful")   
    }
}



export default connectDB;