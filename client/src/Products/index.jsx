import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import Sort from './Sort';
import useSort from './useSort';

const fetchProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    return res.data;
};

const Products = () => {
    const [params] = useSearchParams();
    const searchTerm = params.get('search');

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 600_000  // 10 minutes, Infinity is also accepted value
        // staleTime: Infinity  // fetch once and always serve from cache
    });

    


    // derived state

    // Add empty state later

    // without useMemo;

    // const filteredProducts = products.filter(p => {
    //     console.log("🚀 ~ Products ~ computing filteredProducts:")
    //     if (!searchTerm) {
    //         return true;
    //     }
    //     return p.title.toLowerCase().includes(searchTerm.toLowerCase())
    // });

    const filteredProducts = useMemo(() => products.filter(p => {
        console.log("🚀 ~ Products ~ computing filteredProducts:")
        if (!searchTerm) {
            return true;
        }
        return p.title.toLowerCase().includes(searchTerm.toLowerCase())
    }), [products, searchTerm]);


    const { activeSort, setActiveSort, sortedProducts } = useSort(filteredProducts);


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong.</p>;


    return (
        <Container fluid>
            <Sort setActiveSort={setActiveSort} />
            <Row>
                {sortedProducts.map((product) => <ProductCard key={product.id} {...product} />)}
            </Row>
        </Container>
    )
}

export default Products
