import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import Mesage from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
//action
import { register } from '../actions/userAction';

const RegisterPage = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [name, setName] = useState('');




    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    //______________fonction____________________
    const submitHandler = (e) => {
        e.preventDefault();
        //Dispatch login
        dispatch(register(email, password));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Mesage variant="danger"> {error}</Mesage>}
            {loading && <Loader></Loader>} 
            <Form onSubmit={submitHandler}>

            <Form.Group controlId="name">
                    <Form.Label> Enter Name </Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label> Email address </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId="password">
                    <Form.Label> Password </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="passwordConf">
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm your Password !"
                        value={passwordConf}
                        onChange={(e) => setPasswordConf(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" Variante="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                New Customer?{' '}
                <Link
                    to={
                        redirect
                            ? `/redirect?redirect=${redirect}`
                            : '/register'
                    }
                >
                    Register
                </Link>
            </Row>
        </FormContainer>
    );
};

export default RegisterPage;
