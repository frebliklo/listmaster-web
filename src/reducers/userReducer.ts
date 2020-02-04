import { Reducer } from 'redux'

import { User, UserAction, UserActionTypes } from '../actions'

const neverReached = (never: never) => {}

export interface UserState extends Partial<User> {
  readonly loading: boolean
}

const initialState: UserState = {
  id: undefined,
  username: undefined,
  loading: false,
}

export const userReducer: Reducer<UserState, UserAction> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case UserActionTypes.LOADING_USER:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      neverReached(action)
  }
  return state
}
