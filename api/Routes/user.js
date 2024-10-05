import express from 'express';
import {login , profile, register ,Users} from '../Controllers/user.js';
import {Authenticated} from '../Middlewares/auth.js';

const router = express.Router();

// register user
router.post('/register',register) //  api/user/register
// login user
router.post('/login',login) // api/user/Login
// get all users
router.get('/all', Users)  // api/user/Users
// get user profile
router.get('/profile',Authenticated,profile) // api/user/profile


export default router;