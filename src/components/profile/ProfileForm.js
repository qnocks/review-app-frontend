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
            password: ''
        }
    }

    updateProfile(event) {
        event.preventDefault();

        const profile = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        console.log('profile')
        console.log(profile)

        const id = this.props.match.params.id;

        UserService.update(id, profile).then(res => {
            AuthService.login(this.state.username, this.state.password).then(() => {
                    this.props.history.push("/profile");
                    window.location.reload();
                }
            );
        });

        // AuthService.updateUser(updatedUser);
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
                        <Form.Control type="text" onChange={this.handlePassword.bind(this)} placeholder="Enter new password" />
                    </Form.Group>
                    <Button onClick={this.updateProfile.bind(this)} variant="primary" type="submit">Save</Button>
                </Form>
            </Container>
        );
    }
}

export default ProfileForm;