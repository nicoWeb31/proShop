import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listPoducts } from '../actions/productsAction.js';
import Loader from '../components/Loader';
import Message from '../components/Message'

const HomePage = ({ match}) => {


    const keyword = match.params.keyword;

    //methode sans connect
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.productList
    );

    useEffect(() => {
        dispatch(listPoducts(keyword));
    }, [dispatch,keyword]);

    return (
        <>
            <h1>Latest products</h1>
            {/* spinner */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger' >
                {error}
                </Message>
            ) : (
                <Row>
                    {products &&
                        products.map((prod) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={prod._id}>
                                <Product product={prod} />
                            </Col>
                        ))}
                </Row>
            )}
        </>
    );
};

export default HomePage;
