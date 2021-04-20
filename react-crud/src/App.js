import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import UsersList from './components/user-list.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            Diary Card
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UsersList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;