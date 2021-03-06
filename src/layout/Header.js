import React from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import AuthService from "../services/auth/AuthService";
import SearchService from "../services/SearchService";
import {Redirect} from "react-router-dom";
import ReviewService from "../services/ReviewService";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            redirect: false,
            searchedReviews: [],
            currentPage: 1,
            reviewsPerPage: 3,
            totalPages: null,
            totalElements: null,
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

        // this.props.history.push("/");

        SearchService.getSearchReview(text).then(
            res => {
                this.setState({
                    // redirect: true,
                    // searchedReviews: res.data
                });

                // this.props.history.push("/");

                console.log('Header.search successful callback');
                console.log(this.state.reviews);

                this.props.history.push({
                    pathname: '/',
                    state: {reviews: res.data}
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