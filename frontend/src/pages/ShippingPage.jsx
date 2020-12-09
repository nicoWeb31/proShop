import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component

import FormContainer from '../components/FormContainer';

const ShippingPage = ({ history }) => {
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [contry, setContry] = useState('');

    //______________________________function_____________________________
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <FormContainer>
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
