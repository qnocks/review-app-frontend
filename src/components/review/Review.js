import React from "react";
import {Card, Container} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import {Remarkable} from "remarkable";
import Markdown from 'react-remarkable';
import {Link} from "react-router-dom";
import AuthService from "../../services/auth/AuthService";

const md = new Remarkable()

class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            review: {name: '', text: '', userId: null},
            currentUserId: null,
            isOwn: false
        }
    }

    componentDidMount() {
        ReviewService.get(this.props.match.params.id).then(res => {
            this.setState({
                review: res.data,
                text: res.data.text
            })
        }).catch(err => {
            console.log(err);
        });

        AuthService.getCurrentUser().then(
            res => {
                console.log('RES.DATA');
                console.log(res);
                this.setState({
                    currentUserId: res.id
                });
                // if (res.id === this.state.review.userId) {
                //     this.setState({isOwn: true});
                // } else {
                //     this.setState({isOwn: false});
                // }
            },
            err => {
                console.log(err);
            }
        );

        if (this.state.currentUserId === this.state.review.userId) {
            this.setState({isOwn: true});
            console.log('SETTING TRUE')
        } else {
            this.setState({isOwn: false});
            console.log('SETTING FALSE')
        }
    }

    render() {
        const { text } = this.state;

        const { isOwn } = this.state;

        const { review } = this.state;

        console.log('review:::');
        console.log(review);

        let tagsStr = '';

        if (review.tags) {
            review.tags.forEach(t => {
                tagsStr += t.name + ' ';
            });

            console.log('tagsStr::')
            console.log(tagsStr);
        }

        return (
            <Container>
                <Card>
                    <Card.Header>{this.state.review.content} ({this.state.review.contentName})</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.review.name}</Card.Title>
                        <Card.Text className="text-start">
                            <Markdown>{text}</Markdown>
                        </Card.Text>
                        {isOwn ? (<Link to={`/reviews/${this.state.review.id}/edit`} variant="primary">Edit</Link>) : null}
                        {/*<Button variant="primary">Edit</Button>*/}
                    </Card.Body>
                    <Card.Footer className="text-muted">{tagsStr}</Card.Footer>
                </Card>
            </Container>
        )
    }
}

export default Review;