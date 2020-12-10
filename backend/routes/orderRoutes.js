import express from 'express';
import {createNewOrder,getOrderByID} from '../controllers/orderController.js';
import {protect} from '../middleware/authMiddlware.js';
const router = express.Router();



router.route('/')
//@desc create new order
//@route POST /api/order
//@access Privé
    .post(protect,createNewOrder)

router.route('/:id')
//@desc get order by ID
//@route GET /api/orders/:id
//@access Privé
    .get(protect,getOrderByID)    


export default router;