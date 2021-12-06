import React, {useCallback} from "react";
import {Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import {Remarkable} from "remarkable";
import AuthService from "../../services/auth/AuthService";
import {WithContext as ReactTags} from 'react-tag-input';
import ImageService from "../../services/ImageService";
import {useDropzone} from "react-dropzone";
import {Redirect} from "react-router-dom";

const md = new Remarkable()

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const formData = new FormData();

function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        formData.append('image', file);
        console.log(file);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

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
            imagesLink: null,
            redirect: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.reviewId;

        this.setState({reviewId: this.props.match.params.reviewId});

        AuthService.getCurrentUser().then(
            res => {
                this.setState({userId: res.id});
            },
            err => {
                console.log(err);
                this.setState({ redirect: "/login" });
            }
        );

        if (id !== null) {
            ReviewService.get(id).then(res => {
                this.setState({
                    name: res.data.name,
                    content: res.data.content,
                    contentName: res.data.contentName,
                    text: res.data.text,
                    tags: res.data.tags,
                    imagesLink: res.data.imagesLink
                });
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    this.setState({ redirect: "/login" });
                }
            });
        }
    }

    createOrUpdate(id, review) {
        if (id !== undefined) {
            if (formData.get('image')) {
                ImageService.upload(id, formData).then(
                    res => {
                        console.log('File uploaded successfully');
                        console.log(res);

                        console.log('ReviewForm.save.review:');
                        console.log(review);
                    },
                    err => {
                        console.log(err);
                        if (err.response.status === 401) {
                            this.setState({redirect: "/login"});
                        }
                    }
                )
            }
            ReviewService.update(id, review).then(
                (res) => {
                    console.log(res.data)
                    this.props.history.push("/profile");
                },
                err => {
                    console.log(err);
                    if (err.response.status === 401) {
                        this.setState({ redirect: "/login" });
                    }
                }
            );
        }
        else {
            ReviewService.save(review).then(
                (res) => {
                    if (formData.get('image')) {
                        ImageService.upload(res.data.id, formData).then(
                            res => {
                                console.log('File uploaded successfully');
                                console.log(res);

                                console.log('ReviewForm.save.review:');
                                console.log(review);
                            },
                            err => {
                                console.log(err);
                                if (err.response.status === 401) {
                                    this.setState({redirect: "/login"});
                                }
                            }
                        )
                    }
                    this.props.history.push("/profile");
                },
                err => {
                    console.log(err);
                    if (err.response.status === 401) {
                        this.setState({ redirect: "/login" });
                    }
                }
            );
        }
    }

    save(event) {
        event.preventDefault();

        const id = this.props.match.params.reviewId;

        const review = {
            name: this.state.name,
            content: this.state.content,
            contentName: this.state.contentName,
            text: this.state.text,
            userId: this.state.userId,
            tags: this.state.tags,
            imagesLink: this.state.imagesLink
        };

        this.createOrUpdate(id, review);
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

     handleDelete(i) {
        const { tags } = this.state;
        this.setState({tags: tags.filter((tag, index) => index !== i)});
    }

    handleAddition(input) {
        const tag = {
            id: null,
            name: input.text
        }
        this.setState({tags: [...this.state.tags, tag]});
    }

    handleTagClick(index) {
        console.log("The tag at index " + index + " was clicked");
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to={redirect} />
        }

        const { tags } = this.state;

        let displayTags = [];

        for (let i = 0; i < tags.length; i++) {
            const displayTag = {
                id: tags[i].name,
                text: tags[i].name
            }

            displayTags.push(displayTag);
        }

        return (
            <Container className="">
                <div>
                    <ReactTags
                        handleDelete={this.handleDelete.bind(this)}
                        handleAddition={this.handleAddition.bind(this)}
                        delimiters={delimiters}
                        placeholder="Enter tag..."
                        minQueryLength={2}
                        maxLength={10}
                        autofocus={false}
                        allowDeleteFromEmptyInput={true}
                        autocomplete={true}
                        readOnly={false}
                        allowUnique={true}
                        allowDragDrop={true}
                        inline={true}
                        allowAdditionFromPaste={true}
                        editable={true}
                        clearAll={true}
                        tags={displayTags}
                    />
                </div>

                <Dropzone />

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
                    <Card.Footer className="text-muted">{}</Card.Footer>
                </Card>
            </Container>
        );
    }
}

export default ReviewForm;