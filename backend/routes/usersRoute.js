import express from 'express';
import {
    authUser,
    profileUser,
    createUser,
    UpdateProfileUser,
    getAllUseurForAdmin,
    delteUserForAdmin,
    getUserForAdmin,
    UpdateUser,
} from '../controllers/usersController.js';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddlware.js';

//______________ '/login'____________________
//@desc auth user && get token
//@route POST /api/users/login
//@access Public
router.post('/login', authUser);

//______________'/profile'____________________
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

//______________'/'______________
router
    .route('/')
    //@desc create a new user
    //@route POST /api/users
    //@access Public :
    .post(createUser)

    //@desc get all user admin only
    //@route GET /api/users
    //@access Prive/Admin :
    .get(protect, admin, getAllUseurForAdmin);

//______________'/:id'______________
router
    .route('/:id')
    //@desc delete user admin only
    //@route DELETE /api/users/:id
    //@access Prive/Admin
    .delete(protect, admin, delteUserForAdmin)
    //@desc get user by ID admin only
    //@route GET/api/users/:id
    //@access Prive/Admin
    .get(protect, admin, getUserForAdmin)
    //@desc update profile user admin only
    //@route put /api/users/:id
    //@access Prive/Admin
    .put(protect, admin, UpdateUser);


export default router;
