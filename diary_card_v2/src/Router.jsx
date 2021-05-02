import { BrowserRouter as Router, Route } from 'react-router-dom'
import home from './pages/home'
import formList from './pages/formList'
import viewLogs from './pages/viewLogs'
import graphData from './pages/graphData'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'
import form from './pages/form'
import addForm from './pages/addForm'



export const Routes = () => {
  return (
    <Router>
      <Route path="/register" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={home} />
      <Route path="/home" exact component={home} />
      <Route path="/forms" exact component={formList} />
      <Route path="/form/:id" exact component={form} />
      <Route path="/forms/add" exact component={addForm} />
      <Route path="/view-logs" exact component={viewLogs} />
      <Route path="/graph-data" exact component={graphData} />
    </Router>
  )
}