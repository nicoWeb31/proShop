import mongoose from 'mongoose';

const reviewShema = mongoose.Schema({
    name: {
        type: string,
        required: [true, 'name is required !!!!'],
    },
    rating: {
        type: number,
        required: [true, 'rating is required !!!!'],
    },
    comment: {
        type: string,
        required: [true, 'comment is required !!!!'],
    },
},
{
    timestpams: true
});

const Review = mongoose.Model('Review',reviewShema);

export default Review;
