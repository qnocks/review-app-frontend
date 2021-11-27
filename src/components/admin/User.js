import React from 'react';
import {Container} from "react-bootstrap";
import UserService from "../../services/UserService";
import {Link} from "react-router-dom";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        UserService.getAll().then(res => {
            this.setState({
                users: res.data
            })
        });
        console.log('User.componentDidMount users:');
        console.log(this.state.users);
    }

    changeActive(id, user) {
        console.log('User.changeActive user:')
        user.active = !user.active;
        UserService.update(id, user).then(res => {
            let idx = this.state.users.findIndex((e => e.id === id));
            let newUsers = this.state.users.slice();
            newUsers[idx].active = user.active;
            this.setState({users: newUsers});
        });
    }

    render() {
        return (
            <Container>
                <div>
                    <h1>Users page</h1>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Active</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(user =>
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <Link to={`/profile/${user.id}`}><td>{user.username}</td></Link>
                                    <td>{user.email}</td>
                                    <td>{user.active.toString()}</td>
                                    <td>
                                        <button onClick={() => this.changeActive(user.id, user)} className="btn btn-dark">Change Status</button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </Container>
        )
    }

}

export default User;