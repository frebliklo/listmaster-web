import React, { useContext, useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { AuthContext } from '../context'

import Home from '../containers/Home'
import { db } from '../firebase'
import Profile from '../containers/Profile'
import ProfileComplete from '../containers/ProfileComplete'

interface Props {}

const PrivateApp: React.FC<Props> = () => {
  const { user, profileCompleted, setProfileCompleted } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      db.getUser(user!.uid).then(res => {
        if (!res.data) {
          setProfileCompleted(false)
        } else {
          setProfileCompleted(true)
        }
      })
    }
  }, [user, profileCompleted, setProfileCompleted])

  return (
    <Router>
      {!profileCompleted && <Redirect from="/" to="/profile/complete" />}
      <Home path="/" />
      <Profile path="/profile" />
      <ProfileComplete path="/profile/complete" />
    </Router>
  )
}

export default PrivateApp
