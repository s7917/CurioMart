import Cart from '../Models/Cart.js'; // Use default import

// add to cart function
export const addToCart = async (req, res) => {
    const { productId, title, price, qty, imgsrc } = req.body;
    const userId =  req.User; // Consider getting this dynamically

    try {

        // Check if the cart already exists for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, title, price, qty, imgsrc }] });   
        } 
            const itemIndex = cart.items.findIndex((item)=> item.productId.toString()===productId);
            
            if(itemIndex >-1){
                //if product is already there in cart then update the quantity
                cart.items[itemIndex].qty+=qty;
                cart.items[itemIndex].price += price*qty;
            }
            else{
                //if product is not there in cart then add the product
                cart.items.push({productId, title, price, qty, imgsrc});
            }
        await cart.save();
        res.json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// count no .of items in cart
export const countCartItems = async (req, res) => {
    const userId = req.User; // Consider getting this dynamically
    try{
       const cart = await Cart.findOne({userId});
       if(!cart){
              res.json({message:"No items in cart"});
       }
       else{
        res.json({message:"user cart items", cart});
       }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }

};
// delete item from cart
export const deleteCartItem = async(req ,res)=>{
    const productId = req.params.productId;
    const userId = req.User; // Consider getting this dynamically
    try{
        const cart = await Cart.findOne({userId});
        if(!cart){
            res.json({message:"No items in cart"});
        }
        else{
            cart.items = cart.items.filter((item)=>item.productId.toString()!==productId);
            res.json({message:"Item removed from cart"});
            await cart.save();
        }

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }

}
//clear cart
export const ClearCart = async(req ,res)=>{

    const userId = req.User; // Consider getting this dynamically
    try{
        const cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({userId,items:[]});
            
        }
        else{
            cart.items=[];
        }
        await cart.save();
        res.json({message:"cart cleared"});

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }

}
// decrease quantity
export const decreaseProductQty = async (req, res) => {
    const { productId, qty} = req.body;
    const userId = req.User; // Consider getting this dynamically

    try {

        // Check if the cart already exists for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, title, price, qty, imgsrc }] });   
        } 
            const itemIndex = cart.items.findIndex((item)=> item.productId.toString()===productId);
            
            if(itemIndex >-1){
                //if product is already there in cart then update the quantity  
                const item = cart.items[itemIndex];
                if(item.qty>qty){
                    const Priceperunit = item.price/item.qty;
                    item.qty-=qty;
                    item.price -= Priceperunit*qty;
                }
            }
            else{
                //if product is not there in cart then add the product
               cart.items.splice(itemIndex,1);
            }
        await cart.save();
        res.json({ message: "decrease Product quantity and cart successfully", cart });
    } 

    catch (error) {
        res.status(500).json({ message: error.message });
    }
};