import express from 'express';
import {
    authUser,
    profileUser,
    createUser,
    UpdateProfileUser,
    getAllUseurForAdmin,
} from '../controllers/usersController.js';
const router = express.Router();
import { protect,admin } from '../middleware/authMiddlware.js';

//@desc auth user && get token
//@route POST /api/users/login
//@access Public
router.post('/login', authUser);

router
    .route('/profile')
    //@desc profile user
    //@route get /api/users/profile
    //@access Prive :
    .get(protect, profileUser)
    //@desc update profile user
    //@route put /api/users/profile
    //@access Prive :
    .put(protect, UpdateProfileUser);

router
    .route('/')
    //@desc create a new user
    //@route POST /api/users
    //@access Public :
    .post(createUser)

    //@desc get all user admin only
    //@route GET /api/users
    //@access Prive/Admin :
    .get(protect,admin,getAllUseurForAdmin);

export default router;
