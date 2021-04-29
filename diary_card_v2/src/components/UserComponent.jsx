import React from 'react';
import UserService from './services/UserService';

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
        this.props.history.push('/add-user');
    }

    render(){
        return (
            <div>
                <h1 className = "text-center">User List</h1>
                <div className = "row">
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

export default UserComponent