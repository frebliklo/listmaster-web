import { Router } from '@reach/router'
import React from 'react'
import { connect } from 'react-redux'

import { StoreState, AuthState } from '../reducers'

import Home from '../containers/Home'
import Profile from '../containers/Profile'
import ProfileComplete from '../containers/ProfileComplete'

import FullpageLoader from '../components/FullpageLoader'

interface Props {
  auth?: AuthState
}

const PrivateApp: React.FC<Props> = ({ auth }) => {
  return !auth?.loading ? (
    <Router>
      <Home path="/" />
      <Profile path="/profile" />
      <ProfileComplete path="/profile/complete" />
    </Router>
  ) : (
    <FullpageLoader />
  )
}

const mapStateToProps = ({ auth }: StoreState): { auth: AuthState } => ({
  auth,
})

export default connect(mapStateToProps, null)(PrivateApp)
