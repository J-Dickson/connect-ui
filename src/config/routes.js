import React from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from '../components/App'
import Registration from '../components/Registration'
import LocalMap from '../components/LocalMap'
const customHistory = createBrowserHistory()

const routes = () =>
  <Router history={customHistory}>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/register' component={Registration} />
      <Route path='/local-area' component={LocalMap} />
    </div>
  </Router>

export default routes
