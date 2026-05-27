const mongoose=require("mongoose")
const blacklistschema=new mongoose.Schema({
    token:{
        type:String,
        require:true,
        unique:true
    }
},{
    timestamps:true
})
blacklistschema.index({createdAt:1}),{
    expireAfterSeconds:60*60*24*3
}
const blacklistmodel=mongoose.model("blacklist",blacklistschema)
module.exports=blacklistmodel;