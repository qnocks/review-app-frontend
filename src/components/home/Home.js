import React from "react";
import {Card, Col, Container, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import SearchService from "../../services/SearchService";

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

    findAll() {
        SearchService.getSearchReview(this.state.search).then(res => {
            this.setState({
                reviews: res.data
            });
        }).catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                this.setState({ redirect: "/login" });
            }
        })
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