const {validateToken}=require("../config/jwt")

const authMiddleware=(req,res,next)=>{
    const token=req.header("Authorization")
    if(!token){
        return res.status(401).json({"message":"Access denied login first"})
    }
    try{
        const verified=validateToken(token.replace("Bearer",""))
        req.user=verified
        next();//it will proceed to access the other routes in upcoming API's
    }
    catch (err) {
        console.log(err)
        res.status(403).json({"message": "Unauthorized"});
    }

}

module.exports=authMiddleware