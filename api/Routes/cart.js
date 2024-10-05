import express from 'express';
import  {Authenticated} from '../middlewares/Auth.js';
import { addToCart, countCartItems ,deleteCartItem ,ClearCart , decreaseProductQty} from '../Controllers/cart.js';


const router = express.Router();

// add product to cart
router.post('/add', Authenticated ,addToCart)
// count cart items all
router.get('/user' , Authenticated,countCartItems)
// delete item from cart
router.delete('/remove/:productId' , Authenticated,deleteCartItem)
// clear cart
router.delete('/clear' , Authenticated,ClearCart)
// decrase cart qty
router.post('/--qty', Authenticated ,decreaseProductQty)


export default router;
