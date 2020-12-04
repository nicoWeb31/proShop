import React, { useEffect } from 'react';
import { productsDetails } from '../actions/productsAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
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
    const dispatch = useDispatch();
    const { error, product, loading } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(productsDetails(match.params.id));
    }, []);

    return (
        <>
            <Link to="/" className="btn btn-white my-3">
                Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error}
                </Message>
            ) : (
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
                            <ListGroupItem>
                                Price: {product.price}
                            </ListGroupItem>
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
            )}
        </>
    );
};

export default ProductPage;
