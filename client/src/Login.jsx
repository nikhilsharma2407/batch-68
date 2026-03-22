import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'

const Login = () => {
  const { state } = useLocation();
  console.log("🚀 ~ Login ~ state:", state)
  const navigate = useNavigate();

  const onLogin = () => {
    setTimeout(() => {
      sessionStorage.setItem('isLoggedIn', true);
      if (state) {
        navigate(state);
      }
    }, 1000);
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Card>
            <CardHeader>Login</CardHeader>
            <CardBody>
              <FormGroup controlId='username' className='mb-3'>
                <FormLabel>username</FormLabel>
                <FormControl placeholder='Enter username' />
              </FormGroup>

              <FormGroup controlId='password' className='mb-3'>
                <FormLabel>password</FormLabel>
                <FormControl placeholder='Enter password' type='password' />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button variant='outline-primary' onClick={onLogin}>Login</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login