import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const test = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'ok' });
});


//@desc Fetch all products
//@route Get /api/products
//@access Public
//_____________________fetch All Products_____________________________________
const fetchAllPoducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.status(200).json({
        status: 'success',
        products,
    });
});


//@desc Fetch single product
//@route Get /api/produccts/id
//@access Public
//_____________________fetch by ID_______________________________________________
const fetchOneProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json({
            status: 'success',
            product,
        });
    } else {
        //status code diff de 200 custom error handler
        res.status(404)
        throw new Error("product not found");
    }
});

export {
    fetchOneProduct,
    fetchAllPoducts,
    test,
};
