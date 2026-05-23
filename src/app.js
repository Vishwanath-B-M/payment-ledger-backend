const express=require("express")
const authRouter=require("./routers/auth.router")
const accountRouter=require("./routers/account.router")
const transactionRouter=require("./routers/transction.router")
const cookieparser=require("cookie-parser")

const app=express();
app.use(express.json())
app.use(cookieparser())
app.use("/api/auth/",authRouter)
app.use("/api/account/",accountRouter)
app.use("/api/transaction/",transactionRouter)


module.exports=app;