import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

// https://www.mydatahack.com/getting-redux-devtools-to-work-with-typescript/
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

  return store
}
