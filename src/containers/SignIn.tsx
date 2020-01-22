import React, { useContext } from 'react'
import { RouteComponentProps } from '@reach/router'

import { signInWithGoogle } from '../firebase/auth'
import { AuthContext } from '../context'

interface Props {}

const SignIn: React.FC<Props & RouteComponentProps> = () => {
  const { setLoading } = useContext(AuthContext)

  const onSignInWithGoogle = () => {
    setLoading(true)

    signInWithGoogle()
      .then(() => console.log('signed in'))
      .catch(e => {
        setLoading(false)
        console.log(e)
      })
  }

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={onSignInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default SignIn
