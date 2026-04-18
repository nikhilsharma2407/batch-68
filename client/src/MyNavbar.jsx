import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';

function MyNavbar() {
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
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Signup</Nav.Link>

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