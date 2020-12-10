import express from 'express';
import {createNewOrder,getOrderByID,updateOrederToPaid} from '../controllers/orderController.js';
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

router.route('/:id/pay')
//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access Privé
    .put(protect,updateOrederToPaid)    


export default router;