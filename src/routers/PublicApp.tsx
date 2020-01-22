import React from 'react'
import { Router } from '@reach/router'

import SignIn from '../containers/SignIn'

interface Props {}

const PublicApp: React.FC<Props> = () => {
  return (
    <Router>
      <SignIn path="/" />
    </Router>
  )
}

export default PublicApp
