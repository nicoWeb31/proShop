import React,{ useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Carousel,Image} from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listTopPoducts } from '../actions/productsAction'

const ProductCarroussel = () => {

    const dispatch = useDispatch();
    const {loading,error,productsTop} = useSelector((state) => state.ProductTopRated)


    useEffect(() => {
        dispatch(listTopPoducts())
    },[dispatch])


    return loading ? <Loader/> : error ?<Message variant="danger">{error}</Message> : (
        <Carousel pause='hover' className='bg-dark' >
            {productsTop.map(product =>(
            <Carousel.Item  key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                    <Carousel.Caption className='carousel-caption'>
                        {product.name}({product.price})
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>

            ))}
        </Carousel>
    )
}

export default ProductCarroussel
