import React, { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
    listPoducts,
    deleteProduct,
    createProduct,
} from '../actions/productsAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductsList = ({ history, match }) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        laoding: loadingCreate,
        success: successCreate,
        product: createProductItem,
        error: errorCreate,
    } = productCreate;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        success: successDelete,
        loading: loadingDelete,
        error: errorDelete,
    } = productDelete;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!userInfo.isAdmin) {
            history.push('/login');
        }

        if (successCreate) {
            history.push(`/admin/product/${createProductItem._id}/edit`);
        } else {
            dispatch(listPoducts());
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createProductItem,
    ]);

    //______________fonction____________________
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product ??')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-rigth">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product !
                    </Button>
                </Col>
            </Row>
            {/* alerte delete */}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {successDelete && (
                <Message variant="success">
                    Product delete with success !
                </Message>
            )}
            {/* alerte create */}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {successCreate && (
                <Message variant="success">
                    Product delete with success !
                </Message>
            )}
            {/* alerte loading load items */}
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
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>

                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            className="btn-sm"
                                            variant="success"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            deleteHandler(product._id)
                                        }
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ProductsList;
