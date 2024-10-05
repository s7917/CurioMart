import express from 'express';
import { addProduct, getProducts, getProductsById,  updateProductByid ,deleteProduct} from '../Controllers/product.js';
// import { get } from 'mongoose';

const router = express.Router();

// add product
router.post('/add',addProduct)
// get products
router.get('/all', getProducts)
// get product by id
router.get('/:id',getProductsById)
// update product by id
router.put('/:id',updateProductByid)
// delete product by
router.delete('/:id',deleteProduct)


export default router;