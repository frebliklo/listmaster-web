import { Dispatch, Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { db } from '../firebase'

export enum ListsActionTypes {
  CREATE_LIST = 'CREATE_LIST',
  GET_LIST = 'GET_LIST',
  GET_LISTS = 'GET_LISTS',
  UPDATE_LIST = 'UPDATE_LIST',
  DELETE_LIST = 'DELETE_LIST',
  LOADING_LIST = 'LOADING_LIST',
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  createAt: Date
  updatedAt: Date
}

export interface List {
  id: string
  name: string
  image?: string
  owner: string
  items?: Todo[]
  sharedWith: string[]
  createdAt: Date
  updatedAt: Date
}

// Create lists
export interface CreateListAction extends Action<ListsActionTypes.CREATE_LIST> {
  payload: List
}

export const createList = (list: List): CreateListAction => ({
  type: ListsActionTypes.CREATE_LIST,
  payload: list,
})

type StartCreateListActionCreator = ActionCreator<
  ThunkAction<Promise<CreateListAction>, List, { name: string; uid: string }, CreateListAction>
>

export const startCreateList: StartCreateListActionCreator = (name: string, uid: string) => {
  return async (dispatch: Dispatch) => {
    const newList = await db.createList({ name, owner: uid })

    return dispatch(createList(newList))
  }
}

// Get lists
export interface GetListsAction extends Action<ListsActionTypes.GET_LISTS> {
  payload: List[]
}

export const getLists = (lists: List[]): GetListsAction => ({
  type: ListsActionTypes.GET_LISTS,
  payload: lists,
})

type StartGetListsActionCreator = ActionCreator<
  ThunkAction<Promise<GetListsAction>, List[], string, GetListsAction>
>

export const startGetLists: StartGetListsActionCreator = (uid: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setListLoading(true))

    const data = await db.getLists(uid)

    dispatch(setListLoading(false))

    return dispatch(getLists(data))
  }
}

// Loading lists
export interface LoadingListAction extends Action<ListsActionTypes.LOADING_LIST> {
  payload: boolean
}

export const setListLoading = (loading: boolean): LoadingListAction => ({
  type: ListsActionTypes.LOADING_LIST,
  payload: loading,
})

export type ListsAction = CreateListAction | GetListsAction | LoadingListAction
