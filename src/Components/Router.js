import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faSignInAlt, faHome, faCalendarAlt, faListUl } from '@fortawesome/free-solid-svg-icons'

import '../css/Theme.css'

// Import Components
import Home from './Home'
import Register from './Register'
import Admin from './Admin'

library.add(faUserPlus, faSignInAlt, faHome, faCalendarAlt, faListUl)

class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/admin' component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default withCookies(Router)
