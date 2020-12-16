import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';

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

//@desc Create review
//@route POST/api/products/:id/reviews
//@access Privé
//_____________________create new review_______________________________________________
const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id)
    console.log("🚀 ~ file: productController.js ~ line 151 ~ createReview ~ product", product)

    if (0===0) {

        // const alreadyReviewed = product.reviews.find(
        //     (r) => r.user.toString() === req.user._id.toString()
        // );
        // if (alreadyReviewed) {
        //     res.status(400);
        //     throw new Error('Product already reviewed');
        // }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
            product: product._id
        };
        const newReview = await Review.create(review);


        product.reviews.push(newReview._id);
        
        // product.reviews.push(review)
        console.log(product)
        product.numReviews = product.reviews.length;
        // product.rating =
        //     (product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length) * 1 ;
        await product.save();
        res.status(201).json({
            status: 'success',
            message: 'review added successfully !!',
        });
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
