const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/User.model");

const UserRouter = express.Router();

//http://localhost:8080/users/register
UserRouter.post("/register",async(req,res)=>{
    const {name,email,pass} = req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
          if(err) res.send({msg:"Something went wrong","error":err.message})
          else{
            const user = new UserModel({name,email,pass:hash})
            await user.save()
            res.send({msg:"new user registered"})
           }
        })
    } catch (error) {
        res.send({msg:"Something went wrong","error":error.message})
    }
})

//http://localhost:8080/users/login
UserRouter.post("/login",async(req,res)=>{
    const {email,pass} = (req.body)
    try {
        const user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
               if(result){
                  let token = jwt.sign({userID:user[0]._id},"masai");
                  res.send({msg:"user Logggin","token":token})
               }else{
                res.send({msg:"Something went wrong","error":err})
               }
            })
        }else{
            res.send({msg:"Wrong Credentials"})
        }
    } catch (error) {
        res.send({msg:"Something went wrong","error":error.message})
    }
})

module.exports={
   UserRouter
}