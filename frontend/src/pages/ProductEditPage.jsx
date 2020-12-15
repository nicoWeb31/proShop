import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//component
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
//action
import { productsDetails, updateProduct } from '../actions/productsAction';
import { PRODUCT_EDIT_RESET } from '../constants/productConstants';

const ProductEditPage = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [uplodading, setUplodading] = useState(false);

    const dispatch = useDispatch();

    const productDetail = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetail;

    const productUpdate = useSelector((state) => state.productEdit);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        sucess: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_EDIT_RESET });
            history.push('admin/productsList');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(productsDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.pricename);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setDescription(product.description);
                setCountInStock(product.countInStock);
            }
        }
    }, [dispatch, productId, product, successUpdate, history]);

    //______________fonction____________________
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        );
    };

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUplodading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUplodading(false)


        } catch (error) {
            console.error(error);
            setUplodading(false)

        }
    };

    return (
        <>
            <Link to={'/admin/productslist'} className="btn btn-light my-3">
                Go back !
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {/* edit loading */}
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger"> {errorUpdate}</Message>
                )}

                {/* product details loading */}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label> Enter your Name !!</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label> Price </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label> Image </Form.Label>
                            <Form.Control
                                type=""
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label> Image </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id="image-file"
                                label="Choose File"
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uplodading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label> Brand </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label> Count in stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="your Stock"
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label> Description </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label> Category </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditPage;
