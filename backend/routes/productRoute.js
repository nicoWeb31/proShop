import express from 'express';
import {fetchAllPoducts,fetchOneProduct} from '../controllers/productController.js';

const router = express.Router();

//@desc Fetch all products
//@route Get /api/products
//@access Public
router.route('/')
    .get(fetchAllPoducts);

//@desc Fetch single product
//@route Get /api/produccts/id
//@access Public
router.get('/:id',fetchOneProduct);

export default router;
