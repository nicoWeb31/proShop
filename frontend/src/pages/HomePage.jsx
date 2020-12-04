import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listPoducts } from '../actions/productsAction.js';

const HomePage = () => {
    //methode sans connect
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.productList
    );

    useEffect(() => {
        dispatch(listPoducts());
    }, [dispatch]);

    return (
        <>
            <h1>Latest products</h1>
            {/* spinner */}
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h3>{error}</h3>
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
