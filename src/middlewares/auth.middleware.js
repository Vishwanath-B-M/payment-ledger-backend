const jwt=require("jsonwebtoken")
const usermodel = require("../models/user.model")
const accountmodel = require("../models/account.model")
const blacklistmodel=require("../models/blacklist.model")


async function userCheck(req,res,next) {
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"unathorized access"
        })
    }
    const  blacklist=await blacklistmodel.findOne({token})
   if(blacklist){
    return res.status(400).json({
        message:"unathorized access"
    })
}
    try{
        const decoded=jwt.verify(token,process.env.jwturl)
        console.log(decoded)
    const user=await usermodel.findById(decoded.userid)
    req.user=user
    console.log(req.user)
    if(!user){
        return res.status(401).json({
            message:"user is not exists"
        })
    }
   return next()
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"unathorized access"
        })
    }
}
async function systemUsercheck(req,res,next) {
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(403).json({
            message:"you are forbidden"
        })
    }
    const  blacklist=await blacklistmodel.findOne({token})
   if(blacklist){
    return res.status(400).json({
        message:"unathorized access"
    })
}
   try{ 
    const decoded=jwt.verify(token,process.env.jwturl)
    const user=await usermodel.findById(decoded.userid).select("+systemUser")
    if(!user.systemUser){
        return res.status(403).json({
            message:"you are not allowed"
        })
    }
    req.user=user
    return next()
}catch(err){
    console.log(err)
        return res.status(401).json({
            message:"token is invalid"
        })
    }
    
}
module.exports={userCheck,systemUsercheck}