import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormControl, FormGroup, FormLabel, Row, Alert } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import { axiosInstance, ENDPOINTS } from './apiUtil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UserContext } from './UserContextProvider';

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [showMagicLinkForm, setShowMagicLinkForm] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate: generateMagicLink, isPending: isGeneratingLink } = useMutation({
    mutationFn: (payload) => axiosInstance.post(ENDPOINTS.USER.GENERATE_MAGIC_LINK, payload),
    onSuccess: ({ data: response }) => {
      toast.success(response.message);
      setShowMagicLinkForm(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || 'Failed to generate magic link');
    },
  });

  const onLogin = () => login({ username, password });

  const onGenerateMagicLink = () => {
    if (!username) {
      toast.error('Please enter your username');
      return;
    }
    generateMagicLink({ username });
  };

  const isValid = username && password;

  const passwordResetHandler = async () => {
    try {
      const { message } = await (await (axiosInstance.patch(ENDPOINTS.USER.RESET_PASSWORD,
        { username, newPassword: password, otp }))).data
      toast.success(message);

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  };


  return (
    <Container fluid>
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Card>
            <CardHeader>
              {showMagicLinkForm ? 'Login with Magic Link' : showResetForm ? 'Reset Password' : 'Login'}
            </CardHeader>
            <CardBody>
              {!showMagicLinkForm && (
                <>
                  <FormGroup controlId='username' className='mb-3'>
                    <FormLabel>username</FormLabel>
                    <FormControl onChange={e => setUsername(e.target.value)} placeholder='Enter username' />
                  </FormGroup>

                  <FormGroup controlId='password' className='mb-3'>
                    <FormLabel>password</FormLabel>
                    <FormControl onChange={e => setPassword(e.target.value)} placeholder='Enter password' type='password' />
                  </FormGroup>
                  {
                    showResetForm && <FormGroup controlId='otp' className='mb-3'>
                      <FormLabel>otp</FormLabel>
                      <FormControl onChange={e => setOtp(e.target.value)} placeholder='Enter otp' type='number' />
                    </FormGroup>
                  }
                </>
              )}

              {showMagicLinkForm && (
                <>
                  <FormGroup controlId='username' className='mb-3'>
                    <FormLabel>username</FormLabel>
                    <FormControl 
                      value={username}
                      onChange={e => setUsername(e.target.value)} 
                      placeholder='Enter username' 
                    />
                  </FormGroup>

                  <Alert variant='info'>
                    <Alert.Heading>Magic Link Login</Alert.Heading>
                    <p className='mb-0'>
                      Enter your username and we'll send a magic link to your registered email address. 
                      Click the link in the email to login instantly without a password.
                    </p>
                    <p className='mt-2 mb-0 text-muted' style={{ fontSize: '0.85rem' }}>
                      The link will expire in 10 minutes.
                    </p>
                  </Alert>
                </>
              )}

            </CardBody>
            <CardFooter className='d-flex flex-column gap-2'>
              <div className='d-flex'>
                {!showMagicLinkForm && (
                  <Button variant='outline-primary' disabled={!isValid || isPending}
                    onClick={showResetForm ? passwordResetHandler : onLogin}>
                    {isPending ? 'Logging in...' : 'Submit'}
                  </Button>
                )}

                {showMagicLinkForm && (
                  <Button 
                    variant='outline-primary' 
                    disabled={!username || isGeneratingLink}
                    onClick={onGenerateMagicLink}
                  >
                    {isGeneratingLink ? 'Generating...' : 'Generate Magic Link'}
                  </Button>
                )}

                {!showMagicLinkForm && !showResetForm && (
                  <Button className='ms-auto' variant='link' onClick={() => setShowResetForm(true)}>
                    Forgot Password
                  </Button>
                )}
              </div>

              <div className='d-flex gap-2'>
                {showMagicLinkForm && (
                  <Button 
                    variant='link' 
                    size='sm'
                    onClick={() => {
                      setShowMagicLinkForm(false);
                    }}
                  >
                    Back to Login
                  </Button>
                )}
                {!showMagicLinkForm && (
                  <Button 
                    variant='link' 
                    size='sm'
                    onClick={() => {
                      setShowMagicLinkForm(true);
                      setShowResetForm(false);
                    }}
                  >
                    Login with Magic Link
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login