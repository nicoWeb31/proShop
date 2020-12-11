import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
//action
import { register } from '../actions/userAction';

const RegisterPage = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegiser = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegiser;

    const redirect = location.search ? location.search.split('=')[1] : '/';
    console.log("🚀 ~ file: RegisterPage.jsx ~ line 24 ~ RegisterPage ~ redirect", redirect)

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    //______________fonction____________________
    const submitHandler = (e) => {
        e.preventDefault();
        //Dispatch Register
        if (password !== passwordConf) {
            setMessage('password do no match !!');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up !!!</h1>
            {error && <Message variant="danger"> {error}</Message>}
            {message && <Message variant="danger"> {message}</Message>}

            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label> Enter your Name !!</Form.Label>
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

                <Button type="submit" Variant="primary">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Register
                </Link>
            </Row>
        </FormContainer>
    );
};

export default RegisterPage;
