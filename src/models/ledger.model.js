const mongoose=require('mongoose')
const ledgerschema=new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"must be there for transcation"],
        index:true,
        ref:"account",
        immutable:true

    },
    amount:{
        type:Number,
        required:[true,"must be there for transction"],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transcation",
        required:[true,"transcation is associated with ledger"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:['credit',"debit"]
        }
    }
})
function ledgermodification(){
    throw new error("ledger modification is not possible")
}
ledgerschema.pre("findOneandUpadte",ledgermodification)
ledgerschema.pre("updateOne",ledgermodification)
ledgerschema.pre("deleteOne",ledgermodification)
ledgerschema.pre('remove',ledgermodification)
ledgerschema.pre('deletemany',ledgermodification)
ledgerschema.pre("updatemany",ledgermodification)
ledgerschema.pre('findOneandDelete',ledgermodification)
ledgerschema.pre('findOneandReplace',ledgermodification)
const ledgermodel=mongoose.model("ledger",ledgerschema)
module.exports=ledgermodel;