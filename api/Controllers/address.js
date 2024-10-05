import Address from "../Models/Address.js";

// add address
export const addAddress = async(req , res)=>{
 let {fullName, address, city, state, country, pincode, phoneNumber} = req.body;

const userId = req.User; // Consider getting this dynamically

let userAddress = await Address.create({userId, fullName,  address , city, state, country, pincode, phoneNumber});

res.json({message: "Address added successfully", userAddress});
}
// get address
export const getAdress = async(req, res)=>{

    let userAddress= await Address.findOne({userId:req.User}).sort({createAt:-1});
    res.json({message:"Address fetched successfully", userAddress});
}
