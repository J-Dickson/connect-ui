import React from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from '../components/App'
import Registration from '../components/Registration'
const customHistory = createBrowserHistory()

const routes = () =>
  <Router history={customHistory}>
    <div>
  	  <Route exact path='/' component={App} />
      <Route path='/register' component={Registration} />
    </div>
  </Router>

export default routes
