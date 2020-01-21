import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SignIn from '../containers/SignIn'

interface Props {}

const PublicApp: React.FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  )
}

export default PublicApp
