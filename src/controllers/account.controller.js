
const accountmodel=require("../models/account.model")

async function createAccount(req,res) {
    const user=req.user
    const account=await accountmodel.create({
        account:user._id
    })
    res.status(201).json({
        message:"account created succefully",
        account
    })
    
}
module.exports={createAccount}