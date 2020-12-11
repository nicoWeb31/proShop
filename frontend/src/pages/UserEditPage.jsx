import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//component
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
//action
import { getUserDetails } from '../actions/userAction';

const UserEditPage = ({ match, history }) => {
    const userId = match.params.id;

    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userDetail);
    const { loading, error, user } = userDetail;
    console.log(
        '🚀 ~ file: UserEditPage.jsx ~ line 23 ~ UserEditPage ~ user',
        user
    );

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    //______________fonction____________________
    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Link to={'/admin/userslist'} className="btn btn-light my-3">
                Go back !
            </Link>
            <FormContainer>
                <h1>Edit User</h1>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
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

                        <Form.Group controlId="isAdmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin ?"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditPage;
