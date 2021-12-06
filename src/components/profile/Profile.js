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
                    this.setState({ redirect: "/login" });
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
                    </Card> : null
                }
            </Container>
        );
    }
}

export default Profile;