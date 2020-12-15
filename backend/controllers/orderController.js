import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc create new order
//@route POST /api/order
//@access Privé
//_____________________create an order_____________________________________
const createNewOrder = asyncHandler(async (req, res) => {
    console.log('route create order');
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
            taxePrice,
        });
        const createOrder = await order.save();
        res.status(201).json({
            status: 'success',
            order: createOrder,
        });
    }
});

//@desc get order by ID
//@route GET /api/orders/:id
//@access Privé
//_____________________GET an order_____________________________________
const getOrderByID = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.status(200).json({
            status: 'success',
            order,
        });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access Privé
//_____________________update order to paid_____________________________________
const updateOrederToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.payer.email_address
        }

        const updateOrder = await order.save();  
        res.status(200).json({
            status: 'success',
            updateOrder,
        });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc get logged in user orders
//@route get /api/orders/myorders
//@access Privé
//_____________________get my orders_____________________________________
const getMyOwnOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({user : req.user.id});
    console.log("🚀 ~ file: orderController.js ~ line 99 ~ getMyOwnOrders ~ d", orders)

    res.status(200).json({
        status: 'success',
        orders
    })
});


//@desc get all orders
//@route GET /api/orders
//@access Privé/admin
//_____________________get all  orders_____________________________________
const getALLOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({}).populate('user','id name')

    res.status(200).json({
        status: 'success',
        orders
    })
});

export { createNewOrder,getOrderByID,updateOrederToPaid,getMyOwnOrders,getALLOrders };
