import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

async function connect() {
    try {
        let URI = process.env.DBURI 
        await mongoose.connect(URI)
        console.log('database connected');
    } catch (error) {
        console.log(error);
    }

}
connect()