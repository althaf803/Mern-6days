const jwt=require("jsonwebtoken");
require("dotenv").config();

const generaTetoken=(user)=>{
    return jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1h"});
}

const validateToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}


module.exports={generaTetoken,validateToken}