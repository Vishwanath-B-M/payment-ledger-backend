
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
async function getAllaccounts(req,res) {
    const user=req.user
    console.log(user)
    const accounts=await accountmodel.find({user:req.user._id})
    res.status(200).json({
        message:"accounts",
        accounts
    })
    
}
async function getBalance(req,res) {
    const {accountid}=req.body
    const useraccountisthere=await accountmodel.findOne({
        _id:accountid,user:req.user._id})
        if(!useraccountisthere){
            return res.status(400).json({
                message:"you can't bro"
            })
        }
        const balance=await accountmodel.balance()
        res.status(200).json({
            message:"balance is here",
            accountid:account._id,
            balance:balance
        })
    
}
module.exports={createAccount,getAllaccounts,getBalance}