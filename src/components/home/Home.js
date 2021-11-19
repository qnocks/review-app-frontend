import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {
        return (
            <div>
                <h1>Home page</h1>
            </div>
        )
    }
}

export default Home;