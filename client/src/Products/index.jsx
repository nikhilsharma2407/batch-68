import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';

const Products = () => {
    const URL = 'https://fakestoreapi.com/products';

    const [products, setProducts] = useState([]);


    useEffect(() => {
        (async () => {
            const { data } = await axios.get(URL)
            console.log("🚀 ~ Products ~ data:", data)
            setProducts(data);
        })();
    }, []);



    return (
        <Container fluid>
            <Row>
                {products.map((product) => <ProductCard key={product.id} {...product} />)}
            </Row>
        </Container>
    )
}

export default Products