import {user} from "./../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// functionn to register a user
export const register =async(req , res)=>{
    const {name, email, password} = req.body;
    try{
        let User = await user.findOne({email})
        if(User){
            return res.json({message:"User already exist with this email", success:false});
        }
        const hashpassword = await bcrypt.hash(password ,10);
         User = await user.create({name ,email,password:hashpassword});
        res.json({message:"User register successfully.....!" ,User , success:true});
    } 
    catch(error){
        res.json({message:error.message})
    }
}

// function ro login a user
export const login = async(req, res)=>{
     const {email , password} = req.body;
    try{
    let User = await user.findOne({email});
    if(!User){
        return res.json({message:"User not found with this email", success:false});
    }
    // agr user mil gaaya to  to uske password ko check karnege
    const validPassword  = await bcrypt.compare(password , User.password);

    if(!validPassword){
        return res.json({message:"Invalid password" , success:false});
    }
    //  agr mera password valid hai tab mai json web token ko use karunga user ki informationko
    // dynamically lene ke liye
    // very import how to make web token
    const token = jwt.sign({userId:User._id}, "!@#$%^&", {expiresIn:"365d"});

    res.json({message:`Welcome ${User.name}`,token , success:true, User});
    }

    catch(error){
        res.json({message:error.message});
    }
}

// get all users
export const Users = async(req , res)=>{
    try{
    let Users = await user.find().sort({createAt:-1});
    res.json(Users);
    }
    catch(error){
        res.json({message:error.message});;
    }
}

// get profile
export const profile = async(req, res)=>{
    try{
        const User = await user.findById(req.User);
        res.json({message:"User profile", User});
    }
    catch(error){
        res.json({message:error.message});
    }
}

