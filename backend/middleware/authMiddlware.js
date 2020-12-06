import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const  protect = async (req,res,next) => {

    //const token 

    //token come from ront here
    console.log('auth : ' ,req.headers.authorization);



    next();
}



export {
    protect
}