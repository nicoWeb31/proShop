import express from 'express';
import {
    fetchAllPoducts,
    fetchOneProduct,
    deleteProduct,
    editProduct,
    createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddlware.js';

const router = express.Router();

router
    .route('/')
    //@desc Fetch all products
    //@route Get /api/products
    //@access Public
    .get(protect,admin,fetchAllPoducts)
    //@desc create for admin
    //@route POST /api/products
    //@access Privé/Admin
    .post(protect, admin, createProduct);

router
    .route('/:id')
    //@desc Fetch single product
    //@route Get /api/produccts/id
    //@access Public
    .get(fetchOneProduct)
    //@desc delete for admin
    //@route delete /api/products/:id
    //@access Privé/Admin
    .delete(protect, admin, deleteProduct)
    //@desc edit for admin
    //@route PATCH /api/products/:id
    //@access Privé/Admin
    .patch(protect, admin, editProduct);

export default router;
