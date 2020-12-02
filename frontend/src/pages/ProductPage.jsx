import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductPage = ({ match }) => {

    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async (id) => {
            const { data } = await axios.get(`/api/product/${id}`);
            console.log("🚀 ~ file: ProductPage.jsx ~ line 22 ~ fetchProduct ~ data", data)
            setProduct(data.product);
        };
        console.log("🚀 ~ file: ProductPage.jsx ~ line 26 ~ useEffect ~ match.params.id", match.params.id)

        fetchProduct(match.params.id)
    }, [match]);

    return (
        <>
            <Link to="/" className="btn btn-white my-3">
                Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating
                                ratingValue={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroupItem>
                        <ListGroupItem>Price: {product.price}</ListGroupItem>
                        <ListGroupItem>
                            Description : {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0
                                            ? 'In stock'
                                            : 'Out of stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock <= 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductPage;
