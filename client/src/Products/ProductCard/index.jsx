import React from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardImg, Col } from 'react-bootstrap'
import './styles.scss'
import { BagPlusFill } from 'react-bootstrap-icons'
import CartCounter from '../CartCounter'
import { Rating } from 'react-simple-star-rating'
import { useGetCart, useAddToCart, useRemoveFromCart, useIncrementItem, useDecrementItem, useIsCartMutating } from '../../hooks/useCart'
import useIsLoggedIn from '../../hooks/useIsLoggedIn'
import { useNavigate, useLocation } from 'react-router-dom'

const ProductCard = ({ id, title, price, description, category, image, rating }) => {
    const { data: cart } = useGetCart();
    const addToCart = useAddToCart();
    const removeFromCart = useRemoveFromCart();
    const increment = useIncrementItem();
    const decrement = useDecrementItem();

    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const product = { id, title, price, description, category, image, rating };

    const handleAddToCart = () => {
        if (!isLoggedIn) return navigate('/login', { state: pathname, replace: true });
        addToCart.mutate(product);
    };
    const cartItem = isLoggedIn && cart?.items?.find(item => item.id === id);
    const isAnyPending = addToCart.isPending || removeFromCart.isPending || increment.isPending || decrement.isPending;

    return (
        <Col xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 0 }} xl={{ span: 3 }}>
            <Card className='product-card mb-3'>
                <CardHeader className='title'>{title}</CardHeader>
                <CardImg src={image} className='image p-2' />
                <CardBody>
                    <section className='content'>
                        <section className='text price'>${price}</section>
                        <section className='text description'>{description}</section>
                        <section className='my-2 d-flex align-items-end'>
                            <Rating readonly initialValue={rating.rate} size={25} allowFraction />
                            <Badge pill className='ms-2'>{rating.count}</Badge>
                        </section>
                    </section>
                </CardBody>
                <CardFooter className='footer d-flex align-items-center'>
                    {cartItem ? (
                        <CartCounter
                            quantity={cartItem.quantity}
                            onIncrement={() => increment.mutate(product)}
                            onDecrement={() => decrement.mutate(product)}
                            onRemove={() => removeFromCart.mutate({ id, title })}
                            disabled={isAnyPending}
                        />
                    ) : (
                        <Button
                            variant='outline-primary'
                            className='d-flex align-items-center'
                            onClick={handleAddToCart}
                            disabled={isAnyPending}
                        >
                            <BagPlusFill size={25} className='me-2' />
                            Add to Cart
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </Col>
    )
}

export default ProductCard
