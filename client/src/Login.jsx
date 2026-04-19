import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import { axiosInstance, ENDPOINTS } from './apiUtil';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UserContext } from './UserContextProvider';

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  console.log("🚀 ~ Login ~ userData:", userData)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { state } = useLocation();
  const navigate = useNavigate();

  const { mutate: login, isPending, isError, error } = useMutation({
    mutationFn: (payload) => axiosInstance.post(ENDPOINTS.USER.LOGIN, payload),
    onSuccess: ({ data: response }) => {
      setUserData(response.data)
      toast.success(response.message);
      if (state) navigate(state);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || 'Login failed');
    },
  });

  const onLogin = () => login({ username, password });

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
              <Button variant='outline-primary' disabled={!isValid || isPending} onClick={onLogin}>
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login