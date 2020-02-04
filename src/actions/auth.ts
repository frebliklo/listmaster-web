import { Dispatch, Action, ActionCreator } from 'redux'

import { signInWithGoogle, signOut, signInWithEmailAndPassword } from '../firebase/auth'
import { ThunkAction } from 'redux-thunk'

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  COMPLETE_PROFILE = 'COMPLETE_PROFILE',
  LOADING = 'AUTH_LOADING',
}

// LOGIN
export interface LoginAuthAction extends Action<AuthActionTypes.LOGIN> {
  payload: string
}

export const login = (uid: string): LoginAuthAction => ({
  type: AuthActionTypes.LOGIN,
  payload: uid,
})

type StartLoginActionCreator = ActionCreator<
  ThunkAction<
    Promise<firebase.auth.UserCredential>,
    string,
    { email: string; password: string },
    LoginAuthAction
  >
>

export const startLogin: StartLoginActionCreator = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAuthLoading(true))

    return signInWithEmailAndPassword(email, password)
  }
}

type StartGoogleLoginActionCreator = ActionCreator<
  ThunkAction<Promise<firebase.auth.UserCredential>, string, null, LoginAuthAction>
>

export const startGoogleLogin: StartGoogleLoginActionCreator = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAuthLoading(true))

    return signInWithGoogle()
  }
}

// SIGNOUT
export interface SignOutAuthAction extends Action<AuthActionTypes.SIGN_OUT> {}

export const signout = (): SignOutAuthAction => ({
  type: AuthActionTypes.SIGN_OUT,
})

type StartSignoutActionCreator = ActionCreator<
  ThunkAction<Promise<void>, null, null, SignOutAuthAction>
>

export const startSignout: StartSignoutActionCreator = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAuthLoading(true))

    return signOut()
  }
}

// COMPLETE PROFILE
export interface AuthProfileComplete extends Action<AuthActionTypes.COMPLETE_PROFILE> {}

export const completeProfile = (): AuthProfileComplete => ({
  type: AuthActionTypes.COMPLETE_PROFILE,
})

// LOADING
export interface AuthLoadingAction extends Action<AuthActionTypes.LOADING> {
  payload: boolean
}

export const setAuthLoading = (isLoading: boolean): AuthLoadingAction => ({
  type: AuthActionTypes.LOADING,
  payload: isLoading,
})

export type AuthAction =
  | LoginAuthAction
  | SignOutAuthAction
  | AuthLoadingAction
  | AuthProfileComplete
