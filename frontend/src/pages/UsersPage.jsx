import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getAllUserForAdmin } from '../actions/userAction';
import Loader from '../components/Loader';
import Message from '../components/Message';


const UsersPage = ({ history}) => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userList);
    const { userInfo, } = userLogin;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(getAllUserForAdmin());
        }else{
            history.push('/login')
        }
            
    }, [dispatch,history,userInfo]);

    //______________fonction____________________
    const deleteHandler =()=>{

    }

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <th>{user._id}</th>
                                <th>{user.name}</th>
                                <th>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </th>
                                {/* <th>{user.isAdmin ? 'admin' : 'user'}</th> */}
                                <th>
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: 'green' }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </th>
                                <th>
                                    <LinkContainer to={`/user/${user.id}/edit`}>
                                        <Button className="btn-sm" variant="success">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onclick={()=>deleteHandler(user.id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UsersPage;
