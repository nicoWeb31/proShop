import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


const test = asyncHandler(async (req, res) => {
    res.status(200).json({message :'ok'});
})


//_____________________fetch All Products_____________________________________
const fetchAllPoducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.status(200).json({
        status: 'success',
        products,
    });
})

//_____________________fetch by ID_______________________________________________
const fetchOneProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json({
            status: 'success',
            product,
        });
    } else {
        res.status(404).json({
            message: 'Product not found',
        });
    }
})

export default {
    fetchOneProduct,
    fetchAllPoducts,
    test
}