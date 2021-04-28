import { BrowserRouter as Router, Route } from 'react-router-dom'
import home from './pages/home'
import forms from './pages/forms'
import viewLogs from './pages/viewLogs'
import graphData from './pages/graphData'
import signIn from './pages/signIn'
import signUp from './pages/signUp'
import CreateUserComponent from './components/CreateUserComponent'

export const Routes = () => {
  return (
    <Router>
      <Route path="/sign-up" exact component={signUp} />
      <Route path="/sign-in" exact component={signIn} />
      <Route path="/" exact component={home} />
      <Route path="/forms" exact component={forms} />
      <Route path="/view-logs" exact component={viewLogs} />
      <Route path="/graph-data" exact component={graphData} />
      <Route path="/add-user" component = {CreateUserComponent}></Route>
    </Router>
  )
}