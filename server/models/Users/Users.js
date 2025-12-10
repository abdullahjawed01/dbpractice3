import mongoose from "mongoose";

const newSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        minlength: [18, "Miniumum age is 18"],
        maxlength: [80, "max age ism 80"],
    },
    phone:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    OTP:{
        type:Number,
        default:null,
    },
    isVerified:{
      type: Boolean,
      default:false
    }
   
},{ timestamps:true
})

const userModel = mongoose.model("user",newSchema)

export default userModel