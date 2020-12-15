import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getAllOrder } from '../actions/orderAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderListPage = ({ history }) => {
    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.orderGetAll);
    const { loading, error, orders } = allOrders;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllOrder());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    //______________function____________________

    return (
        <>
            <h1>Orders</h1>
            {/* {successDelete && (
                <Message variant="success">User delete whit success</Message>
            )} */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <th>{order._id}</th>
                                <th>{order.user && order.user.name}</th>
                                <th>{order.createdAt.substring(0, 10)}</th>
                                <th>${order.totalPrice}</th>

                                <th>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10) 
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </th>

                                <th>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10) 
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </th>
                                <th>
                                    <LinkContainer
                                        to={`/orders/${order._id}`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="success"
                                        >
                                            details
                                        </Button>
                                    </LinkContainer>

                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListPage;
