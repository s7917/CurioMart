import express from 'express';
import mongoose from 'mongoose';  
import userRouter from './Routes/user.js';
import bodyParser from 'express';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
import cors from 'cors';
const app = express();
app.use(bodyParser.json());
// core ka access allow karne ke liye
app.use(cors({
    origin:true,
    method:['GET','POST','PUT','DELETE'],
    credentials:true
}
))
// home testing route
app.get('/',(req, res)=>res.json({message:"this is home route"}));

// user router
app.use('/api/user/',userRouter);
// product router
app.use('/api/product/', productRouter);
// cart router
app.use('/api/cart/', cartRouter);
// address router
app.use('/api/address/', addressRouter);

// mongodb+srv://220108059shubham:gg0GksGzH98tXWai@cluster0.p3csr.mongodb.net/

mongoose.connect("mongodb+srv://shubham12:Shubham12@cluster0.p3csr.mongodb.net/" ,{
    dbName:"Mern_Ecommerce"
}).then(()=>console.log("Database connected")).catch((err)=>console.log("the error is occur in monodatabase connection" ,err))

const port = 1000;
app.listen(port , ()=>console.log(`Server is running on port ${port}`));
