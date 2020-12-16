import mongoose from 'mongoose';

const reviewShema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required !!!!'],
    },
    rating: {
        type: Number,
        required: [true, 'rating is required !!!!'],
    },
    comment: {
        type: String,
        required: [true, 'comment is required !!!!'],
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user is required !!!!'],
        ref:'User'
    },
    product:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'product is required !!!!'],
        ref:'Product'
    }
},
{
    timestpams: true
});

const Review = mongoose.model('Review',reviewShema);

export default Review;
