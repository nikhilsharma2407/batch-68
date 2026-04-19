import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
import useIsLoggedIn from './hooks/useIsLoggedIn';
import { useUserContext } from './UserContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, ENDPOINTS } from './apiUtil';
import { toast } from 'react-toastify';

function MyNavbar() {
    const user = useIsLoggedIn();
    const { setUserData } = useUserContext();
    const queryClient = useQueryClient();

    const { mutate: logout } = useMutation({
        mutationFn: () => axiosInstance.get(ENDPOINTS.USER.LOGOUT),
        onSuccess: ({ data }) => {
            setUserData(null);
            queryClient.setQueryData(['userData'], null);
            toast.success(data.message);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || 'Logout failed');
        },
    });

    const onLogout = () => logout();

    return (
        <Navbar collapseOnSelect expand="md" className="bg-dark mb-3" variant='dark'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" >Amazecart</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="flex">Flexbox</Nav.Link>
                        <Nav.Link as={Link} to="routing/apple-iphone-16-black-128-gb?query=iPhone&location=IN">Routing</Nav.Link>
                    </Nav>
                    <Nav>
                        {!user ? <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </> : <Nav.Link onClick={onLogout}>Logout</Nav.Link>}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
