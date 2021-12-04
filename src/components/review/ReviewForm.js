import React, {useCallback} from "react";
import {Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import {Remarkable} from "remarkable";
import AuthService from "../../services/auth/AuthService";
import {WithContext as ReactTags} from 'react-tag-input';
// import Dropzone from "../../layout/Dropzone";
import ImageService from "../../services/ImageService";
import {useDropzone} from "react-dropzone";

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
                    tags: res.data.tags,
                    file: null
                });
            });
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
            imagesLink: ''
        };

        ImageService.upload(id, formData).then(
            res => {
                console.log('File uploaded successfully');
                console.log(res);
                review.imagesLink = res.data;

                console.log('ReviewForm.save.review:');
                console.log(review);

                if (id !== undefined) {
                    console.log('UPDATE');
                    ReviewService.update(id, review).then(
                        (res) => {
                            console.log('update success callback data')
                            console.log(res.data)
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
            },
            err => {
                console.log(err);
            }
        )

        // console.log('ReviewForm.save.review:');
        // console.log(review);

        // if (id !== undefined) {
        //     console.log('UPDATE');
        //     ReviewService.update(id, review).then(
        //         (res) => {
        //             console.log('update success callback data')
        //             console.log(res.data)
        //             this.props.history.push("/profile");
        //         },
        //         err => {
        //             console.log(err);
        //         }
        //     );
        // }
        // else {
        //     console.log('CREATE');
        //     ReviewService.save(review).then(
        //         () => {
        //             this.props.history.push("/profile");
        //         },
        //         err => {
        //             console.log(err);
        //         }
        //     );
        // }
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

    // convertToRenderedTags(tags) {
    //     for (let i = 0; i < tags.length; i++) {
    //
    //         const renderedTag = {
    //             id: tags[i].name,
    //             text: tags[i].name
    //         };
    //
    //         console.log('convertToRenderedTags tag:')
    //         console.log(renderedTag)
    //
    //         this.setState({renderedTags: [...this.state.renderedTags, renderedTag]});
    //     }
    // }
    //
    // onChangeTags(input) {
    //     for (let i = 0; i < input.length; i++) {
    //         const tag = {name: input[i]};
    //         this.setState({tags: [...this.state.tags, tag]});
    //     }
    // }
    //
    // onRemovedTags(input) {
    //     console.log('onremoved input')
    //     console.log(input)
    // }

    // handleDelete(i) {
    //     const { tags } = this.state;
    //     this.setState({
    //         renderedTags: tags.filter((tag, index) => index !== i),
    //     });
    // }
    //
    // handleAddition(tag) {
    //     console.log('tag')
    //     console.log(tag)
    //
    //     const realTag = {
    //         id: null,
    //         name: tag.text
    //     }
    //
    //     console.log('realTag')
    //     console.log(realTag)
    //
    //     // this.setState(state => ({ tags: [...state.tags, realTag] }));
    //     this.setState(state => ({ renderedTags: [...state.renderedTags, realTag] }));
    // }
    //
    // handleDrag(tag, currPos, newPos) {
    //     const tags = [...this.state.tags];
    //     const newTags = tags.slice();
    //
    //     newTags.splice(currPos, 1);
    //     newTags.splice(newPos, 0, tag);
    //
    //     // re-render
    //     this.setState({ renderedTags: newTags });
    // }

    // =================================================================================================================
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({tags: tags.filter((tag, index) => index !== i)});
        // setTags(tags.filter((tag, index) => index !== i));
    }

    handleAddition(input) {
        const tag = {
            id: null,
            name: input.text
        }
        this.setState({tags: [...this.state.tags, tag]});
    }

    handleDrag(tag, currPos, newPos) {
        // const newTags = [...tags].slice();

        // newTags.splice(currPos, 1);
        // newTags.splice(newPos, 0, tag);

        // setTags(newTags);
    }

    handleTagClick(index) {
        console.log("The tag at index " + index + " was clicked");
    }

    onClearAll() {
        // setTags([]);
    }

    onTagUpdate(i, newTag) {
        // const updatedTags = tags.slice();
        // updatedTags.splice(i, 1, newTag);
        // setTags(updatedTags);
    }

    render() {
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

                {/*<TagsInput*/}
                {/*    className="mt-10"*/}
                {/*    name="tag"*/}
                {/*    value={tags}*/}
                {/*    onChange={this.onChangeTags.bind(this)}*/}
                {/*    onRemoved={this.onRemovedTags.bind(this)}*/}
                {/*    placeHolder="Enter tags"*/}
                {/*/>*/}

                {/*<ReactTags*/}
                {/*    tags={renderedTags}*/}
                {/*    labelField={'name'}*/}
                {/*    // suggestions={renderedTags}*/}
                {/*    handleDelete={this.handleDelete.bind(this)}*/}
                {/*    handleAddition={this.handleAddition.bind(this)}*/}
                {/*    handleDrag={this.handleDrag.bind(this)}*/}
                {/*    delimiters={delimiters}*/}
                {/*/>*/}

                {/*<div className={styles.ReactTags}>*/}
                <div>
                    <ReactTags
                        handleDelete={this.handleDelete.bind(this)}
                        handleAddition={this.handleAddition.bind(this)}
                        handleDrag={this.handleDrag.bind(this)}
                        delimiters={delimiters}
                        handleTagClick={this.handleTagClick.bind(this)}
                        onClearAll={this.onClearAll.bind(this)}
                        onTagUpdate={this.onTagUpdate.bind(this)}
                        suggestions={[{"id":"1","text":"Albania"},{"id":"2","text":"Australia"},{"id":"3","text":"France"},{"id":"4","text":"India"},{"id":"5","text":"Oman"},{"id":"6","text":"Russia"},{"id":"7","text":"Serbia"},{"id":"8","text":"Swaziland"},{"id":"9","text":"United States of America"},{"id":"10","text":"Vietnam"}]}
                        placeholder="Search..."
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