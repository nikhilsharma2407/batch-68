import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementAsync } from '../reducers/countReducer';

const Counter = () => {
    // const state = useSelector(state => {
    //     return state;
    // });
    const count = useSelector(state => {
        return state.count;
    });

    const dispatch = useDispatch();

    return (
        <>
            <Button variant='outline-danger' style={{ borderRadius: '16rem' }} onClick={() => dispatch(decrement())}>-</Button>
            <span className='mx-3'>{count}</span>
            <Button variant='outline-success' style={{ borderRadius: '16rem' }} onClick={() => dispatch(incrementAsync())}>+</Button>
        </>
    )
}

export default Counter