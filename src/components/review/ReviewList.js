import React from "react";
import {Card, Col, Container, Form, FormControl, NavLink, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import './css/ReviewList.css';

class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            redirect: null
        }
    }

    componentDidMount() {
        ReviewService.getAll().then(res => {
            this.setState({
                reviews: res.data
            })
        }).catch(err => {
            console.log(err)
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

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to={redirect} />
        }

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
                        this.state.reviews.map((review, idx) => (
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
            </Container>
        )
    }
}

export default ReviewList;