require("dotenv").config()
const app=require("./src/app")
const connectDb=require("./src/databases/db")
connectDb()

app.listen(3000,()=>{
    console.log("server is running in port number 3000")
})