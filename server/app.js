import express from "express"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT 
const app = express()

app.use(express.json())

// imports
import "./utils/dbConnect.js"
import router from "./controllers/user/index.js"
app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"The server is on"})
    } catch (error) {
        console.log(error);
        res.status(500),json(error)    }
})

app.use("/users",router)


app.listen(PORT,()=>{
    console.log(`The server is on at http://localhost:${PORT}`);
})