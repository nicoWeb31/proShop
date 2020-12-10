import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import Loader from '../components/Loader';
import Message from '../components/Message';
//action
import { getOrderDetails, payOrder } from '../actions/orderAction';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderPage = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const { success, loading: loadingPay } = orderPay;

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || success) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            addPayPalScript();
        } else {
            setSdkReady(true);
        }
    }, [dispatch, orderId, success, order]);

    //______________fonction____________________
    //calculate price:
    if (!loading) {
        order.itemsPrice = order.orderItems
            .reduce((acc, e) => acc + e.price * e.qty, 0)
            .toFixed(2);
    }

    const successPaymentHandler = (paymentResult) => {
        console.log(
            '🚀 ~ file: OrderPage.jsx ~ line 55 ~ successPaymentHandler ~ paymentResult vient de paypal',
            paymentResult
        );
        dispatch(payOrder(orderId, paymentResult));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message>{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name:</strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email :</strong>
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>Address</strong>
                                {order.shippingAdress.adress},
                                {order.shippingAdress.city}
                                {order.shippingAdress.postalCode},
                                {order.shippingAdress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">
                                    Not Delivered !
                                </Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payement Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod &&
                                    order.paymentMethod.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="danger">Not paid !</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
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
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxePrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader></Loader>}
                                    {!sdkReady ? (
                                        <Loader></Loader>
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderPage;
