import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
}
, 
discription:{
    type:String,
    required:true
}
, 
price:{
    type:Number,
    required:true
}
, 
catorgory:{
    type:String,
    required:true
}
, 
qty:{
    type:Number,
    required:true
}
,
imgsrc:{
    type:String,
    required:true
}
,
createAt:{
    type:Date,
    default:Date.now
}
,  
});

 const Product =  mongoose.model("Product", productSchema);
export default Product;