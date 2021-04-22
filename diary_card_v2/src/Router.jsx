import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Forms from './pages/forms'
import viewLogs from './pages/viewLogs'
import Page4 from './pages/page4'
import Layout from './Layout'

export const Routes = () => {
  return (
    <Router>
      <Layout>
        <div style={{ marginTop: '100px' }}>
          <Route path="/" exact component={Home} />
          <Route path="/forms" exact component={Forms} />
          <Route path="/view_logs" exact component={viewLogs} />
          <Route path="/page4" exact component={Page4} />
        </div>
      </Layout>
    </Router>
  )
}