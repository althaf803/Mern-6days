const express=require("express")
const {addUser,findUser}=require("../models/users")
const {generateToken}=require("../config/jwt")
const bcrypt=require("bcryptjs")

const router=express.Router();

router.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    if(findUser(username)){
        return res.status(400).json({"message":"User already exists"});
    }
    const newUser=await addUser(username,password);
    const token=generateToken(newUser);
    res.status(200).json({"message":newUser,token});
})

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const user=findUser(username);
    if(!user){
        return res.status(400).json({"message":"User not found Create account"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({"message":"Invalid password"});
    }
    const token=generateToken(user);
    res.status(200).json({"message":"Logged in successfully"});
})

module.exports=router

