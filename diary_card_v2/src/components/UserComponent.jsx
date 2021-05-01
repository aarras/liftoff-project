import React from 'react';
import UserService from './services/UserService';
import { withRouter } from "react-router-dom";

class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
        this.addUser = this.addUser.bind(this);
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data })
        });
    }

    addUser(){
        this.props.history.push('/register');
    }

    render(){
        return (
            <div>
                <h2 className = "text-center">User List</h2>
                <div className = "row m-1">
                    <button className="btn btn-primary" onClick={this.addUser}>Add User</button>
                </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td>User Id</td>
                            <td>User First Name</td>
                            <td>User Last Name</td>
                            <td>User Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default withRouter(UserComponent)