const mongoose=require('mongoose')

const transactionShcema=new mongoose.Schema({
    fromaccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        index:true,
        required:[true,"transcation from sender side"]
    },
    toaccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"reciver side to whom"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["pending","complited","failed","reversed"],
            message:"valuse either be above 4 of one",
        },
        default:"pending"
    },
    amount:{
        type:Number,
        required:[true,'amount is required to create a transcation'],
        min:[0,"min amount is required more then 0"]
    },
    idempotencykey:{
        type:String,
        require:[true,'must be there for a transcation'],
        unique:[true,'it is unique for every transcation'],
        index:true
    }
},{
    timestamps:true
})
const transactionmodel=mongoose.model("transcation",transactionShcema)
module.exports=transactionmodel;