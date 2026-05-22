const express=require('express')
const authMiddleware=require("../middlewares/auth.middleware")
const router=express.Router()
router.post("/transcation",authMiddleware.userCheck,transcation.)
module.exports=router;