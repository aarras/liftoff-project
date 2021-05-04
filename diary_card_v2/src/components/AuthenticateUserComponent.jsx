import React, { Component } from 'react';
import UserService from './services/UserService';
import { withRouter } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Input from '@material-ui/core/Input';


const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
};

class AuthenticateUserComponent extends Component {
    state = initialState;

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    validate = () => {
        let emailError = "";
        let passwordError = "";
     
        if (!this.state.email) {
            emailError = 'Email is required.';
        } else if (!this.state.email.includes('.') || !this.state.email.includes('@') || this.state.email < 5) {
            emailError = 'Invalid email.'
        }
        
        if (this.state.password < 8) {
            passwordError = 'Password must be at least 8 characters.';
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }

        return true;
    };

    saveUser = (e) => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {

            //clear form
            this.setState(initialState);

            let data = new FormData()

            data.append('email', this.state.email);
            data.append('password', this.state.password);

            UserService.authenticateUser(data).then(res =>{
                this.props.history.push('/');
            });
        }
    }

    
    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    
    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className = "container">
                <div className = "row justify-content-md-center">
                    <div className = "card col-md-4 mt-5 bg-dark text-light">
                        <h3 className = "text-center mt-3">Sign In</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <Input placeholder="Email Address" name="email" className="form-control"
                                    value={this.state.email} onChange={this.changeEmailHandler}/>
                                    <div style={{color: "pink"}}>{this.state.emailError}</div>
                                </div>
                                <div className = "form-group">
                                     <Input  type="password" placeholder="Password" name="password" className="form-control"
                                    value={this.state.password} onChange={this.changePasswordHandler}/>
                                    <div style={{color: "pink"}}>{this.state.passwordError}</div>
                                </div>
                                <div className = "row">
                                    <div className = "col">                           
                                        <button className="btn btn-primary" onClick={this.saveUser}>Sign In</button>
                                    </div>
                                    <div className = "col-md-auto">
                                        <Nav.Link className= "p-2" style={{color: 'white'}} href="/register">Register for an account</Nav.Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AuthenticateUserComponent);