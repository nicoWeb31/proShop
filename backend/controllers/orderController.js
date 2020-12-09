import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc create new order
//@route POST /api/order
//@access Privé
//_____________________create an order_____________________________________
const createNewOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAdress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        taxePrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No Order Items !!');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAdress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            taxePrice
        });
        const createOrder = await order.save();
        res.status(201).json({
            status: 'success',
            order: createOrder
        })
    }
});


export {createNewOrder}