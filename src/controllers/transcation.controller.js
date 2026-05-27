const transcationmodel=require('../models/transcation.model')
const ledgermodel=require('../models/ledger.model')
const accountmodel=require("../models/account.model")
const transactionmodel = require('../models/transcation.model')
const usermodel=require("../models/user.model")
const { default: mongoose } = require('mongoose')
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
    if(findfromaccount.status!=="active"||findtoaccount.status!=="active"){
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
    const session= await mongoose.startSession()
    session.startTransaction()
    const transcation=await transactionmodel.create([{
        fromaccount,
        toaccount,
        amount,
        idempotencykey,
        status:'pending'

    }],{session})
    const debitledgerentry=await ledgermodel.create([{
        account:fromaccount,
        amount:amount,
        transcation:transcation[0]._id,
        type:"debit"

    }],{session})
    const creditledgerentry=await ledgermodel.create([{
        account:toaccount,
        amount:amount,
        transcation:transcation[0]._id,
        type:"credit"
    }],{session})
    transcation.status="complited"
    await transcation.save({session})
    await session.commitTransaction()
    session.endSession()
    if(transcation.status==="complited"){
       return  res.status(200).json({
        message:"transcation complited"
    })
     }

}
async function fundtranscation(req,res) {
    const {toaccount,amount,idempotencykey}=req.body
    if(!toaccount||!amount||!idempotencykey){
        return res.status(400).json({
            message:"you have to pass the toaccount ,amount and idempotencykey"
        })
    }
    const exitsoftoaccount=await accountmodel.findOne({
        _id:toaccount
    })
    if(!exitsoftoaccount){
        return res.status(400).json({
            message:"to account is not exits"
        })
    }
    const systemUser = await usermodel.findOne({
        systemUser:true
    }).select("+systemUser")
    
    if(!systemUser){
        return res.status(400).json({
            message:"system user not found"
        })
    }
    const fromaccount=await accountmodel.findOne({account:systemUser._id})
    if(!fromaccount){
        return res.status(400).json({
            message:"there is no system user"
        })
    }
    const session=await mongoose.startSession()
    session.startTransaction()
    const transcation=await transcationmodel.create([{
        fromaccount:fromaccount._id,
        toaccount:toaccount,
        amount:amount,
        idempotencykey:idempotencykey,
        status:"pending"
    }],{session})
    const debitledgerentry=await ledgermodel.create([{
        account:fromaccount._id,
        transaction: transcation[0]._id,
        amount:amount,
        type:"debit"
    }],{session})
    const creditledgerentry=await ledgermodel.create([{
        account:toaccount,
        transaction: transcation[0]._id,
        amount:amount,
        type:'credit'
    }],{session})
    transcation[0].status="complited"
    await transcation[0].save({session})
    await session.commitTransaction()
    session.endSession()
    return res.status(200).json({
        message:"initial fund transcation done succefully"
    })
}
module.exports={transcation,fundtranscation}