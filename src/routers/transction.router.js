const express=require('express')
const authMiddleware=require("../middlewares/auth.middleware")
const transcationController=require("../controllers/transcation.controller")
const router=express.Router()
router.post("/transcation",authMiddleware.userCheck,transcationController.transcation)
router.post("/fundtranscation",authMiddleware.systemUsercheck,transcationController.fundtranscation)
module.exports=router;