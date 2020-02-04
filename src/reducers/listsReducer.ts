import { Reducer } from 'redux'

import { List, ListsAction, ListsActionTypes } from '../actions'

const neverReached = (never: never) => {}

export interface ListsState {
  readonly lists: List[]
  readonly loading: boolean
}

const initialState: ListsState = {
  lists: [],
  loading: false,
}

export const listsReducer: Reducer<ListsState, ListsAction> = (
  state = initialState,
  action: ListsAction,
) => {
  switch (action.type) {
    case ListsActionTypes.CREATE_LIST:
      return {
        lists: [action.payload, ...state.lists],
        loading: state.loading,
      }
    case ListsActionTypes.GET_LISTS:
      return {
        lists: action.payload,
        loading: state.loading,
      }
    case ListsActionTypes.LOADING_LIST:
      return {
        lists: state.lists,
        loading: action.payload,
      }
    default:
      neverReached(action)
  }
  return state
}
