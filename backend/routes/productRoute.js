import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

//@desc Fetch all products
//@route Get /api/products
//@access Public
router.route('/')
    .get(productController.fetchAllPoducts);

//@desc Fetch single product
//@route Get /api/produccts/id
//@access Public
router.get('/:id', productController.fetchOneProduct);

export default router;
