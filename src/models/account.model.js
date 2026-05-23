const mongoose=require('mongoose')
const ledgermodel = require('./ledger.model')
const accountschema=new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"must be there"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["active",'frozen',"deleted"],
            message:"status can be either 3 of this",
        },
           default:"active"
    },
    currency:{
        type:String,
        required:true,
        default:"IND"
    }
},{
    timestamps:true
})
accountschema.index({user:1,status:1})
accountschema.methods.balance=async function () {
    const balancedata=await ledgermodel.aggregate([
        {$match:{account:this._id}},
        {$group:{
            _id:null,
            totaldebit:{
                $con:[
                    {$eq:["type","debit"]},
                    "$amount",
                    0
                ]
            },
            totalcredits:{
                $con:[
                    {$eq:["type","credit"]},
                    "$amount",
                    0
                ]
            }
        }},
        {
         $project:{
             _id:0,
            balance:{$subtract:["$totalcredits","$totaldebit"]}
        }
        }
    ])   
    if(balancedata.length===0){
        return 0
    }
    return balancedata[0].balance
}

const accountmodel=mongoose.model("account",accountschema)
module.exports=accountmodel;