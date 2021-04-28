import React, { Component } from 'react';

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

        let user = {firstname: this.state.firstName, lastName: this.state.lastName, email: this.state.email,
        password: this.state.password, verifyPassword: this.state.verifyPassword}
        console.log('user = > ' + JSON.stringify(user));
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeFirstNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeFirstNameHandler= (event) => {
        this.setState({email: event.target.value});
    }
    changeFirstNameHandler= (event) => {
        this.setState({password: event.target.value});
    }

    changeFirstNameHandler= (event) => {
        this.setState({verifyPassword: event.target.value});
    }

    render() {
        return (
            <div className = "container">
                <div className = "row">
                    <div classname = "card col-md-6 offset-md-3 offset-md-3">
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
                                <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CreateUserComponent