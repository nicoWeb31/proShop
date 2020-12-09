import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps'
//action
import { saveShippingAdress } from '../actions/cartAction'


const ShippingPage = ({ history }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const { shippingAdress } = cart;

    const [adress, setAdress] = useState(shippingAdress.adress);
    const [city, setCity] = useState(shippingAdress.city);
    const [postalCode, setPostalCode] = useState(shippingAdress.postalCode);
    const [contry, setContry] = useState(shippingAdress.contry);

    //______________________________function_____________________________
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAdress({adress,city,postalCode,contry}))
        history.push('/payment')
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping !</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="adress">
                    <Form.Label> Enter your Adress !!</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={adress}
                        required
                        onChange={(e) => setAdress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label> City !!</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label> PostalCode !!</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="contry">
                    <Form.Label> Contry </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter contry"
                        value={contry}
                        onChange={(e) => setContry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingPage;
