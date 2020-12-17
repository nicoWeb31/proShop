import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listPoducts } from '../actions/productsAction.js';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarroussel from '../components/ProductCarroussel';
import Meta from '../components/Meta';
import {Link} from 'react-router-dom';

const HomePage = ({ match }) => {


    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    //methode sans connect
    const dispatch = useDispatch();
    const { loading, error, products, pages, page } = useSelector(
        (state) => state.productList
    );

    useEffect(() => {
        dispatch(listPoducts(keyword,pageNumber));
    }, [dispatch,keyword,pageNumber]);

    return (
        
        <>
        <Meta/>

            {!keyword ? <ProductCarroussel/> :(
                <Link to='/' className='btn btn-light'> Go back !</Link>
            ) }
            <h1>Latest products</h1>
            {/* spinner */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger' >
                {error}
                </Message>
            ) : (
                <>
                <Row>
                    {products &&
                        products.map((prod) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={prod._id}>
                                <Product product={prod} />
                            </Col>
                        ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword: ''} />
                </>
            )}
        </>
    );
};

export default HomePage;
