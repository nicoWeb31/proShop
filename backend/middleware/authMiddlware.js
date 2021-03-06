import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
    //const token
    //token come from ront here
    // console.log('auth : ' ,req.headers.authorization);

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            //console.log("🚀 ~ file: authMiddlware.js ~ line 17 ~ protect ~ decoded", decoded)

            //add user in req object !!! access user in all preocted route
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorization, token faild !!! ');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized, no toren !!');
    }
});

//protect middlware for admin
const admin = (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not Authorized, no perssion, end point for admin !!');
    }
}

export { protect,admin };
