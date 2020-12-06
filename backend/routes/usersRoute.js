import express from 'express';
import { authUser } from '../controllers/usersController.js';
const router = express.Router();

//@desc auth user && get token
//@route POST /api/users/login
//@access Public
router.post('/login', authUser);

export default router;
