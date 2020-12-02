import React from 'react';
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
import Products from '../products';

const productPage = ({ match }) => {
    const product = Products.find((product) => product._id === match.params.id);
    console.log(
        '🚀 ~ file: productPage.jsx ~ line 10 ~ productPage ~ product',
        product
    );

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
                                <Button className="btn-block" type="button" disabled={product.countInStock <= 0}>
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

export default productPage;
