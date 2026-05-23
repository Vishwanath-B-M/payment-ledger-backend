const express=require("express")
const accountController=require("../controllers/account.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const router=express.Router();
router.post("/create",authMiddleware.userCheck,accountController.createAccount)
router.get("/accounts",authMiddleware.userCheck,accountController.getAllaccounts)
router.get("/accounts/:accountid",authMiddleware.userCheck,accountController.getBalance)


module.exports=router;