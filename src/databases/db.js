const mongoose=require("mongoose")

async function connectDB() {
    mongoose.connect(process.env.DatabaseKey)
    .then(()=>{
        console.log('database is connected to server')
    })
    .catch(err=>{
        console.log(err)
        console.log("this is the error")
        process.exit(1)
    })
    
}
module.exports=connectDB;