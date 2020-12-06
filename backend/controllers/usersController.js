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

    const token = await generateToken(user._id);

    //user exist ?
    if (user && (await user.matchPass(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
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

export { authUser, profileUser };
