import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
//action
import { savePaymentMethod } from '../actions/cartAction';

const PaymentPage = ({ history }) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { shippingAdress } = cart;

    if (!shippingAdress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    //______________________________function_____________________________
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({ paymentMethod }));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment!</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label as="legend">Select a Method :</Form.Label>

                    <Col>
                        <Form.Check
                            type="radio"
                            label="Paypal or Credit card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        {/* <Form.Check
                            type="radio"
                            label="Stripe"
                            id="stripe"
                            name="paymentMethod"
                            value="Stripe"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary">
                    continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentPage;
