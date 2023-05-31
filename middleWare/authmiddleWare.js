const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const protect= asyncHandler(async(req,res,next)=>{
     try {
         const token=req.cookies.token;
         if(!token)
         {
            res.status(401)
            throw new Error("Not Authorized, please Login.")
         }
         //Verify Token
         const verified =  jwt.verify(token, process.env.jwt_SECRET)
         //get user id from token
        const user = await User.findById(verified.id).select("-password")
        if(!user)
        {
         res.status(401)
            throw new Error("Not Authorized, please Login.")   
        }
        req.user=user
        next()
     } catch (error) {
         res.status(401)
            throw new Error("Not Authorized, please Login.")   
     }
})
module.exports=protect;