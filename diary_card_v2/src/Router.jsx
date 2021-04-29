import { BrowserRouter as Router, Route } from 'react-router-dom'
import home from './pages/home'
import forms from './pages/forms'
import viewLogs from './pages/viewLogs'
import graphData from './pages/graphData'
import signIn from './pages/signIn'
import CreateUserComponent from './components/CreateUserComponent'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'


export const Routes = () => {
  return (
    <Router>
      <Route path="/sign-up" exact component={Registration} />
      <Route path="/sign-in" exact component={signIn} />
      <Route path="/" exact component={home} />
      <Route path="/home" exact component={home} />
      <Route path="/forms" exact component={forms} />
      <Route path="/view-logs" exact component={viewLogs} />
      <Route path="/graph-data" exact component={graphData} />
      <Route path="/add-user" component = {CreateUserComponent}></Route>
      <Route path="/register" exact component={Registration} />
      <Route path="/login" exact component={Login} />
    </Router>
  )
}