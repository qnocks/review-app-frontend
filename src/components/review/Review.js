import React from "react";
import {Card, Container} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";
import {Remarkable} from "remarkable";
import Markdown from 'react-remarkable';
import {Link} from "react-router-dom";

const md = new Remarkable()

class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            review: {name: '', text: ''}
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
        })
    }

    render() {
        const { text } = this.state;

        return (
            <Container>
                <Card>
                    <Card.Header>{this.state.review.content} ({this.state.review.contentName})</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.review.name}</Card.Title>
                        <Card.Text className="text-start">
                            <Markdown>{text}</Markdown>
                        </Card.Text>
                        <Link to={`/reviews/${this.state.review.id}/edit`} variant="primary">Edit</Link>
                        {/*<Button variant="primary">Edit</Button>*/}
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </Container>
        )
    }
}

export default Review;