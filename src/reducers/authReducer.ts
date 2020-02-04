import { Reducer } from 'redux'

import { AuthAction, AuthActionTypes } from '../actions'

const neverReached = (never: never) => {}

export interface AuthState {
  readonly uid: string | null
  readonly profileCompleted: boolean
  readonly loading: boolean
}

const initialState: AuthState = {
  uid: null,
  profileCompleted: false,
  loading: true,
}

export const authReducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action: AuthAction,
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        uid: action.payload,
      }
    case AuthActionTypes.SIGN_OUT:
      return initialState
    case AuthActionTypes.COMPLETE_PROFILE:
      return {
        ...state,
        profileCompleted: true,
      }
    case AuthActionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      neverReached(action)
  }
  return state
}
