import React, { Component } from "react";
import UserDataService from "../services/tutorial.service";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
              id: null,
              firstName: "",
              lastName: "",
            },
            message: ""
          };
        }
      
        componentDidMount() {
          this.getUser(this.props.match.params.id);
        }
      
        onChangeLastName(e) {
          const lastName = e.target.value;
      
          this.setState(function(prevState) {
            return {
              currentUser: {
                ...prevState.currentUser,
                lastName: lastName
              }
            };
          });
        }
      
        onChangeFirstName(e) {
          const firstName = e.target.value;
          
          this.setState(prevState => ({
            currentUser: {
              ...prevState.currentUser,
              firstName: firstName
            }
          }));
        }
      
        getUser(id) {
          UserDataService.get(id)
            .then(response => {
              this.setState({
                currentUser: response.data
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
      
        updateFirstName(status) {
          var data = {
            id: this.state.currentUser.id,
            lastName: this.state.currentUser.lastName,
            firstName: this.state.currentUser.firstName,
          };
      
          UserDataService.update(this.state.currentUser.id, data)
            .then(response => {
              this.setState(prevState => ({
                currentUser: {
                  ...prevState.currentUser,
                }
              }));
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
      
        updateUser() {
          UserDataService.update(
            this.state.currentUser.id,
            this.state.currentUser
          )
            .then(response => {
              console.log(response.data);
              this.setState({
                message: "The user was updated successfully!"
              });
            })
            .catch(e => {
              console.log(e);
            });
        }
      
        deleteUser() {    
          UserDataService.delete(this.state.currentUser.id)
            .then(response => {
              console.log(response.data);
              this.props.history.push('/users')
            })
            .catch(e => {
              console.log(e);
            });
        }
      
        render() {
            const { currentUser } = this.state;

            return (
              <div>
                {currentUser ? (
                  <div className="edit-form">
                    <h4>User</h4>
                    <form>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          value={currentUser.lastName}
                          onChange={this.onChangeLastName}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          value={currentUser.firstName}
                          onChange={this.onChangeFirstName}
                        />
                      </div>
                    </form>
                
                    <button
                      className="badge badge-danger mr-2"
                      onClick={this.deleteUser}
                    >
                      Delete
                    </button>
        
                    <button
                      type="submit"
                      className="badge badge-success"
                      onClick={this.updateUser}
                    >
                      Update
                    </button>
                    <p>{this.state.message}</p>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a User...</p>
                  </div>
                )}
              </div>
            );
        }
      }