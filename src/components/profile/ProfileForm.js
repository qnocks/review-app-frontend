import React from "react";
import {Button, Container, Form} from "react-bootstrap";
import UserService from "../../services/UserService";
import AuthService from "../../services/auth/AuthService";

class ProfileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            newPassword: ''
        }
    }

    updateProfile(e) {
        e.preventDefault();

        const profile = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            newPassword: this.state.newPassword
        }

        console.log('updated profile');
        console.log(profile);

        const id = this.props.match.params.id;

        UserService.update(id, profile).then(res => {
            console.log('UserService.update success callback');
            console.log(res);
            AuthService.login(profile.username, profile.newPassword).then(
                () => {
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        });
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }

    handlePassword(event) {
        console.log('handlePassword is invoked');
        this.setState({ password: event.target.value });
        console.log(this.state.password)
    }

    handleNewPassword(event) {
        console.log('handleNewPassword is invoked');
        this.setState({ newPassword: event.target.value });
        console.log(this.state.newPassword)
    }

    render() {
        return (
            <Container className="w-25">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" onChange={this.handleUsername.bind(this)} placeholder="Enter new username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" onChange={this.handleEmail.bind(this)} placeholder="Enter new email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={this.handlePassword.bind(this)} placeholder="Enter your password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control type="password" onChange={this.handleNewPassword.bind(this)} placeholder="Enter new password" />
                    </Form.Group>
                    <Button onClick={this.updateProfile.bind(this)} variant="primary" type="submit">Save</Button>
                </Form>
            </Container>
        );
    }
}

export default ProfileForm;