import mongoose from 'mongoose';
import Review from './reviewModel.js'


const productShema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: 'string',
            require: [true, 'Name is required !!!!'],
        },
        image: {
            type: 'string',
            require: [true, 'Image is required !!!'],
        },
        brand: {
            type: 'string',
            require: [true, 'Brand is required !!!'],
        },
        category: {
            type: string,
            require: [true, 'category is required !!!'],
        },
        description: {
            type: string,
            require: [true, 'description is required !!!'],
        },
        reviews: [Review],
        rating: {
            type: number,
            require: [true, 'rating is required !!!'],
            default: 0,
        },
        numReviews: {
            type: number,
            require: [true, 'numRiviews is required !!!'],
            default: 0,
        },
        price: {
            type: number,
            require: [true, 'price is required !!!'],
        },
        countInStock: {
            type: number,
            require: [true, 'countInStock is required !!!'],
            default: 0,
        },
    },
    {
        timestpams: true, //assigne une date
    }
);

const Product = mongoose.model('Product', productShema);
export default Product;
