const mongoose=require('mongoose')
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

const accountmodel=mongoose.model("account",accountschema)
module.exports=accountmodel;