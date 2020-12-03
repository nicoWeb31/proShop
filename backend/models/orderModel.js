import mongoose from 'mongoose';

const orderShema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'user is required  in Order !!!! '],
            ref: 'User',
        },
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        shippingAdress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: [true, 'paymentMethod is required !!!!'],
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        taxePrice: {
            type: Number,
            required: [true, 'taxePrice is required !!!!'],
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: [true, 'shippingPrice is required !!!!'],
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: [true, 'totalPrice is required !!!!'],
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: [true],
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false
        },
        deliveredAt: {
            type: Date,
        }
    },
    {
        timestpams: true,
    }
);

const Order = mongoose.Model('Order', orderShema);

export default Order;
