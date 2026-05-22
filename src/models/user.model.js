const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userschema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"email is required"],
        unique:[true,"this email is already exist"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    name:{
        type:String,
        required:[true,"name is required to create an account"]
    },
    password:{
        type:String,
        required:[true,"please put the password it is security"],
        minLength:[8,"password must be 8 atleast 8 letters"],
        select:false
    }
},{
    timestamps:true
})
userschema.pre("save",async function() {
    if(!this.isModified("password")){   
        return
    }
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash  
})
userschema.methods.compare=async function (password) {
    return await bcrypt.compare(password,this.password)
   
}
const usermodel=mongoose.model("user",userschema)

module.exports=usermodel;