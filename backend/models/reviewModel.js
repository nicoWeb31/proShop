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
},
{
    timestpams: true
});

const Review = mongoose.Model('Review',reviewShema);

export default Review;
