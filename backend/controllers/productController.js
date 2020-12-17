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


    const pageSize = 3;
    const page = req.query.pageNumber * 1 || 1;
    console.log("🚀 ~ file: productController.js ~ line 18 ~ fetchAllPoducts ~ req.query.pageNumber", req.query)



    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}

    const count = await Product.countDocuments({...keyword})

    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize *(page-1));

    res.status(200).json({
        status: 'success',
        products,
        page,
        pages: Math.ceil(count / pageSize)
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
        res.status(404);
        throw new Error('product not found');
    }
});

//@desc delete for admin
//@route delete /api/products/:id
//@access Privé/Admin
//_____________________fetch by ID_______________________________________________
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        throw new Error('product not found!!!');
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

//@desc create for admin
//@route POST /api/products
//@access Privé/Admin
//_____________________create a new product_______________________________________________
const createProduct = asyncHandler(async (req, res) => {
    // const product = await Product.create(req.body)

    // res.status(201).json({
    //     status: "success",
    //     product
    // });

    const product = new Product({
        name: 'Sample Product',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpeg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createProduct = await product.save();
    console.log(
        '🚀 ~ file: productController.js ~ line 81 ~ createProduct ~ createProduct',
        createProduct
    );
    res.status(201).json({
        status: 'success',
        product: createProduct,
    });
});

//@desc edit for admin
//@route PUT /api/products/:id
//@access Privé/Admin
//_____________________edit by ID_______________________________________________
const editProduct = asyncHandler(async (req, res) => {
    // const {
    //     name,
    //     price,
    //     description,
    //     image,
    //     category,
    //     brand,
    //     countInStock,
    // } = req.body;

    // const product = await Product.findById(req.params.id);
    // if (product) {
    //     product.name = name;
    //     product.price = price;
    //     product.description = description;
    //     product.image = image;
    //     product.category = category;
    //     product.brand = brand;
    //     product.countInStock = countInStock;

    //     const updatedProduct = await product.save({runValidators :true});

    //     res.status(201).json({
    //         status: 'success',
    //         product: updatedProduct,
    //     });
    // } else {
    //     throw new Error('Product not found');
    // }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        throw new Error('Product not found');
    } else {
        res.status(201).json({
            status: 'success',
            product,
        });
    }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    console.log(req.user)

    const product = await Product.findById(req.params.id);
    console.log("🚀 ~ file: productController.js ~ line 149 ~ createReview ~ product", product)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    fetchOneProduct,
    fetchAllPoducts,
    test,
    deleteProduct,
    createProduct,
    editProduct,
    createReview,
};
