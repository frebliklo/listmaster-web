import { Button, Icon, IconPath } from '@frebliklo/ls-ds'
import { RouteComponentProps } from '@reach/router'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import Container from '../components/Container'
import Modal from '../components/Modal'

import {
  startCreateList,
  startGetLists,
  ListsAction,
  GetListsAction,
  CreateListAction,
} from '../actions'
import { StoreState, ListsState, AuthState } from '../reducers'
import CreateListModal from '../components/CreateListModal'

interface Props {
  auth: AuthState
  lists: ListsState
  startCreateList: (name: string, uid: string) => Promise<CreateListAction>
  startGetLists: (uid: string) => Promise<GetListsAction>
}

const Home: React.FC<Props & RouteComponentProps> = ({
  auth,
  lists,
  startCreateList,
  startGetLists,
}) => {
  const [modalValue, setModalValue] = useState<string>('')
  const [modalShown, setModalShown] = useState<boolean>(false)

  const resetModal = () => {
    setModalShown(false)
    setModalValue('')
  }

  useEffect(() => {
    if (auth.uid) {
      startGetLists(auth.uid)
    }
  }, [auth.uid])

  const handleCreateList = () => {
    if (auth.uid) {
      startCreateList(modalValue, auth.uid)
        .then(() => {
          resetModal()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const handleDismiss = () => {
    resetModal()
  }

  const renderEmpty = () => (
    <>
      <h3>Welcome to the list master</h3>
      <p>Get started by creating your first list</p>
    </>
  )

  return (
    <>
      <Container>
        {lists.lists.length > 0 ? <div>{lists.lists.length}</div> : renderEmpty()}
        <Button onClick={() => setModalShown(true)} appearance="primary" fullWidth>
          <Icon icon={IconPath.ADD} fill="currentColor" /> Create List
        </Button>
      </Container>
      {modalShown && (
        <Modal onEscPress={handleDismiss}>
          <CreateListModal
            value={modalValue}
            onChange={e => setModalValue(e.currentTarget.value)}
            onSubmit={handleCreateList}
            onDismiss={handleDismiss}
          />
        </Modal>
      )}
    </>
  )
}

const mapStateToProps = ({ auth, lists }: StoreState): { auth: AuthState; lists: ListsState } => ({
  auth,
  lists,
})

const mapDispathToProps = (dispatch: ThunkDispatch<any, any, ListsAction>) => ({
  startCreateList: (name: string, uid: string) => dispatch(startCreateList(name, uid)),
  startGetLists: (uid: string) => dispatch(startGetLists(uid)),
})

export default connect(mapStateToProps, mapDispathToProps)(Home)
