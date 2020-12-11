import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//component
import Message from '../components/Message';
import Loader from '../components/Loader';

//action
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { ListOwnOrder } from '../actions/orderAction';

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

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderOwnList = useSelector((state) => state.orderOwnList);
    const { loading: loadingOrder, error: errorOrder, orders } = orderOwnList;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(ListOwnOrder());
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
                {success && (
                    <Message variant="success"> Profile updated !!</Message>
                )}

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
                        Update !
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
                {loadingOrder ? (
                    <Loader />
                ) : errorOrder ? (
                    <Message>{errorOrder}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELEVRED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>

                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isdelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/orders/${order._id}`}
                                        >
                                            <Button variant="light" className='btn-sm'>
                                                {' '}
                                                details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfilePage;
