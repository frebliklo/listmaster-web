import { global, tokens } from '@frebliklo/ls-ds'
import { createHistory } from '@reach/router'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'

import './index.css'

import PrivateApp from './routers/PrivateApp'
import PublicApp from './routers/PublicApp'

import FullpageLoader from './components/FullpageLoader'

import { AuthState, StoreState } from './reducers'
import { setAuthLoading } from './actions'

interface Props {
  auth?: AuthState
  setAuthLoading: typeof setAuthLoading
}

const { COLOR } = tokens

const Background = styled.div`
  background: ${COLOR.bg};
`

export const history = createHistory(window as any)

const App: React.FC<Props> = ({ auth, setAuthLoading }) => {
  useEffect(() => {
    if (auth && auth.loading) {
      setAuthLoading(false)
    }
  }, [auth, setAuthLoading])

  return (
    <Background>
      <global.GlobalStyle />
      {auth?.loading ? <FullpageLoader /> : !!auth!.uid ? <PrivateApp /> : <PublicApp />}
    </Background>
  )
}

const mapStateToProps = ({ auth }: StoreState): { auth: AuthState } => ({
  auth,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthLoading: (isLoading: boolean) => dispatch(setAuthLoading(isLoading)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
