import React, { useContext } from 'react'
import { RouteComponentProps, Redirect } from '@reach/router'
import { AuthContext } from '../context'

interface Props {}

const Profile: React.FC<Props & RouteComponentProps> = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Profile</h1>
      {user.photoURL && <img src={user.photoURL} />}
      <h3>{user.displayName}</h3>
    </div>
  )
}

export default Profile
