import React from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Review App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/reviews">Reviews</Nav.Link>
                        <Nav.Link href="/users">Admin</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;