import React from "react";

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    render() {
        return (
            <div>
                <h1>Review page</h1>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Brand</td>
                        <td>Year</td>
                        <td>Price</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.cars.map(car =>
                            <tr key = {car.id}>
                                <td>{car.id}</td>
                                <td>{car.brand}</td>
                                <td>{car.year}</td>
                                <td>{car.price}</td>
                                <td>
                                    <button onClick={() => this.delete(car.id)} className="btn btn-dark">Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        )
    }
}

export default Review;