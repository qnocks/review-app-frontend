import React from "react";
import {Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import {Remarkable} from "remarkable";
import AuthService from "../../services/auth/AuthService";
import {TagsInput} from "react-tag-input-component";

const md = new Remarkable()

class ReviewForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewId: null,
            name: '',
            content: '',
            contentName: '',
            text: '',
            userId: null,
            tags: [],
        }
    }

    componentDidMount() {
        const id = this.props.match.params.reviewId;

        AuthService.getCurrentUser().then(
            res => {
                this.setState({userId: res.id});
            },
            err => {
                console.log(err);
            }
        );

        if (id !== null) {
            ReviewService.get(id).then(res => {
                this.setState({
                    name: res.data.name,
                    content: res.data.content,
                    contentName: res.data.contentName,
                    text: res.data.text
                });
            });
        }
    }

    save(event) {
        event.preventDefault();

        const review = {
            name: this.state.name,
            content: this.state.content,
            contentName: this.state.contentName,
            text: this.state.text,
            userId: this.state.userId,
            tags: this.state.tags
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
    }

    handleContentName(event) {
        this.setState({ contentName: event.target.value });
    }

    handleText(event) {
        this.setState({text: event.target.value });
    }

    handleTags(input) {
        console.log('tag')
        console.log(input)
        // const existingTags = this.state.tags;
        // existingTags.push(tag);
        this.setState({
            tags: input
            // tags: [...this.state.tags, tag]
            // tags: this.state.tags.concat(tag)
        })
        console.log('addTag tags:')
        console.log(this.state.tags);
    }

    render() {
        return (
            <Container className="">

                <TagsInput
                    className="mt-10"
                    name="tag"
                    value={this.state.tags}
                    onChange={this.handleTags.bind(this)}
                    placeHolder="Enter tags"
                    seprators={" "}
                />

                <Form className="p-5">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="name"
                            onChange={this.handleName.bind(this)}
                            defaultValue={this.state.name}
                            placeholder="Review name"
                        />
                    </Form.Group>

                    <Form.Select defaultValue={this.state.content} onChange={this.handleContent.bind(this)}>
                        <option>Content type</option>
                        <option value="BOOK">Book</option>
                        <option value="MOVIE">Movie</option>
                        <option value="GAME">Game</option>
                    </Form.Select>

                    {/*<pre>{JSON.stringify(this.state.tags)}</pre>*/}



                    <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="contentName"
                            onChange={this.handleContentName.bind(this)}
                            defaultValue={this.state.contentName}
                            placeholder="Content name"
                        />
                    </Form.Group>

                    <FloatingLabel controlId="text" label="text">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            defaultValue={this.state.text}
                            onChange={this.handleText.bind(this)}
                        />
                    </FloatingLabel>

                    <Button onClick={this.save.bind(this)} variant="primary" type="submit" className="mt-3">Save</Button>
                </Form>

                <Card.Title>Preview</Card.Title>
                <Card>
                    <Card.Header>{this.state.content} ({this.state.contentName})</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.name}</Card.Title>
                        <Card.Text className="text-start">
                            <div dangerouslySetInnerHTML={{__html: md.render(this.state.text)}} />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>


            </Container>
        );
    }
}

export default ReviewForm;