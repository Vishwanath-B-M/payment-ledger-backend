const transcationmodel=require('../models/transcation.model')
const ledgermodel=require('../models/ledger.model')
const accountmodel=require("../models/account.model")
const transactionmodel = require('../models/transcation.model')
async function transcation(req,res) {
    const {fromaccount,toaccount,amount,idempotencykey}=req.body
    if(!fromaccount||!toaccount||!amount||!idempotencykey){
        return res.status(400).json({
            message:'fromaccount toaccount amount and key are required to proccess'
        })
    }
    const findfromaccount=await accountmodel.findOne({
        _id:fromaccount
    })
    const findtoaccount=await accountmodel.findOne({
        _id:toaccount
    }) 
    if(!findfromaccount||!findtoaccount){
        return res.status(400).json({
            message:"invalid fromaccount or toaccount"
        })
    } 
    const isidempotencykeyexits=await transactionmodel.findOne({
        idempotencykey:idempotencykey
    })  
    if(isidempotencykeyexits){
        if(isidempotencykeyexits.status==="complited"){
        return res.status(200).json({
            message:"transcation already complited"
        })
    }
        if(isidempotencykeyexits.status=="pending"){
            return res.status(200).json({
                message:"transcation is pending"
            })
        }
        if(isidempotencykeyexits.status==="failed"){
            return res.status(500).json({
                message:"transcation failed"
            })
        }
        if(isidempotencykeyexits.status==="reversed"){
            return res.status(500).json({
                message:"transcation is reversed please try again"
            })
        }
    }
    if(findfromaccount.status!=="active"||findtoaccount!=="active"){
        return res.status(400).json({
            message:"both account must be active to proccess the transcation"
        })
    }
    const balance=await findfromaccount.balance()
    if(balance<amount){
        return res.status(400).json({
            message:`insufficient balance ,and balance is ${balance}}`
        })
    }
}