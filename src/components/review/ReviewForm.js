import React from "react";
import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import {Remarkable} from "remarkable";

const md = new Remarkable()

class ReviewForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewId: -1,
            name: '',
            content: '',
            contentName: '',
            text: ''
        }
    }

    componentDidMount() {

        this.setState({reviewId: this.props.match.params.reviewId});

        // id = this.props.match.params.id;

        console.log('reviewId');
        console.log(this.props.match.params.reviewId);
        console.log(this.state.reviewId);

        const id = this.props.match.params.reviewId;

        if (id !== null) {
            ReviewService.get(id).then(res => {

                this.setState({
                    name: res.data.name,
                    content: res.data.content,
                    contentName: res.data.contentName,
                    text: res.data.text
                });

                // console.log('ReviewForm.didMount success callback');
                // console.log(this.state.name);
                // console.log(this.state.content);
                // console.log(this.state.contentName);
                // console.log(this.state.text);
            });
        }
    }

    save(event) {
        event.preventDefault();

        const review = {
            name: this.state.name,
            content: this.state.content,
            contentName: this.state.contentName,
            text: this.state.text
        };

        console.log('ReviewForm.save.review:');
        console.log(review);

        const id = this.props.match.params.reviewId;

        console.log('reviewId');
        console.log(id);

        if (id !== undefined) {
            console.log('UPDATE');
            ReviewService.update(id, review).then(
                () => {
                    this.props.history.push("/profile");
                },
                err => {
                    console.log(err);
                }
            );
        }
        else {
            console.log('CREATE');
            ReviewService.save(review).then(
                () => {
                    this.props.history.push("/profile");
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }

    handleContent(event) {
        this.setState({ content: event.target.value });
        // console.log(this.state.content);
    }

    handleContentName(event) {
        this.setState({ contentName: event.target.value });
        // console.log(this.state.contentName);
    }

    handleText(event) {
        this.setState({text: event.target.value });
        // console.log(this.state.text);
    }

    render() {
        return (
            <Container className="">
                <Form className="p-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="name" onChange={this.handleName.bind(this)} placeholder="Review name" />
                    </Form.Group>

                    <Form.Select className="" onChange={this.handleContent.bind(this)}>
                        <option>Content type</option>
                        <option value="BOOK">Book</option>
                        <option value="MOVIE">Movie</option>
                        <option value="GAME">Game</option>
                    </Form.Select>

                    <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
                        <Form.Control type="contentName" onChange={this.handleContentName.bind(this)} placeholder="Content name" />
                    </Form.Group>

                    <FloatingLabel controlId="text" label="text">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            onChange={this.handleText.bind(this)}
                        />
                    </FloatingLabel>

                    <Button onClick={this.save.bind(this)} variant="primary" type="submit" className="mt-3">Save</Button>
                </Form>
                <div dangerouslySetInnerHTML={{__html: md.render(this.state.text)}} />
            </Container>
        );
    }
}

export default ReviewForm;