import React from "react";
import {Link, Redirect} from "react-router-dom";
import {Card, Col, Container, NavLink, Row} from "react-bootstrap";
import AuthService from "../../services/auth/AuthService";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: null
        };
    }

    componentDidMount() {
        console.log('Profile.componentDidMount() before getCurrentUser')
        AuthService.getCurrentUser().then(
            res => {
                this.setState({
                    currentUser: res,
                    userReady: true
                })
                // this.props.history.push("/profile");
                // window.location.reload();
            },
            err => {
                console.log(err);
                this.setState({ redirect: "/home" });
            }
        );

        // const currentUser = AuthService.getCurrentUser();
        //
        // if (!currentUser) {
        //     this.setState({ redirect: "/home" });
        // }
        //
        // this.setState({
        //     currentUser: currentUser,
        //     userReady: true
        // })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        console.log('Profile.render currentUser:')
        console.log(currentUser);

        return (
            <Container>
                {
                    (this.state.userReady) ?
                    <Card>
                        <Card.Header className="jumbotron">
                            <h3>
                                Profile
                            </h3>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <h2>
                                    <strong>{currentUser.username}</strong>
                                </h2>
                            </Card.Title>
                            <Card.Text>
                                <p>
                                    <strong>Token:</strong>{" "}
                                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                                </p>
                                <p>
                                    <strong>Id:</strong>{" "}
                                    {currentUser.id}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {currentUser.email}
                                </p>
                                <strong>Authorities:</strong>
                                <p>
                                    {currentUser.roles &&
                                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                                </p>
                            </Card.Text>
                            <Link to={`/profile/${currentUser.id}/edit`} variant="primary">Edit</Link>
                            <hr/>
                            <Card.Title>Reviews</Card.Title>
                            <Link to={`/profile/${currentUser.id}/reviews`} variant="primary">Add review</Link>
                        </Card.Body>
                        <Row xs={1} md={2} className="g-4">
                            {
                                currentUser.reviews.map((review, idx) => (
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
                    </Card> : null
                }
            </Container>
        );
    }
}

export default Profile;