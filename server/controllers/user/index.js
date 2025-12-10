import express from "express"
import userModel from "../../models/Users/Users.js";
import bcrypt, { compare } from  "bcrypt"
import email from "../../utils/mail.js"
const router = express.Router()

router.get("/getall", async (req, res) => {
    try {
        let check = await userModel.find()
        res.status(200).json({ msg: "All users are ", check })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        let userInput = req.body
        let find = await userModel.findOne({email: userInput.email})
         if(find){
            res.status(400).json({msg:"The email already exist"})
        }else{
        let OTP = Math.floor(Math.random()* (9999 - 1000)+1000)
        await email(userInput.email,OTP)
        userInput.password = await bcrypt.hash(userInput.password,10)
        userInput.OTP = OTP
       
       
        let check = await userModel.create(userInput)
        res.status(200).json({ msg: check })}
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.post("/verify",async(req,res)=>{
    try {
        let userInput = req.body 
        let find = await userModel.findOne({email:userInput.email})

        if(userInput.OTP==find.OTP){
            console.log("OTP verify succefully");
           await userModel.updateOne(
             { email: find.email },
             {$set: {isVerified:"true"}}
                );
            await userModel.updateOne(
            {email: find.email},
            { $unset: { OTP: "" } }
            )
            
            res.status(200).json({msg:"OTP verified succesfully"})
        }else{
            console.log("Invalid OTP");
             res.status(400).json({msg:"invalid"})
        }
    } catch (error) {
        console.log(error);
    }
})


router.post("/login",async(req,res)=>{
    try {
        let userInput = req.body 
        let find = await userModel.findOne({email:userInput.email})
           let check = await compare(userInput.password,find.password)
        if(userInput.email !== find.email){
            console.log("User not exist please register");
          return   res.status(404).json({msg:"user not found"})  
          
        }
        if(!check){
             console.log("Password is wrong");
            return res.status(404).json({msg:"password is wrong "})  
        }
        if(find.isVerified == false){
            console.log("Go verify your otp");
            return res.status(404).json({msg:"The otp is not verified please head to verify page"})
        }
        if(check){
            console.log("User logged in successfully");
            return res.status(200).json({msg:'User logged in successfully'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})





router.get("/findbyId", async (req, res) => {
    try {
        let check = await userModel.findById({ _id: "69392654c767ccc692c2cc9c" })
        res.status(200).json({ check })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.delete("/deleteOne", async (req, res) => {
    try {
        let check = await userModel.deleteOne({ _id: "69392654c767ccc692c2cc9c" })
        res.status(200).json({ check })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.put("/updateOne",async (req, res) => {
    try {
        let check = await userModel.updateOne({ _id: "6939264ec767ccc692c2cc9a" },{gender:"Female"},{new:true})//  $set: { age: 44 })both can be used
        res.status(200).json({ check })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



export default router