import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import Message from '../components/Message';
import Loader from '../components/Loader';

//action
import { getUserDetails, updateUserProfile } from '../actions/userAction';

const ProfilePage = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, user } = userDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state)=>state.userUpdateProfile)
    const {success} = userUpdateProfile;
    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user]);

    //______________fonction____________________
    const submitHandler = (e) => {
        e.preventDefault();
        //Dispatch Register
        if (password !== passwordConf) {
            setMessage('password do no match !!');
        } else {
            //dispatch update profile
            dispatch(updateUserProfile({ id: user._id, name, user, password }));
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>My profile !!</h2>
                {error && <Message variant="danger"> {error}</Message>}
                {message && <Message variant="danger"> {message}</Message>}
                {success && <Message variant="success"> Profile updated !!</Message>}


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

                    <Button type="submit" Variante="primary">
                        Update !
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
            </Col>
        </Row>
    );
};

export default ProfilePage;
