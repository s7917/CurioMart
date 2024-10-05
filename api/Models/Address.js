import mongoose from "mongoose";

const AdressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required :true
        },

 fullName:{
    type:String,
    required:true
}
, 
address:{
    type:String,
    required:true
}
, 
city:{
    type:String,
    required:true
}
, 
state:{
    type:String,
    required:true
}
, 
country:{
    type:String,
    required:true
}
,
pincode:{
    type:Number,
    required:true
}
,
phoneNumber:{
    type:Number,
    required:true
}
,
createAt:{
    type:Date,
    default:Date.now
}
,  
});

 const Address =  mongoose.model("Address", AdressSchema);
export default Address;