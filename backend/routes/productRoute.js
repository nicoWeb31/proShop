import express from 'express';
import {
    fetchAllPoducts,
    fetchOneProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddlware';

const router = express.Router();

//@desc Fetch all products
//@route Get /api/products
//@access Public
router.route('/').get(fetchAllPoducts);

router
    .route('/:id')
    //@desc Fetch single product
    //@route Get /api/produccts/id
    //@access Public
    .get(fetchOneProduct)
    //@desc delete for admin
    //@route delete /api/products/:id
    //@access Privé/Admin
    .delete(protect, admin, deleteProduct);

export default router;
