import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
//action

const PlaceOrderPage = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    console.log(
        '🚀 ~ file: PlaceOrderPage.jsx ~ line 13 ~ PlaceOrderPage ~ cart'
    );

    //calculate price:

    const addDecimal = (num) => {
        return Math.round((num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = cart.cartItems.reduce((acc, e) => acc + e.price * e.qty, 0).toFixed(2);
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 48;

    cart.itemsTaxe = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));

    cart.totalPrice = cart.itemsPrice * 1 + cart.itemsTaxe*1 + cart.shippingPrice*1;

    //______________fonction____________________
    const placeorderHandler = () => {};

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address</strong>
                                {cart.shippingAdress.adress},
                                {cart.shippingAdress.city}
                                {cart.shippingAdress.postalCode},
                                {cart.shippingAdress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payement Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod &&
                                    cart.paymentMethod.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} ={' '}
                                                    {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.itemsTaxe}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="Button"
                                    className="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeorderHandler}
                                >
                                    {' '}
                                    placeholder
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderPage;
