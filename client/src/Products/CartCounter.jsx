import React from 'react'
import { Badge } from 'react-bootstrap'
import { BagDash, BagPlus, Trash } from 'react-bootstrap-icons'

const CartCounter = ({ quantity }) => {
    return (
        <section className='d-flex align-items-end' style={{ flex: 1 }}>
            <BagDash size={30} className='text-danger' />
            <Badge style={{ fontSize: '16px' }} pill className='mx-2'>{quantity}</Badge>
            <BagPlus size={30} className='text-success' />
            <Trash size={30} className='text-danger ms-auto' />
        </section>
    )
}

export default CartCounter