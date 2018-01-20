import React from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import App from '../components/App'
import Registration from '../components/Registration'
import LocalMap from '../components/LocalMap.jsx'
import Account from '../components/Account.jsx'
const customHistory = createBrowserHistory()

const routes = () =>
  <Router history={customHistory}>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/register' component={Registration} />
      <Route path='/connect' component={LocalMap} />
      <Route path='/profile' component={Account} />
    </div>
  </Router>

export default routes
