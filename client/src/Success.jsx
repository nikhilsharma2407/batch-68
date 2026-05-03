import React from 'react'
import {
    Container, Row, Col, Button, Card, CardHeader,
    CardBody, Table, Badge, Spinner, Alert
} from 'react-bootstrap'
import { CheckCircleFill } from 'react-bootstrap-icons'
import { useNavigate, useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance, ENDPOINTS } from './apiUtil'

const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session-id');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['stripeSession', sessionId],
        queryFn: () => axiosInstance.get(ENDPOINTS.STRIPE.GET_SESSION(sessionId)),
        enabled: !!sessionId,
        staleTime: Infinity,
        retry: false,
    });

    const session = data?.data?.data?.session;
    const order = data?.data?.data?.order;
    const lineItems = order?.items ?? [];

    return (
        <Container className='py-5'>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    {/* Header */}
                    <div className='text-center mb-4'>
                        <CheckCircleFill size={64} className='text-success mb-3' />
                        <h2 className='fw-bold mb-1'>Payment Successful!</h2>
                        <p className='text-muted'>
                            Thank you for your order. You'll receive a confirmation email shortly.
                        </p>
                    </div>

                    {/* Order Details */}
                    {isLoading && (
                        <div className='text-center py-3'>
                            <Spinner animation='border' variant='success' size='sm' className='me-2' />
                            <span className='text-muted'>Loading order details...</span>
                        </div>
                    )}

                    {isError && (
                        <Alert variant='warning'>
                            Could not load order details. Your payment was still successful.
                        </Alert>
                    )}

                    {session && (
                        <Card className='mb-4 shadow-sm'>
                            <CardHeader className='bg-success bg-opacity-10'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='fw-semibold'>Order Summary</span>
                                    <Badge bg='success'>
                                        {order.status === 'paid' ? 'Paid' : order.status}
                                    </Badge>
                                </div>
                                {order.sessionId && (
                                    <small className='text-muted d-block mt-1'>
                                        Session ID: {order.sessionId}
                                    </small>
                                )}
                            </CardHeader>
                            <CardBody className='p-0'>
                                <Table responsive className='mb-0'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th>Item</th>
                                            <th className='text-center'>Qty</th>
                                            <th className='text-end'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lineItems.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.title}</td>
                                                <td className='text-center'>{item.quantity}</td>
                                                <td className='text-end'>
                                                    {item.totalPrice.toLocaleString('en-IN', {
                                                        style: 'currency',
                                                        currency: session.currency?.toUpperCase() ?? 'INR',
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className='table-light'>
                                        <tr>
                                            <td colSpan={2} className='fw-bold text-end'>Total</td>
                                            <td className='fw-bold text-end'>
                                                {order.totalAmount.toLocaleString('en-IN', {
                                                    style: 'currency',
                                                    currency: order.currency?.toUpperCase() ?? 'INR',
                                                })}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </CardBody>
                        </Card>
                    )}

                    {/* Actions */}
                    <div className='d-flex flex-column flex-sm-row gap-2 justify-content-center'>
                        <Button variant='success' onClick={() => navigate('/user/orders')}>
                            View Orders
                        </Button>
                        <Button variant='outline-secondary' onClick={() => navigate('/')}>
                            Continue Shopping
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Success
