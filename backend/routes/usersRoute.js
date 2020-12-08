import express from 'express';
import {
    authUser,
    profileUser,
    createUser,
    UpdateProfileUser
} from '../controllers/usersController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddlware.js';

//@desc auth user && get token
//@route POST /api/users/login
//@access Public
router.post('/login', authUser);

router
    .route('/profile')
    //@desc profile user
    //@route get /api/users/profile
    //@access Prive
    .get(protect, profileUser)
    //@desc update profile user
    //@route put /api/users/profile
    //@access Prive
    .put(protect,UpdateProfileUser)

//@desc create a new user
//@route POST /api/users
//@access Public
router.post('/', createUser);


export default router;
