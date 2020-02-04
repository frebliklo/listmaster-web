import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './firebase'
import App, { history } from './App'
import * as serviceWorker from './serviceWorker'

import configureStore from './store'
import { firebase, db } from './firebase'

import FullpageLoader from './components/FullpageLoader'
import { login, signout, completeProfile, getUser } from './actions'

const store = configureStore()

const AppWProvider = (
  <Provider store={store}>
    <App />
  </Provider>
)

let hasRendered = false

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(AppWProvider, document.getElementById('root'))
    hasRendered = true
  }
}

ReactDOM.render(<FullpageLoader />, document.getElementById('root'))

firebase.auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid))
    db.getUser(user.uid).then(res => {
      if (res) {
        store.dispatch(completeProfile())
        store.dispatch(getUser(res))
      } else {
        history.location.replace('/profile/complete')
      }

      renderApp()
    })
  } else {
    store.dispatch(signout())
    renderApp()
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
