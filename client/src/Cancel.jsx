import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { XCircleFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <Container className='py-5'>
            <Row className='justify-content-center'>
                <Col xs={12} sm={10} md={7} lg={5} className='text-center'>
                    <XCircleFill size={72} className='text-danger mb-4' />
                    <h2 className='fw-bold mb-2'>Payment Cancelled</h2>
                    <p className='text-muted mb-4'>
                        Your payment was not completed. No charges have been made.
                        You can go back to your cart and try again whenever you're ready.
                    </p>
                    <div className='d-flex flex-column flex-sm-row gap-2 justify-content-center'>
                        <Button variant='primary' onClick={() => navigate('/user/cart')}>
                            Back to Cart
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

export default Cancel
