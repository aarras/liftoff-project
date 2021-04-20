import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddUser extends Component {
    constructor(props) {
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            firstName: "",
            lastName: "",

            submitted: false
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    saveUser() {
        var data = {
            firstName: this.state.firstName,
            lastName: this.state.description
        };

        UserDataService.create(data)
            .then(response => {
                this.setState({
                    id:response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newUser() {
        this.setState({
            id: null,
            firstName: "",
            lastName: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newUser}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                required
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                                name="firstName"
                            />
                        </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            classname="form-control"
                            id="lastName"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            name="lastName"
                        />
                    </div>

                    <button onClick={this.saveUser} className="btn btn-success">
                        Submit
                    </button>
                </div>
                )}
            </div>
        );
    }
}