import express from 'express';
import {createNewOrder} from '../controllers/orderController.js';
import {protect} from '../middleware/authMiddlware.js';
const router = express.Router();



router.route('/')
//@desc create new order
//@route POST /api/order
//@access Privé
    .post(protect,createNewOrder)


export default router;