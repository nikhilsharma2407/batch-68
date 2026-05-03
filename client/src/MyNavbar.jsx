import { Badge, Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useSearchParams } from 'react-router';
import useIsLoggedIn from './hooks/useIsLoggedIn';
import { useUserContext } from './UserContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, ENDPOINTS } from './apiUtil';
import { toast } from 'react-toastify';
import { Cart } from 'react-bootstrap-icons';
import { useGetCart } from './hooks/useCart';

function MyNavbar() {
    const user = useIsLoggedIn();
    console.log("🚀 ~ MyNavbar ~ user:", user)
    const { data: cart } = useGetCart()
    console.log("🚀 ~ MyNavbar ~ cart:", cart)
    const totalQuantity = cart?.totalQuantity
    console.log("🚀 ~ MyNavbar ~ totalQuantity:", totalQuantity)
    const { setUserData } = useUserContext();
    const queryClient = useQueryClient();

    const [, setSearchParams] = useSearchParams();

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
                        <Nav.Link as={Link} to="counter">Counter</Nav.Link>
                    </Nav>
                    <Nav>
                        {!user ? <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </> :
                            <>

                                <Nav.Link as={Link} to='/user/2fa-setup'>2FA setup</Nav.Link>
                                <Nav.Link as={Link} to='/user/cart'>
                                    <Cart size={25} />
                                    {totalQuantity > 0 && <Badge style={{ transform: `translate(-10px, -10px)` }} pill>{totalQuantity}</Badge>}
                                </Nav.Link>
                                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                            </>
                        }
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={e=>{
                                setSearchParams({search:e.target.value});
                            }}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
