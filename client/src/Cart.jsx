import React from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardImg, Col, Container, Row } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { useGetCart, useClearCart, useRemoveFromCart, useIncrementItem, useDecrementItem } from './hooks/useCart'
import CartCounter from './Products/CartCounter'
import { axiosInstance, ENDPOINTS } from './apiUtil'

const Cart = () => {
    const { data: cart, isLoading, isError } = useGetCart();
    const clearCart = useClearCart();
    const removeFromCart = useRemoveFromCart();
    const increment = useIncrementItem();
    const decrement = useDecrementItem();

    if (isLoading) return <p className='p-4'>Loading cart...</p>;
    if (isError) return <p className='p-4'>Failed to load cart.</p>;

    const items = cart?.items ?? [];
    const total = cart?.totalPrice;


    const createCheckoutSession = async () => {
        console.log("🚀 ~ createCheckoutSession ~ createCheckoutSession:")
        try {
            const { data } = (await axiosInstance.post(ENDPOINTS.STRIPE.CREATE_CHECKOUT_SESSION)).data;
            console.log("🚀 ~ createCheckoutSession ~ data:", data);
            if (data.url) {
                // Redirect to Stripe Checkout, external navigation is required, so we can't use React Router's navigation.
                window.location.href = data.url;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container className='py-4'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4>Your Cart ({items.length} items)</h4>
                {items.length > 0 && (
                    <Button
                        variant='outline-danger'
                        size='sm'
                        onClick={() => clearCart.mutate()}
                        disabled={clearCart.isPending}
                    >
                        <Trash className='me-1' /> Clear Cart
                    </Button>
                )}
            </div>

            {items.length === 0 ? (
                <p className='text-muted'>Your cart is empty.</p>
            ) : (
                <>
                    <Row>
                        {items.map(item => (
                            <Col key={item.id} xs={12} md={6} lg={4} className='mb-3'>
                                <Card>
                                    <CardHeader className='text-truncate'>{item.title}</CardHeader>
                                    <CardImg src={item.image} style={{ height: '150px', objectFit: 'contain' }} className='p-2' />
                                    <CardBody>
                                        <div className='d-flex justify-content-between'>
                                            <span>${item.unitPrice}</span>
                                            <Badge bg='secondary'>Subtotal: ${(item.price).toFixed(2)}</Badge>
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <CartCounter
                                            quantity={item.quantity}
                                            onIncrement={() => increment.mutate(item)}
                                            onDecrement={() => decrement.mutate(item)}
                                            onRemove={() => removeFromCart.mutate({ id: item.id, title: item.title })}
                                        />
                                    </CardFooter>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className='text-end mt-3'>
                        <h5>Total: ${total.toFixed(2)}</h5>
                        <Button variant='primary' onClick={createCheckoutSession} className='mt-2'>
                            Proceed to Checkout
                        </Button>
                    </div>
                </>
            )}
        </Container>
    )
}

export default Cart
