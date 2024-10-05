import mongoose from "mongoose";


const cartitemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    } ,
    qty:{
        type:Number,
        required:true
    },
    imgsrc:{
        type:String,
        required:true
    }
});
  

const cartSchema = new  mongoose.Schema({
    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required :true
    },
    items: [cartitemSchema] ,
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;