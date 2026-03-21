import React from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardImg, Col, Row } from 'react-bootstrap'
import './styles.scss'
import { BagPlusFill } from 'react-bootstrap-icons'
import CartCounter from '../CartCounter'
import { Rating } from 'react-simple-star-rating'
const ProductCard = ({
    id,
    title,
    price,
    description,
    category,
    image,
    rating }) => {



    const productInfo = (Math.floor(Math.random() * 10)) % 2 ? { quantity: Math.floor(Math.random() * 10) } : null;

    return (
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 0 }} xl={{ span: 3 }}>
            <Card className='product-card mb-3'>
                <CardHeader className='title'>{title}</CardHeader>
                <CardImg src={image} className='image p-2' />
                <CardBody>
                    <section className='content'>
                        <section className='text price'>${price}</section>
                        <section className='text description'>{description}</section>

                        {/* rating */}
                        <section className='my-2 d-flex align-items-end'>
                            <Rating readonly initialValue={rating.rate} size={25} allowFraction />
                            <Badge pill className='ms-2'>{rating.count} </Badge>
                        </section>
                    </section>

                </CardBody>
                <CardFooter className='footer d-flex align-items-center'>
                    {productInfo ? <CartCounter quantity={productInfo?.quantity} /> :
                        <Button variant='outline-primary' className='d-flex align-items-center'>
                            <BagPlusFill size={25} className='me-2' />
                            Add to Cart
                        </Button>}

                </CardFooter>
            </Card></Col>


    )
}

export default ProductCard