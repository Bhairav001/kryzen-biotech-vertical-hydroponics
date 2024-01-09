const express = require("express");
const cors = require("cors")
const { UserRouter } = require("./routes/User.route");
const { connection } = require("./config/db");
const { FormRouter } = require("./routes/Form.route");
const { authenticate } = require("./middlewares/authenticate.middleware");


const app = express();
app.use(cors())
require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send({"msg":"welcome to kryzen"})
})

app.use("/users",UserRouter)
app.use(authenticate)
app.use("/forms",FormRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log({msg:"connected to DB"})
    } catch (error) {
        
    }
    console.log({msg:`server is running on port ${process.env.PORT}`})
})