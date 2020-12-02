import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            console.log("🚀 ~ file: HomePage.jsx ~ line 12 ~ fetchProducts ~ data", data)
            setProducts(data.products);
        };
        fetchProducts();
    },[]);

    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {products.map((prod) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={prod._id}>
                        <Product product={prod} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomePage;
