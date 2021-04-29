import React, { Component } from 'react';
import UserService from './services/UserService';
import { withRouter } from "react-router-dom";

class AuthenticateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();

        let data = new FormData()

        data.append('email', this.state.email);
        data.append('password', this.state.password);

        UserService.authenticateUser(data).then(res =>{
            this.props.history.push('/');
        });
    }

    
    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    
    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    cancel(){
        this.props.history.push('/sign-in');
    }

    render() {
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3 mt-5 bg-dark text-light">
                        <h3 className = "text-center mt-3">Sign In</h3>
                        <div className = "card-body">
                            <form>
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
                                <button className="btn btn-success" onClick={this.saveUser}>Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AuthenticateUserComponent);