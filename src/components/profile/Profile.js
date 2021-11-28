import React from "react";
import {Link, Redirect} from "react-router-dom";
import {Button, Card, Container, Table} from "react-bootstrap";
import AuthService from "../../services/auth/AuthService";
import UserService from "../../services/UserService";
import ReviewService from "../../services/ReviewService";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: null,
            roles: [],
            reviews: [],
            isOwn: false
        };
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        if (id) {
            console.log('OTHER PROFILE');
            UserService.get(id).then(
                res => {
                    console.log('res');
                    console.log(res.data);

                    const user = res.data;

                    this.setState({
                        currentUser: user,
                        reviews: res.data.reviews,
                        roles: res.data.roles,
                        userReady: true,
                        isOwn: false
                    })
                },
                err => {
                    console.log(err);
                    this.setState({ redirect: "/home" });
                }
            )
        }
        else {
            console.log('OWN PROFILE');
            AuthService.getCurrentUser().then(
                res => {

                    console.log('RES:')
                    console.log(res)

                    this.setState({
                        currentUser: res,
                        reviews: res.reviews,
                        userReady: true,
                        isOwn: true
                    })
                },
                err => {
                    console.log(err);
                    this.setState({ redirect: "/home" });
                }
            );
        }
    }

    deleteReview(id) {
        ReviewService.delete(id).then(
            res => {
                this.setState({
                    reviews: this.state.reviews.filter(e => e.id !== id)
                })
            },
            err => {
                console.log(err);
            }
        );
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        const { roles } = this.state;

        const { reviews } = this.state;

        const { isOwn } = this.state;

        console.log('Profile.render currentUser:');
        console.log(currentUser);

        console.log('Profile.render reviews:');
        console.log(reviews);

        return (
            <Container>
                {
                    (this.state.userReady) ?
                    <Card>
                        <Card.Header className="jumbotron">
                            <h3>Profile</h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <h2><strong>{currentUser.username}</strong></h2>
                            </Card.Title>
                            <Card.Text>
                                <p>
                                    <strong>Id:</strong>{" "}
                                    {currentUser.id}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {currentUser.email}
                                </p>
                                <strong>Authorities:</strong>
                                {
                                    roles ? (
                                        <p>
                                            {/*{currentUser.roles &&*/}
                                            {/*currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}*/}
                                        </p>
                                    ) : null
                                }
                            </Card.Text>
                            { isOwn ? (
                                <>
                                    <Link to={`/profile/${currentUser.id}/edit`} variant="primary">Edit</Link>
                                    <hr/>
                                    <Link to={`/profile/${currentUser.id}/reviews`} variant="primary">Add review</Link>
                                </>
                                ) : null
                            }
                        </Card.Body>
                        <Card.Title>Reviews</Card.Title>
                        <Table className="table table-bordered mt-3">
                            <thead>
                            <tr>
                                <td>Name</td>
                                <td>Content type</td>
                                <td>Content name</td>
                                <td/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                reviews.map(review =>
                                    <tr key = {review.id}>
                                        <Link to={`/reviews/${review.id}`}><td>{review.name}</td></Link>
                                        <td>{review.content}</td>
                                        <td>{review.contentName}</td>
                                        <td>
                                            <Button onClick={() => this.deleteReview(review.id)} className="btn btn-dark">
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                        {/*<Row xs={1} md={2} className="g-4">*/}
                        {/*    {*/}
                        {/*        currentUser.reviews.map((review, idx) => (*/}
                        {/*            <Col key={idx}>*/}
                        {/*                <NavLink>*/}
                        {/*                    <Link to={`/reviews/${review.id}`} className="review-link">*/}
                        {/*                        <Card>*/}
                        {/*                            <Card.Img variant="top" src="holder.js/100px160" />*/}

                        {/*                            <Card.Body>*/}
                        {/*                                <Card.Title>{review.name}</Card.Title>*/}
                        {/*                                <Card.Subtitle>{review.content}</Card.Subtitle>*/}
                        {/*                                <Card.Text>*/}
                        {/*                                    Review for {review.contentName}    Score: {review.score}   Rating {review.rating}*/}
                        {/*                                </Card.Text>*/}
                        {/*                            </Card.Body>*/}
                        {/*                        </Card>*/}
                        {/*                    </Link>*/}
                        {/*                </NavLink>*/}
                        {/*            </Col>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</Row>*/}
                    </Card> : null
                }
            </Container>
        );
    }
}

export default Profile;