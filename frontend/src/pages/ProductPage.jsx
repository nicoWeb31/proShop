import React, { useState, useEffect } from 'react';
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
    Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';

//______________________________________________________________
const ProductPage = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const { error, product, loading } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(productsDetails(match.params.id));
    }, [dispatch, match]);

    //______________________________function_____________________________

    const addToCartHandler = () => {
        //link vers card param id item and qty
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    return (
        <>
            <Link to="/" className="btn btn-white my-3">
                Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
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

                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                <ListGroupItem>
                                    <Button
                                        onClick={addToCartHandler}
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
