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
            review: {name: '', text: '', userId: null},
            currentUserId: null,
            isOwn: false
        }
    }

    componentDidMount() {
        ReviewService.get(this.props.match.params.id).then(
            reviewRes => {
                console.log('ReviewService.get success');
                console.log(reviewRes);
                this.setState({
                    review: reviewRes.data,
                });
                AuthService.getCurrentUser().then(
                    userRes => {
                        if (userRes.id === reviewRes.data.userId) {
                            this.setState({isOwn: true});
                            console.log('SETTING TRUE')
                        } else {
                            this.setState({isOwn: false});
                            console.log('SETTING FALSE')
                        }
                    },
                    err => {
                        console.log(err);
                    }
                )
            },
            err => {
                console.log(err);
            }
        );
    }

    render() {
        const { isOwn } = this.state;

        const { review } = this.state;

        const text = review.text;

        let tagsStr = '';
        if (review.tags) {
            review.tags.forEach(tag => {
                tagsStr += tag.name + ' ';
            });
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
                    </Card.Body>
                    <Card.Footer className="text-muted">{tagsStr}</Card.Footer>
                </Card>
            </Container>
        )
    }
}

export default Review;