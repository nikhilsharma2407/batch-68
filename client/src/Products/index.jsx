import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    return res.data;
};

const Products = () => {
    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 600_000  // 10 minutes, Infinity is also accepted value
        // staleTime: Infinity  // fetch once and always serve from cache
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong.</p>;


    return (
        <Container fluid>
            <Row>
                {products.map((product) => <ProductCard key={product.id} {...product} />)}
            </Row>
        </Container>
    )
}

export default Products
