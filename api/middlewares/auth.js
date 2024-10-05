import jwt from "jsonwebtoken";
import {user} from "./../Models/user.js";

export const Authenticated = async (req, res, next)=>{
    const token = req.header("Auth");
    if(!token){
        return res.json({message:" Please Login first"});
    }
    else{
        const decoded =jwt.verify(token , "!@#$%^&");
       // userId: '66e2e87cd796eaa0b2d66bf2',
      let id = decoded.userId;
       let User = await user.findById(id);
       if(!User){
           return res.json({message:"User not found"});
       }
       req.User = User;
       next();

    }
}