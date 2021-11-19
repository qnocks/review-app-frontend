import React from "react";
import {Redirect} from "react-router-dom";
import {Card, Container} from "react-bootstrap";
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
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({ redirect: "/home" });
        }

        this.setState({
            currentUser: currentUser,
            userReady: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser } = this.state;

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
                        </Card.Body>
                    </Card>: null
                }
            </Container>
        );
    }
}

export default Profile;