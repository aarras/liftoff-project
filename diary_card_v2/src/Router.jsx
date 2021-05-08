import { BrowserRouter as Router, Route } from 'react-router-dom'
import home from './pages/home'
import viewLogs from './pages/viewLogs'
import graphData from './pages/graphData'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'
import formList from './pages/formList'
import inputList from './pages/inputList'
import form from './pages/form'
import input from './pages/input'
import addForm from './pages/addForm'
import addInput from './pages/addInput'



export const Routes = () => {
  return (
    <Router>
      <Route path="/register" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={home} />
      <Route path="/home" exact component={home} />
      <Route path="/forms" exact component={formList} />
      <Route path="/inputs" exact component={inputList} />
      <Route path="/form/:id" exact component={form} />
      <Route path="/input/:id" exact component={input} />
      <Route path="/forms/add" exact component={addForm} />
      <Route path="/form/:id/input/add" exact component={addInput} />
      <Route path="/view-logs" exact component={viewLogs} />
      <Route path="/graph-data" exact component={graphData} />
    </Router>
  )
}