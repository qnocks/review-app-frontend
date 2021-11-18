import React from "react";
import ReviewService from "../../services/ReviewService";
import {Card, Col, Container, Form, FormControl, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import './css/ReviewList.css';

class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    componentDidMount() {
        console.log('ReviewList.componentDidMount()');
        ReviewService.getAll().then(res => {
            this.setState({
                reviews: res.data
            })
            console.log('reviews: ' + this.state.reviews);
            console.log('reviews size: ' + this.state.reviews.length);
        }).catch(err => {
            console.log(err)
        })
    }

    delete(id) {
        ReviewService.delete(id).then(() => {
            this.setState({reviews: this.state.reviews.filter(d => d.id !== id)})
        });
    }

    render() {

        console.log('ReviewList.render()')

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
                                            <Card.Img variant="top" src="holder.js/100px160" />
                                            <Card.Body>
                                                <Card.Title>{review.name}</Card.Title>
                                                <Card.Subtitle>{review.content}</Card.Subtitle>
                                                <Card.Text>
                                                    <p>Review for {review.contentName}    Score: {review.score}   Rating {review.rating}</p>
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