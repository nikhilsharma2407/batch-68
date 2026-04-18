import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import { axiosInstance, ENDPOINTS } from './apiUtil';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { state } = useLocation();
  const navigate = useNavigate();

  const onLogin = async () => {
    const payload = { username, password };
    const { data } = (await axiosInstance.post(ENDPOINTS.USER.LOGIN, payload));
    console.log("🚀 ~ onLogin ~ data:", data)
    if (state) {
      navigate(state);
    }
  };

  const isValid = username && password;

  return (
    <Container fluid>
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Card>
            <CardHeader>Login</CardHeader>
            <CardBody>
              <FormGroup controlId='username' className='mb-3'>
                <FormLabel>username</FormLabel>
                <FormControl onChange={e => setUsername(e.target.value)} placeholder='Enter username' />
              </FormGroup>

              <FormGroup controlId='password' className='mb-3'>
                <FormLabel>password</FormLabel>
                <FormControl onChange={e => setPassword(e.target.value)} placeholder='Enter password' type='password' />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button variant='outline-primary' disabled={!isValid} onClick={onLogin}>Login</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login