const usermodel=require("../models/user.model")
const jwt=require("jsonwebtoken")

async function register(req,res) {
    const {email,name,password}=req.body
    const isExist=await usermodel.findOne({
        email:email
    })
    if(isExist){
        return res.status(422).json({
            message:"user is already exist with this email"
        })
    }
    const createuser=await usermodel.create({
        name,email,password
    })
const token=jwt.sign({userid:createuser._id},process.env.jwturl,{expiresIn:"5d"})
     res.cookie("token",token)
     res.status(201).json({
    message:"registration is complited succefully",
    user:{
        name:createuser.name,
        id:createuser._id,
        email:createuser.email,  
    }
}) 
}
async function login(req,res) {
    const {email,password}=req.body
    const isuser=await usermodel.findOne({email}).select("+password")
    if(!isuser){
        return res.status(200).json({
            message:"email or password is invalid"
        })
    }
    const validornot=await isuser.compare(password)
    if(!validornot){
        return res.status(200).json({
            message:"invalid password"
        })
    }
    const token=jwt.sign({userid:isuser._id},process.env.jwturl,{expiresIn:"5d"})
    res.cookie('token',token)
    res.status(201).json({
        message:"login succefully",
        user:{
            name:isuser.name,
            email:isuser.email,
            id:isuser._id
        }
    })  
}
module.exports={register,login}