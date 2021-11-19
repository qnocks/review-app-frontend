import React from "react";
import {Button, Card, Container} from "react-bootstrap";
import ReviewService from "../../services/ReviewService";

class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            review: {name: '', text: ''}
        }
    }

    componentDidMount() {
        ReviewService.get(this.props.match.params.id).then(res => {
            this.setState({
                review: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Container>
                <Card className="text-center">
                    <Card.Header>{this.state.review.content} ({this.state.review.contentName})</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.review.name}</Card.Title>
                        <Card.Text>
                            {this.state.review.text}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </Container>
        )
    }
}

export default Review;