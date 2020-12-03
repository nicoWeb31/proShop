import mongoose from 'mongoose';


const userShema = mongoose.Schema({

    name:{
        type:"string",
        require: [true, "Name is required !!!!"]
    },
    email: {
        type:"string",
        require: [true, "Email is required !!!"],
        unique: [true, "Email already exist !!!"]
    },
    password: {
        type:"string",
        require: [true, "Password is required !!!"]
    },
    isAdmin: {
        type:"boolean",
        require: [true, "Role is required !!!"],
        default: false
    }


},{
    timestpams: true //assigne une date
})


const User = mongoose.model('User', userShema)
export default User;