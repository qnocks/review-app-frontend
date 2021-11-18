import React from "react";
import ReviewService from "../../services/ReviewService";
import {Button, Card, Container} from "react-bootstrap";

class Review extends React.Component {
    constructor(props) {
        super(props);

        console.log('Review.constructor');
        console.log(this.props.match.params.id);

        this.state = {
            review: {name: '', text: ''}
        }
    }

    componentDidMount() {
        console.log('Review.componentDidMount()');
        ReviewService.get(this.props.match.params.id).then(res => {
            console.log('Review.componentDidMount() ReviewService.get => success setting state');
            this.setState({
                review: res.data
            })
            console.log('review: ' + this.state.review);
            console.log('Review.componentDidMount() ReviewService.get => success set state');
        }).catch(err => {
            console.log(err);
        })
    }

    render() {

        console.log('Review.render()')
        console.log(JSON.stringify(this.state.review));

        return (
            <Container>
                <Card className="text-center">
                    <Card.Header>{this.state.review.content} ({this.state.review.contentName})</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.review.name}</Card.Title>
                        <Card.Text className="text-left">
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