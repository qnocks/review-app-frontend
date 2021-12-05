import React from "react";
import {Button, Card, Col, Container, Form, FormControl, InputGroup, NavLink, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import './css/ReviewList.css';

class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            currentPage: 1,
            reviewsPerPage: 2,
            totalPages: null,
            totalElements: null,
            redirect: null
        }
    }

    componentDidMount() {
        this.findAll(this.state.currentPage);
    }

    findAll(currentPage) {
        // currentPage -= 1;
        ReviewService.getAll(currentPage, this.state.reviewsPerPage).then(res => {
            this.setState({
                reviews: res.data.content,
                totalPages: res.data.totalPages,
                totalElements: res.data.totalElements,
                currentPage: res.data.number + 1
            })
        }).catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                this.setState({ redirect: "/login" });
            }
        })
    }

    delete(id) {
        ReviewService.delete(id).then(() => {
            this.setState({reviews: this.state.reviews.filter(d => d.id !== id)})
        });
    }

    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        this.findAll(targetPage);
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let first = 1;
        if (this.state.currentPage > first) {
            this.findAll(first);
        }
    };

    prevPage = () => {
        let prev = 1;
        if (this.state.currentPage > prev) {
            this.findAll(this.state.currentPage - prev);
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.reviewsPerPage);
        if (this.state.currentPage < condition) {
            this.findAll(condition)
        }
    };

    nextPage = () => {
        console.log('nextPage invoked')
        console.log(Math.ceil(this.state.totalElements / this.state.reviewsPerPage))
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.reviewsPerPage)) {
            this.findAll(this.state.currentPage + 1);
        }
    };

    render() {
        const { redirect, reviews, currentPage, totalPages } = this.state;

        if (redirect) {
            return <Redirect to={redirect} />
        }

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2BB",
            color: "#17A2BB",
            textAlign: "center",
            fontWeight: "bold"
        };

        return (
            <Container>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="justify-content-center w-auto align-content-center"
                        aria-label="Search"
                    />
                </Form>
                <Row xs={1} md={2} className="g-4">
                    {
                        reviews.map((review, idx) => (
                            <Col key={idx}>
                                <NavLink>
                                    <Link to={`/reviews/${review.id}`} className="review-link">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{review.name}</Card.Title>
                                                <Card.Subtitle>{review.content}</Card.Subtitle>
                                                <Card.Text>
                                                    Review for {review.contentName}    Score: {review.score}   Rating {review.rating}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </NavLink>
                            </Col>
                        ))
                    }
                </Row>
                {reviews.length > 0 ? (
                    <Card.Footer>
                        <div style={{"float":"left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Text>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1} onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1} onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>
                                </InputGroup.Text>
                                <FormControl style={pageNumCss} name="currentPage" value={currentPage} onChange={this.changePage} />
                                <InputGroup.Text>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages} onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward} /> Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages} onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faFastForward} /> Last
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                ) : null}
            </Container>
        )
    }
}

export default ReviewList;