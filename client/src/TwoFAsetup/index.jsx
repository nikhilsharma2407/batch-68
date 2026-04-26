import React, { useEffect, useState } from 'react'
import { axiosInstance, ENDPOINTS } from '../apiUtil';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Card, CardBody, CardHeader, Col, Container, FormControl, Image, Row } from 'react-bootstrap';
import Loader from '../Loader';
import { toast } from 'react-toastify';

const TwoFAsetup = () => {
    const user = useIsLoggedIn();
    const [otp, setOtp] = useState('')
    const queryFn = () => axiosInstance.get(ENDPOINTS.USER.QR_CODE).then(r => r.data);

    const { data, isLoading, error } = useQuery({
        queryKey: ["QR_CODE"],
        queryFn: queryFn,
        enabled: !!user,
        refetchOnWindowFocus: false,
    });


    const { data: qrCode, message } = data || {};

    useEffect(() => {
        if (qrCode) {
            toast.success(message);
        }
    }, [qrCode])


    if (isLoading)
        return <Loader />

    const initTwoFA = async () => {
        try {
            const { message } = (await axiosInstance.post(ENDPOINTS.USER.TWO_FA_SETUP, { otp })).data;
            console.log("🚀 ~ initTwoFA ~ message:", message)
            toast.success(message);

        } catch (error) {
            console.log("🚀 ~ initTwoFA ~ error:", error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
        } finally {
            setOtp("")
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <Card>
                        <CardHeader>2FA Setup</CardHeader>
                        <CardBody className='d-flex flex-column'>
                            <h2>Scan this code with Google Authenticator</h2>
                            <Image src={qrCode} className='align-self-center' />

                            <FormControl value={otp} className='mb-3' onChange={e => setOtp(e.target.value)} placeholder='Enter OTP' type='number' maxLength={6} />
                            <Button variant='outline-primary' onClick={initTwoFA} disabled={!otp}>Submit</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default TwoFAsetup