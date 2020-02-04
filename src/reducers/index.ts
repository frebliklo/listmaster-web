import { combineReducers } from 'redux'

import { authReducer, AuthState } from './authReducer'
import { listsReducer, ListsState } from './listsReducer'
import { userReducer, UserState } from './userReducer'

export interface StoreState {
  auth: AuthState
  lists: ListsState
  user: UserState
}

export * from './authReducer'
export * from './listsReducer'
export * from './userReducer'

export default combineReducers<StoreState>({
  auth: authReducer,
  lists: listsReducer,
  user: userReducer,
})
