import React from "react";

import TestService from "../../services/TestService";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        TestService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div>
                <h1>Home page</h1>
                <h3>{this.state.content}</h3>
            </div>
        )
    }
}

export default Home;