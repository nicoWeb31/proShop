import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userShema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required !!!!'],
            
        },
        email: {
            type: String,
            required: [true, 'Email is required !!!'],
            unique: [true, 'Email already exist !!!'],
        },
        password: {
            type: String,
            required: [true, 'Password is required !!!'],
        },
        isAdmin: {
            type: Boolean,
            required: [true, 'Role is required !!!'],
            default: false,
        },
    },
    {
        timestpams: true, //assigne une date
    }
);

//_______________________method________________________________

//match password
userShema.methods.matchPass = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

//encrypte before add in bdd
userShema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model('User', userShema);
export default User;
