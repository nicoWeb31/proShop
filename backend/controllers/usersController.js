import asyncHandler from 'express-async-handler';
import User from '../models/usersModel.js';
import generateToken from '../utils/generateToken.js';

//@desc auth user && get token
//@route POST /api/users/login
//@access Public
//_____________________auth User login_____________________________________
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(
        '🚀 ~ file: usersController.js ~ line 13 ~ authUser ~ user',
        user
    );

    let token;

    //user exist ?
    if (user && (await user.matchPass(password))) {
        token = await generateToken(user._id);
        res.json({
            status: 'success',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token,
            },
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password !!! ');
    }
});

//@desc profile user
//@route get /api/users/profile
//@access Prive
//_____________________profile user___________________________________________
const profileUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            status: 'success',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc register a new user
//@route POST /api/users
//@access Public
//_________________________create new user___________________________________________
const createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    // if(!name || !email || !password) {
    //     return res.status(400)
    //     throw new Error('name email and  password is required !!!');
    // }

    if (userExist) {
        res.status(400);
        throw new Error('Email already in use !!!');
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            status: 'success',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data !');
    }
});

//@desc update profile user
//@route put /api/users/profile
//@access Prive
//_____________________profile user___________________________________________
const UpdateProfileUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const UpdateProfileUser = await user.save();

        res.status(200).json({
            status: 'success',
            user: {
                _id: UpdateProfileUser._id,
                name: UpdateProfileUser.name,
                email: UpdateProfileUser.email,
                isAdmin: UpdateProfileUser.isAdmin,
                token: generateToken(UpdateProfileUser._id),
            },
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc get all user admin only
//@route GET /api/users
//@access Prive/Admin
//_____________________get all users Admin___________________________________________
const getAllUseurForAdmin = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        users,
    });
});

//@desc delete user admin only
//@route DELETE /api/users/:id
//@access Prive/Admin
//_____________________delete users Admin___________________________________________
const delteUserForAdmin = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id, (err) => {
        if (err) throw new Error('User not found !');
    });
    res.status(204).json({ message: 'User deleted' });
});

//@desc get user by ID admin only
//@route GET/api/users/:id
//@access Prive/Admin
//_____________________get users Admin___________________________________________
const getUserForAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user){
        res.status(404)
        throw new Error('user not found !!')
    }else{
        res.status(200).json({
            status: 'success',
            user
        })
    }
});

//@desc update profile user admin only
//@route put /api/users/:id
//@access Prive/Admin
//_____________________update user for admin only___________________________________________
const UpdateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        // user.isAdmin = req.body.isAdmin ? Boolean(req.body.isAdmin) : user.isAdmin; 
        user.isAdmin = Boolean(req.body.isAdmin);
        

        const UpdateProfileUser = await user.save();

        res.status(200).json({
            status: 'success',
            user: {
                _id: UpdateProfileUser._id,
                name: UpdateProfileUser.name,
                email: UpdateProfileUser.email,
                isAdmin: UpdateProfileUser.isAdmin,
            },
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    profileUser,
    createUser,
    UpdateProfileUser,
    getAllUseurForAdmin,
    delteUserForAdmin,
    getUserForAdmin,
    UpdateUser
};
