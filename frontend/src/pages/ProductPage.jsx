import React, { useState, useEffect } from 'react';
import {
    productsDetails,
    createReviewProduct,
} from '../actions/productsAction';
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
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';


//______________________________________________________________
const ProductPage = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const { error, product, loading } = useSelector(
        (state) => state.productDetails
    );

    const {
        error: errorCreateReview,
        success: successCreateProductReview
    } = useSelector((state) => state.ProductCreateReview);

    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if(successCreateProductReview){
            alert('review Submited !!!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(productsDetails(match.params.id));
    }, [dispatch, match,successCreateProductReview]);

    //______________________________function_____________________________

    const addToCartHandler = () => {
        //link vers card param id item and qty
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(createReviewProduct(match.params.id,{rating,comment}))

    }

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
                <>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
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
                                                            setQty(
                                                                e.target.value
                                                            )
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
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && (
                                <Message>No reviews</Message>
                            )}
                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating ratingValue={review.rating} />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <ListGroup.Item>
                                <h2>Write a customer review !!</h2>
                                {errorCreateReview && <Message variant="danger"> {errorCreateReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={(e) =>
                                                    setRating(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    Selet...
                                                </option>
                                                <option value="1">
                                                    1-Poor
                                                </option>
                                                <option value="2">
                                                    2-Fair
                                                </option>
                                                <option value="3">
                                                    3-Good
                                                </option>
                                                <option value="4">
                                                    4-Very Good
                                                </option>
                                                <option value="5">
                                                    5-Exellent
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                row='3'
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                            >
                                            
                                            </Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary">Submint</Button>
                                    </Form>
                                ) : (
                                    <Message>
                                        Please <Link to="/login"> sing in</Link>{' '}
                                        to write a review
                                    </Message>
                                )}
                            </ListGroup.Item>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductPage;
