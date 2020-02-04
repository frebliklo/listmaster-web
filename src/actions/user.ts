import { Dispatch, Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { db } from '../firebase'

export enum UserActionTypes {
  GET_USER = 'GET_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  LOADING_USER = 'LOADING_USER',
}

export interface User {
  id: string
  username: string
  firstName: string
  lastName?: string
  avatar?: string
  email?: string
}

export interface GetUserAction extends Action<UserActionTypes.GET_USER> {
  payload: User
}

export const getUser = (user: User): GetUserAction => ({
  type: UserActionTypes.GET_USER,
  payload: user,
})

type GetUserActionCreator = ActionCreator<
  ThunkAction<Promise<GetUserAction>, User, string, GetUserAction>
>

export const startGetUser: GetUserActionCreator = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<LoadingUserAction>({
      type: UserActionTypes.LOADING_USER,
      payload: true,
    })

    const data = (await db.getUser(id)) as User

    dispatch<LoadingUserAction>({
      type: UserActionTypes.LOADING_USER,
      payload: false,
    })

    return dispatch(getUser(data))
  }
}

export interface LoadingUserAction extends Action<UserActionTypes.LOADING_USER> {
  payload: boolean
}

export const setUserLoading = (loading: boolean): LoadingUserAction => ({
  type: UserActionTypes.LOADING_USER,
  payload: loading,
})

export type UserAction = GetUserAction | LoadingUserAction
