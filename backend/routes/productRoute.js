import express from 'express';
import {
    fetchAllPoducts,
    fetchOneProduct,
    deleteProduct,
    editProduct,
    createProduct,
    createReview,
    topProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddlware.js';

const router = express.Router();

router
    .route('/')
    //@desc Fetch all products
    //@route Get /api/products
    //@access Public
    .get(fetchAllPoducts)
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

//@desc Create review
//@route POST/api/products/:id/review
//@access Privé
router.route('/:id/review').post(protect,createReview);

// @desc    Top product
// @route   Get /api/products/top
// @access  public
router.route('/top').get(topProduct)


export default router;
