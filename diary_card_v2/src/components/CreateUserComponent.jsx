import React, { Component } from 'react';
import UserService from './services/UserService';
import { withRouter } from "react-router-dom";

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            verifyPassword:''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeVerifyPasswordHandler = this.changeVerifyPasswordHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();

        let data = new FormData()

        data.append('firstName', this.state.firstName);
        data.append('lastName', this.state.lastName);
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        data.append('verifyPassword', this.state.verifyPassword);

        UserService.createUser(data).then(res =>{
            this.props.history.push('/login');
        });
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    
    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    changeVerifyPasswordHandler= (event) => {
        this.setState({verifyPassword: event.target.value});
    }

    cancel(event){
        this.props.history.push('sign-in');
    }

    render() {
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3 mt-5 bg-dark text-light">
                        <h3 className = "text-center">Add User</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Last Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                    value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Email Address: </label>
                                    <input placeholder="Email Address" name="email" className="form-control"
                                    value={this.state.email} onChange={this.changeEmailHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Password: </label>
                                    <input placeholder="Password" name="password" className="form-control"
                                    value={this.state.password} onChange={this.changePasswordHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Verify Password: </label>
                                    <input placeholder="Password" name="verifyPassword" className="form-control"
                                    value={this.state.verifyPassword} onChange={this.changeVerifyPasswordHandler}/>
                                </div>
                                <button className="btn btn-success" onClick={this.saveUser}>Register</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateUserComponent);