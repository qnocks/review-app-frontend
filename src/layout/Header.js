import React from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import AuthService from "../services/auth/AuthService";
import SearchService from "../services/SearchService";
import {Redirect} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            redirect: false,
            searchedReviews: []
        }
    }

    componentDidMount() {
        AuthService.getCurrentUser().then(
            res => {
                this.setState({authenticated: true});
            },
            err => {
                this.setState({authenticated: false});
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

    handleSearch(event) {
        event.preventDefault();
        this.setState({search: event.target.value});
        console.log(this.state.search);
    }

    search(event) {
        event.preventDefault();

        const text = this.state.search;
        console.log('Header.search: text');
        console.log(text);
        
        SearchService.getSearchReview(text).then(
            res => {
                this.props.history.push({
                    pathname: '/',
                    state: {
                        reviews: res.data.content,
                        totalPages: res.data.totalPages,
                        totalElements: res.data.totalElements,
                        currentPage: 1,
                        reviewsPerPage: 2,
                    }
                });

                window.location.reload();
            },
            err => {
                console.log(err);
            }
        );
    }

    logout() {
        AuthService.logout();

        this.setState({
            authenticated: false
        });
    }

    render() {

        if (this.state.redirect) {
            console.log('REDIRECTING TO /home with ');
            console.log(this.state.searchedReviews);
            return <Redirect to={{
                    pathname: '/home',
                    state: { reviews: this.state.searchedReviews }
                }}
            />
        }

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
                                    onChange={this.handleSearch.bind(this)}
                                />
                            <Button onClick={this.search.bind(this)} variant="outline-success">Search</Button>
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