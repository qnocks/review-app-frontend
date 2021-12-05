import React from "react";
import {Card, Col, Container, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReviewService from "../../services/ReviewService";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        };
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                reviews: this.props.location.state.reviews
            });
        }
    }

    render() {
        const { reviews } = this.state;


        return (
            <Container>
                <h1>Home page</h1>
                {reviews.length !== 0 ? (<h3>Searched Reviews</h3>) : null}
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

export default Home;