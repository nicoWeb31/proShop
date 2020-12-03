import mongoose from 'mongoose';


const userShema = mongoose.Schema({

    name:{
        type:String,
        require: [true, "Name is required !!!!"]
    },
    email: {
        type:String,
        require: [true, "Email is required !!!"],
        unique: [true, "Email already exist !!!"]
    },
    password: {
        type:String,
        require: [true, "Password is required !!!"]
    },
    isAdmin: {
        type: Boolean,
        require: [true, "Role is required !!!"],
        default: false
    }


},{
    timestpams: true //assigne une date
})


const User = mongoose.model('User', userShema)
export default User;