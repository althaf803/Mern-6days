const express=require("express");
const app=express();  
const port=4000;
const cors=require("cors");
const authRoutes=require("./routes/auth");
const authMiddleware=require("./middleware/authMiddleware");  

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

app.use(cors())

app.use("/api/auth",authRoutes);

app.use("/api/protected",authMiddleware,(req,res)=>{
    res.json({"message":`Hello user ${req.user.id}, u are authenticated successfully`});
})

app.listen(port,()=>console.log("server started on port 4000"));