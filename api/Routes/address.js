import express from 'express';
import { addAddress, getAdress} from '../Controllers/address.js';
import { Authenticated } from '../middlewares/auth.js';

const router = express.Router();
//add address
router.post('/add',Authenticated ,addAddress)
// get address
router.get('/get',Authenticated ,getAdress);

export default router; // Export the router