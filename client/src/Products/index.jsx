import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from './Product';

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
        <>
            {products.map((product) => <Product key={product.id} product={product} />)}
        </>
    )
}

export default Products