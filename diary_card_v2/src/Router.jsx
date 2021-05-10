import { BrowserRouter as Router, Route } from 'react-router-dom'
import home from './pages/home'
import viewLogs from './pages/viewLogs'
import graphData from './pages/graphData'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'
import formList from './pages/formList'
import categoryList from './pages/categoryList'
import inputList from './pages/inputList'
import form from './pages/form'
import category from './pages/category'
import input from './pages/input'
import addForm from './pages/addForm'
import addCategory from './pages/addCategory'
import addInput from './pages/addInput'



export const Routes = () => {
  return (
    <Router>
      <Route path="/register" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={home} />
      <Route path="/home" exact component={home} />
      <Route path="/forms" exact component={formList} />
      <Route path="/categories" exact component={categoryList} />
      <Route path="/inputs" exact component={inputList} />
      <Route path="/form/:id" exact component={form} />
      <Route path="/category/:id" exact component={category} />
      <Route path="/input/:id" exact component={input} />
      <Route path="/forms/add" exact component={addForm} />
      <Route path="/form/:id/category/add" exact component={addCategory} />
      <Route path="/category/:id/input/add" exact component={addInput} />
      <Route path="/view-logs" exact component={viewLogs} />
      <Route path="/graph-data" exact component={graphData} />
    </Router>
  )
}