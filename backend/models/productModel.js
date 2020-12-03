import mongoose from 'mongoose';



const productShema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            require: [true, 'Name is required !!!!'],
        },
        image: {
            type: String,
            require: [true, 'Image is required !!!'],
        },
        brand: {
            type: String,
            require: [true, 'Brand is required !!!'],
        },
        category: {
            type: String,
            require: [true, 'category is required !!!'],
        },
        description: {
            type: String,
            require: [true, 'description is required !!!'],
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }],
        rating: {
            type: Number,
            require: [true, 'rating is required !!!'],
            default: 0,
        },
        numReviews: {
            type: Number,
            require: [true, 'numRiviews is required !!!'],
            default: 0,
        },
        price: {
            type: Number,
            require: [true, 'price is required !!!'],
        },
        countInStock: {
            type: Number,
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
