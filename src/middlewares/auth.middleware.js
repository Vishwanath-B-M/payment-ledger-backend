const jwt=require("jsonwebtoken")
const usermodel = require("../models/user.model")


async function userCheck(req,res,next) {
    const token=req.cookies.token||req.headers.authorization?.split("")[1]
    if(!token){
        return res.status(401).json({
            message:"unathorized access"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.jwturl)
    const user=await usermodel.findById(decoded.userid)
    req.user=user
   return next()
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"unathorized access"
        })
    }
}
module.exports={userCheck}