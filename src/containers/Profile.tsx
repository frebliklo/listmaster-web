import { Avatar, AvatarSizes, Button } from '@frebliklo/ls-ds'
import { RouteComponentProps } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { startGetUser, startSignout, GetUserAction } from '../actions'
import { StoreState, UserState, AuthState } from '../reducers'

import Container from '../components/Container'

interface Props {
  auth: AuthState
  user: UserState
  startGetUser: (id: string) => Promise<GetUserAction>
  startSignout: () => Promise<void>
}

const Profile: React.FC<Props & RouteComponentProps> = ({
  auth,
  user,
  startGetUser,
  startSignout,
  navigate,
}) => {
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (!user.id && auth.uid) {
      startGetUser(auth.uid)
    }

    if (user.username) {
      setUsername(username)
    }
  }, [auth.uid, startGetUser, user.id, user.username, username])

  const handleSignout = () => {
    startSignout()
      .then(() => {
        if (navigate) navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <h1>Profile</h1>
      <Avatar
        username={username}
        src={user.avatar}
        isLoading={user.loading}
        size={AvatarSizes.LARGE}
      />
      <div>
        <h3>{user.username}</h3>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
      <Button appearance="warning" onClick={() => handleSignout()}>
        Sign out
      </Button>
    </Container>
  )
}

const mapStateToProps = ({ auth, user }: StoreState) => ({
  auth,
  user,
})

const mapDispatchToProp = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  startGetUser: (id: string) => dispatch(startGetUser(id)),
  startSignout: () => dispatch(startSignout()),
})

export default connect(mapStateToProps, mapDispatchToProp)(Profile)
