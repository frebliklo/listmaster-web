import { GoogleButton } from '@frebliklo/ls-ds'
import { RouteComponentProps } from '@reach/router'
import React, { useState } from 'react'
import { connect } from 'react-redux'

import { startGoogleLogin, AuthAction } from '../actions'
import { ThunkDispatch } from 'redux-thunk'

interface Props {
  startGoogleLogin: () => Promise<firebase.auth.UserCredential>
}

const SignIn: React.FC<Props & RouteComponentProps> = ({ startGoogleLogin }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignInWithGoogle = () => {
    setLoading(true)
    startGoogleLogin()
  }

  return (
    <div>
      <h1>Sign in</h1>
      <GoogleButton onClick={handleSignInWithGoogle} isLoading={loading}>
        Sign in with Google
      </GoogleButton>
    </div>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AuthAction>) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
})

export default connect(null, mapDispatchToProps)(SignIn)
