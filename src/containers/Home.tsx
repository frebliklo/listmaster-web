import React, { useContext } from 'react'
import { RouteComponentProps } from '@reach/router'

import { AuthContext } from '../context'
import { signOut } from '../firebase/auth'

interface Props {}

const Home: React.FC<Props & RouteComponentProps> = () => {
  const { user } = useContext(AuthContext)

  const onSignOut = () => {
    signOut()
  }

  return (
    <div>
      <h3>Welcome to the private app</h3>
      <h4>You are: {user?.displayName}</h4>
      <h4>Id: {user?.uid}</h4>
      <button onClick={onSignOut}>Sign out</button>
    </div>
  )
}

export default Home
