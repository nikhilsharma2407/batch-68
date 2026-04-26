import React, { useReducer, useState } from 'react'
import {
    Button, Card, CardBody, CardFooter, CardHeader,
    Col, Container, FormControl, FormGroup, FormLabel,
    FormText, Row
} from 'react-bootstrap'
import signupReducer, { initialState } from './signupReducer';
import { axiosInstance, ENDPOINTS } from '../apiUtil';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import './styles.scss'

const Signup = () => {
    const [state, dispatch] = useReducer(signupReducer, initialState);
    const [showPassword, setShowPassword] = useState(false);
    

    const updateFormField = (e) => {
        const type = e.target.id;
        const payload = e.target.value;
        const action = { type, payload }
        dispatch(action);
    }

    const onSignup = async () => {
        const payload = {}
        Object.entries(state).forEach(([key, val]) => {
            if (key !== 'confirmPassword')
                payload[key] = val.value
        });
        const { data } = await axiosInstance.post(ENDPOINTS.USER.SIGNUP, payload)
        console.log("🚀 ~ onSignup ~ data :", data)
    }


    const { hasDigit, hasLowerCase, hasSpecialCharacter, hasUpperCase, meetsMinChRequirement } = state.password.strongPwdValidation;

    const isPasswordValid = Object.values(state.password.strongPwdValidation).every(Boolean);


    

    return (
        <Container fluid>
            <Row>
                <Col sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <Card className='signup'>
                        <CardHeader>Sign Up</CardHeader>
                        <CardBody>
                            {[
                                { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
                                { id: 'username', label: 'Username', type: 'text', placeholder: 'Enter username' },
                                { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
                                { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
                                { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm password', errorLabel: 'Confirm password must be same as password' },
                            ].map(({ id, label, type, placeholder, errorLabel }) => {
                                const isPasswordField = id === 'password';
                                const isValid = state[id].isValid || (isPasswordField && isPasswordValid)

                                return <FormGroup className={isPasswordField ? 'position-relative mb-3' : 'mb-3'} key={id} controlId={id}>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl
                                        type={isPasswordField ? showPassword ? 'text' : type : type }
                                        placeholder={placeholder}
                                        value={state[id].value}
                                        onChange={updateFormField}
                                        isInvalid={state[id].isDirty && !(isValid)}
                                    >

                                    </FormControl>
                                    {state[id].isDirty && (state[id].value) && !(isValid) && <FormText className='text-danger'>{errorLabel || `${label} is invalid`} </FormText>}
                                    {state[id].isDirty && !(state[id].value) && <FormText className='text-danger'>{`${label} is required`}</FormText>}
                                    {isPasswordField &&
                                        <span onClick={() => setShowPassword(!showPassword)} className={state[id].isDirty && !isValid ? 'password error' : 'password'}>
                                            {showPassword ?
                                                <Eye size={20} /> : <EyeSlash size={20} />
                                            }
                                        </span>}
                                </FormGroup>
                            })}

                            {state.password.isDirty && state.password.value && <ul>
                                <li className={hasLowerCase ? 'text-success' : 'text-danger'}>Has a lowercase character</li>
                                <li className={hasUpperCase ? 'text-success' : 'text-danger'}>Has an uppercase character</li>
                                <li className={hasDigit ? 'text-success' : 'text-danger'}>Has a digit</li>
                                <li className={hasSpecialCharacter ? 'text-success' : 'text-danger'}>Has a special character</li>
                                <li className={meetsMinChRequirement ? 'text-success' : 'text-danger'}>Password length is 8 or more characters</li>
                            </ul>
                            }

                        </CardBody>
                        <CardFooter>
                            <Button variant='outline-primary' onClick={onSignup}>Sign Up</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup
