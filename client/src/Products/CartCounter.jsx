import React from 'react'
import { Badge } from 'react-bootstrap'
import { BagDash, BagPlus, Trash } from 'react-bootstrap-icons'

const CartCounter = ({ quantity, onIncrement, onDecrement, onRemove, disabled }) => {
    return (
        <section className={`cart-counter${disabled ? ' disabled' : ''}`}>
            <BagDash size={30} className={`text-danger${disabled ? ' cursor-disabled' : ''}`} role='button' onClick={disabled ? undefined : onDecrement} />
            <Badge style={{ fontSize: '16px' }} pill className='mx-2'>{quantity}</Badge>
            <BagPlus size={30} className={`text-success${disabled ? ' cursor-disabled' : ''}`} role='button' onClick={disabled ? undefined : onIncrement} />
            <Trash size={30} className={`text-danger ms-auto${disabled ? ' cursor-disabled' : ''}`} role='button' onClick={disabled ? undefined : onRemove} />
        </section>
    )
}

export default CartCounter
