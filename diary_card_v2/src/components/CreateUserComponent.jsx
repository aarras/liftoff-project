import React, { Component } from 'react';
import UserService from './services/UserService';
import { withRouter } from "react-router-dom";
import Input from '@material-ui/core/Input';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    verifyPasswordError: ''
}

const specialCharacters = ['@', '#', '!', '$', '*', '%']

class CreateUserComponent extends Component {
    state = initialState;

    specialChars = specialCharacters;

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            verifyPassword: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            verifyPasswordError: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeVerifyPasswordHandler = this.changeVerifyPasswordHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    validate = () => {
        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let passwordError = "";
        let verifyPasswordError = "";

        let specialChars = ['@', '#', '!', '$', '*', '%'];

        if (!this.state.firstName) {
            firstNameError = "First Name is required."
        }

        if (!this.state.lastName) {
            lastNameError = "Last Name is required."
        }

      
        if (!this.state.email) {
            emailError = 'Email is required.';
        } else if (!this.state.email.includes('.') || !this.state.email.includes('@') || this.state.email < 5) {
            emailError = 'Invalid email.'
        }
        
        if (this.state.password < 8) {
            passwordError = 'Password must be at least 8 characters.';
        } else {
            passwordError = 'Password must include 1 special character. (@, #, !, $, *, %)';
            for (let i = 0; i < specialChars.length; i++) {         
                if (this.state.password.includes(specialChars[i])) {
                    passwordError = "";
                }
            }
        }

        if (this.state.password !== this.state.verifyPassword) {
            verifyPasswordError = 'Passwords do not match.';
        }

        if (emailError || firstNameError || lastNameError || passwordError || verifyPasswordError) {
            this.setState({ emailError, firstNameError, lastNameError, passwordError, verifyPasswordError });
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

            data.append('firstName', this.state.firstName);
            data.append('lastName', this.state.lastName);
            data.append('email', this.state.email);
            data.append('password', this.state.password);
            data.append('verifyPassword', this.state.verifyPassword);

            UserService.createUser(data).then(res =>{
                this.props.history.push('/login');
            });
        }
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
        this.props.history.push('login');
    }

    render() {
        return (
            <div className = "container">
                <div className = "row justify-content-md-center">
                    <div className = "card col-md-4 mt-5 bg-dark text-light">
                        <h3 className = "text-center mt-4">Register</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "row">
                                    <div className = "form-group col">
                                        <Input placeholder="First Name" name="firstName" className="form-control"
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        <div class = "small" style={{color: "pink"}}>{this.state.firstNameError}</div>
                                    </div>
                                    <div className = "form-group col">
                                        <Input placeholder="Last Name" name="lastName" className="form-control"
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        <div class = "small" style={{color: "pink"}}>{this.state.lastNameError}</div>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    <Input placeholder="Email Address" name="email" className="form-control"
                                    value={this.state.email} onChange={this.changeEmailHandler}/>
                                    <div class = "small" style={{color: "pink"}}>{this.state.emailError}</div>
                                </div>
                                <div className = "form-group">
                                    <Input type="password" placeholder="Password" name="password" className="form-control"
                                    value={this.state.password} onChange={this.changePasswordHandler}/>
                                    <div class = "small" style={{color: "pink"}}>{this.state.passwordError}</div>
                                </div>
                                <div className = "form-group">
                                    <Input type="password" placeholder="Verify Password" name="verifyPassword" className="form-control"
                                    value={this.state.verifyPassword} onChange={this.changeVerifyPasswordHandler}/>
                                    <div class = "small" style={{color: "pink"}}>{this.state.verifyPasswordError}</div>
                                </div>
                                <button className="btn btn-primary" onClick={this.saveUser}>Register</button>
                                <button className="btn btn-secondary" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateUserComponent);