import React from "react";
import {Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import {Remarkable} from "remarkable";
import AuthService from "../../services/auth/AuthService";
import {TagsInput} from "react-tag-input-component";

const md = new Remarkable()

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};

let tagId = 0;

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

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
                    text: res.data.text,
                    tags: res.data.tags
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

        for (let i = 0; i < input.length; i++) {
            const tag = {
                name: input[i]
            };
            console.log('tag in loop')
            console.log(tag)

            this.setState({tags: [...this.state.tags, tag]});
        }

        console.log('state.tags')
        console.log(this.state.tags);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        console.log('tag')
        console.log(tag)

        const inputTag = JSON.stringify(tag);

        const realTag = {
            id: '' + tagId++,
            name: inputTag.text
        }

        console.log('realTag')
        console.log(realTag)

        this.setState(state => ({ tags: [...state.tags, realTag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {

        const { tags, suggestions } = this.state;

        console.log(this.state.tags)

        let tagsStr = '';
        // tags !== null ? tags.forEach(tag => {tagsStr += tag.name + ' ';}) : '';
        if (tags) {
            tags.forEach(tag => {tagsStr += tag.name + ' ';});
        }

        return (
            <Container className="">

                <TagsInput
                    className="mt-10"
                    name="tag"
                    value={tags}
                    onChange={this.handleTags.bind(this)}
                    placeHolder="Enter tags"

                />

                {/*<ReactTags tags={tags}*/}
                {/*   // suggestions={suggestions}*/}
                {/*   handleDelete={this.handleDelete.bind(this)}*/}
                {/*   handleAddition={this.handleAddition.bind(this)}*/}
                {/*   handleDrag={this.handleDrag.bind(this)}*/}
                {/*   delimiters={delimiters}*/}
                {/*/>*/}

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
                    <Card.Footer className="text-muted">{tagsStr}</Card.Footer>
                </Card>


            </Container>
        );
    }
}

export default ReviewForm;