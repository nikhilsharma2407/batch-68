import React, { useReducer, useState } from 'react'
import {
    Button, Card, CardBody, CardFooter, CardHeader,
    Col, Container, FormControl, FormGroup, FormLabel,
    FormText, Row
} from 'react-bootstrap'
import signupReducer, { initialState } from './signupReducer';


const Signup = () => {
    const [state, dispatch] = useReducer(signupReducer, initialState);

    const updateFormField = (e) => {
        const type = e.target.id;
        const payload = e.target.value;
        const action = { type, payload }
        dispatch(action);
    }



    return (
        <Container fluid>
            <Row>
                <Col sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <Card>
                        <CardHeader>Sign Up</CardHeader>
                        <CardBody>
                            {[
                                { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
                                { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter username' },
                                { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
                                { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
                                { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm password' },
                            ].map(({ id, label, type, placeholder }) => (
                                <FormGroup key={id} controlId={id} className='mb-3'>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl
                                        type={type}
                                        placeholder={placeholder}
                                        value={state[id].value}
                                        onChange={updateFormField}
                                        isInvalid={state[id].isDirty && !state[id].isValid}
                                    />
                                    {state[id].isDirty && (state[id].value) && !(state[id].isValid) && <FormText className='text-danger'>{`${label} is invalid`}</FormText>}
                                    {state[id].isDirty && !(state[id].value) && <FormText className='text-danger'>{`${label} is required`}</FormText>}
                                </FormGroup>
                            ))}
                        </CardBody>
                        <CardFooter>
                            <Button variant='outline-primary' >Sign Up</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup
