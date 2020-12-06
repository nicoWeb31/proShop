import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';


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

//_______________________method________________________________

//match password
userShema.methods.matchPass = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userShema)
export default User;