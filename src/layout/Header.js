import React from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import AuthService from "../services/auth/AuthService";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        }
    }

    componentDidMount() {
        AuthService.getCurrentUser().then(
            res => {
                this.setState({
                    authenticated: true
                })
            }
        );

        // if (user) {
        //     this.setState({
        //         authenticated: true
        //     })
        // }

        // const user = AuthService.getCurrentUser();
        //
        // if (user) {
        //     this.setState({
        //         authenticated: true
        //     })
        // }
    }

    logout() {
        AuthService.logout();

        this.setState({
            authenticated: false
        });
    }

    render() {

        const { authenticated } = this.state;

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
                        { authenticated ? (
                                <Nav.Link href="/login" onClick={this.logout}>Logout</Nav.Link>
                        ) : (
                            <div>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </div>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;