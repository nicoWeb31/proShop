import express from 'express';
import {
    createNewOrder,
    getOrderByID,
    updateOrederToPaid,
    getMyOwnOrders,
    getALLOrders,
    updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddlware.js';
const router = express.Router();

router
    .route('/')
    //@desc create new order
    //@route POST /api/order
    //@access Privé
    .post(protect, createNewOrder)
    //@desc get all orders
    //@route GET /api/orders
    //@access Privé/admin
    .get(protect, admin, getALLOrders);

router
    .route('/myorders')
    //@desc get logged in user orders
    //@route get /api/orders/myorders
    //@access Privé
    .get(protect, getMyOwnOrders);

router
    .route('/:id')
    //@desc get order by ID
    //@route GET /api/orders/:id
    //@access Privé
    .get(protect, getOrderByID)
    //@desc update order to delivered
    //@route patch /api/orders/:id
    //@access Privé/admin
    .get(protect, admin, updateOrderToDelivered);

router
    .route('/:id/pay')
    //@desc update order to paid
    //@route PUT /api/orders/:id/pay
    //@access Privé
    .put(protect, updateOrederToPaid);

export default router;
